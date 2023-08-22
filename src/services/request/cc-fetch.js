const hammerDetection = new Map();

function sleep(ms) {
	return new Promise((resolve, reject) => setTimeout(resolve, ms));
}

// minimum wait time between calls to the same URL
const GAP_MIN_WAIT = 0;
// maximum wait time between calls to the same URL
const GAP_MAX_WAIT = 1500;
// number of calls for us to consider the URL being "hammered"
const GAP_HAMMER_COUNT = 20;
// the size of the window we want to keep for calculating the desired average
const GAP_CALC_WINDOW_MS = GAP_HAMMER_COUNT * GAP_MAX_WAIT;

/**
 * Find out how many milliseconds (if any) we should wait before hitting a URL, based on the list of previous
 * timestamps when we've hit the same URL in the past.
 * @param callList the list
 * @returns {number} the number of milliseconds to wait
 */
function calculateWaitTime(callList) {
	const gapCount = callList.length - 1;
	if (gapCount < 1) {
		// there's only ever been one call; go ahead with the next one immediately
		return 0;
	}

	const newGapCount = gapCount + 1;
	// The call list has n calls, which make for n-1 gaps; let's call the number of gaps 'g'. The goal here is to figure
	// out the expected average gap time for the current gap list, then compute the next gap value which would bring
	// the average to that value.

	// Here's the math behind what I'm doing. The new average will be the new gap plus the sum of all the old gaps,
	// divided by the new gap count.
	//                 ___
	//        gap    + ╲   gap
	//           new   ╱      old
	//                 ‾‾‾
	// μ    = ───────────────────
	//  new          g + 1
	//
	// However, in this case, we know the new average, and we need to solve for the new gap:
	//                           ___
	// gap    = μ    * (g + 1) - ╲   gap
	//    new    new             ╱      old
	//                           ‾‾‾
	//

	// The next question is, how do we compute the new mean? We're going to use a logistic function (see
	// https://en.wikipedia.org/wiki/Logistic_function), which has the nice property that it can produce a minimum value,
	// and ramp up to a maximum value, which is what I want to do here. If there are not very many calls happening,
	// I want the average wait time to be down near the minimum. But if suddenly there are lots of calls, I want the
	// wait time to shoot up to the maximum.


	// 1) Compute the expected mean - I've named the parameters here based on the main equation on the Wikipedia page.
	// there's no exact science here, just "feel"
	// the supremum - asymptote which the maximum approaches
	const parameterL = GAP_MAX_WAIT;
	// the midpoint - hit half the wait time at half-way to being hammered
	const parameterX0 = GAP_HAMMER_COUNT / 2;
	// position we're calculating for
	const parameterX = newGapCount;
	// steepness
	const parameterK = 1;
	// apply the logistic function
	const newAverage = (parameterL / (1 + Math.exp(-parameterK * (parameterX - parameterX0)))) + GAP_MIN_WAIT;

	// 2) Compute the sum of gaps
	const firstDate = callList[0];
	let sumOfOldGaps = 0;
	for (let i = 1; i < callList.length; i++) {
		sumOfOldGaps += callList[i] - firstDate;
	}

	// 3) Compute the new gap necessary to get us to the right average
	const newGap = newAverage * newGapCount - sumOfOldGaps;

	// note that the new gap may be negative - this is an indication that the calls are happening more slowly than
	// the expected average, which is fine, but we shouldn't send that back as an answer
	return Math.round(Math.max(newGap, 0));
}

// flag to indicate whether we've started the "background" worker to remove stale URLs from the hammer tracking map
let hammerCleanupStarted = false;

/**
 * Remove URLs from the hammer tracking map that have slid outside the average calculation window
 * (see GAP_CALC_WINDOW_MS). It will automatically resubmit itself for GAP_CALC_WINDOW_MS millis in the future.
 */
function cleanupHammerMap() {
	const now = new Date();
	const windowStart = new Date();
	windowStart.setTime(now.getTime() - Math.round(GAP_CALC_WINDOW_MS));

	// find any keys where all of the timestamps have slid outside the window, and delete them
	for (const key of hammerDetection.keys()) {
		const list = hammerDetection.get(key);
		if (list.length > 0 && list[list.length - 1].getTime() < windowStart.getTime()) {
			hammerDetection.delete(key);
		}
	}

	setTimeout(cleanupHammerMap, GAP_CALC_WINDOW_MS);
}

/**
 * Determine what, if any, delay should be placed before calling the given URL
 * @param url the url
 * @returns {number} the wait time, in milliseconds
 */
function determineWaitTime(url) {
	if (!hammerCleanupStarted) {
		setTimeout(cleanupHammerMap, GAP_CALC_WINDOW_MS);
		hammerCleanupStarted = true;
	}
	let callList;
	const now = new Date();
	const windowStart = new Date();
	windowStart.setTime(now.getTime() - Math.round(GAP_CALC_WINDOW_MS));

	if (hammerDetection.has(url)) {
		callList = hammerDetection.get(url);
		callList.push(now);
	} else {
		callList = [now];
		hammerDetection.set(url, callList);
	}

	while (callList.length > 1 && callList[0].getTime() < windowStart.getTime()) {
		console.info("Removing ", callList[0]);
		callList.shift();
	}

	const waitMs = calculateWaitTime(callList);
	if (waitMs > 0) {
		console.warn("URL ", url, " getting hammered; backing off next call by ", waitMs, " ms");
	}
	return waitMs;
}

// TODO temporarily disable retry logic until we get the transaction problems sorted out in SMS
const FETCH_MAX_RETRIES = 0;

/**
 * Replacement for the builtin fetch() function, with error retry and logistic backoff when repeatedly hitting the same URL.
 * @param input see fetch()
 * @param init see fetch()
 * @returns {Promise<Response>} Promise with the fetch response
 */
async function ccFetch(input, init) {

	let retryCount = 1;

	while (true) {
		if (retryCount > 1) {
			console.warn("Attempt #", retryCount, " fetching ", input);
		}

		const waitTimeMs = determineWaitTime(input);
		// sleep, if needed
		if (waitTimeMs > 0) {
			await sleep(waitTimeMs);
		}

		try {
			// do the fetch
			const response = await fetch(input, init);
			if (response.ok) {
				return response;
			}
			console.error("Server returned ", response.statusText, " on URL ", response.url)
		} catch (e) {
			console.error("Caught error on fetch of ", input, ": ", e);
		}
		if (retryCount > FETCH_MAX_RETRIES) {
			throw Error("Network connection to " + input + " failed after " + retryCount + " attempts");
		}
		retryCount++;
	}
}

export default ccFetch;