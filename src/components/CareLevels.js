import React, { Component } from 'react';

const extraCareLevelQuestions = {

}

class CareLevels extends React.Component {
  render() {
    return (
      <div class="row">
        <div class="col">
          <div class="row">
            <div class="col">
              <label for="recentvisit">Have you/they had a recent visit to the ER?</label>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="visitedEr" id="recentVisit" value="Yes" checked />
                <label class="form-check-label" for="exampleRadios1">Yes</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="visitedEr" id="recentVisit" value="No" checked />
                <label class="form-check-label" for="exampleRadios1">No</label>
              </div>
            </div>
            <div class="col">
              <label for="recentfall">Have you/they had a recent fall?</label>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="exampleRadios" id="recentVisit" value="option1" checked />
                <label class="form-check-label" for="exampleRadios1">Yes</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="exampleRadios" id="recentVisit" value="option1" checked />
                <label class="form-check-label" for="exampleRadios1">No</label>
              </div>
            </div>
        </div>
        <div class="row">
          <div class="col">
            <label for="recentvisit">Have you/they had a recent surgery?</label>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="exampleRadios" id="recentVisit" value="option1" checked />
              <label class="form-check-label" for="exampleRadios1">Yes</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="exampleRadios" id="recentVisit" value="option1" checked />
              <label class="form-check-label" for="exampleRadios1">No</label>
            </div>
          </div>
          <div class="col">
            <label for="recentfall">Have you/they had a recent or new illness?</label>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="exampleRadios" id="recentVisit" value="option1" checked />
              <label class="form-check-label" for="exampleRadios1">Yes</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="exampleRadios" id="recentVisit" value="option1" checked />
              <label class="form-check-label" for="exampleRadios1">No</label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label for="recentvisit">Do you/they have any wounds?</label>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="exampleRadios" id="recentVisit" value="option1" checked />
              <label class="form-check-label" for="exampleRadios1">Yes</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="exampleRadios" id="recentVisit" value="option1" checked />
              <label class="form-check-label" for="exampleRadios1">No</label>
            </div>
          </div>
          <div class="col">
            <label for="recentfall">Do they have any infections?</label>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="exampleRadios" id="recentVisit" value="option1" checked />
              <label class="form-check-label" for="exampleRadios1">Yes</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="exampleRadios" id="recentVisit" value="option1" checked />
              <label class="form-check-label" for="exampleRadios1">No</label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label for="recentvisit">Are you/they experiencing shortness of breath or difficulty breathing?</label>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="exampleRadios" id="recentVisit" value="option1" checked />
              <label class="form-check-label" for="exampleRadios1">Yes</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="exampleRadios" id="recentVisit" value="option1" checked />
              <label class="form-check-label" for="exampleRadios1">No</label>
            </div>
          </div>
          <div class="col">
            <label for="recentfall">Do you/they have difficulty leaving the home?</label>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="exampleRadios" id="recentVisit" value="option1" checked />
              <label class="form-check-label" for="exampleRadios1">Yes</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="exampleRadios" id="recentVisit" value="option1" checked />
              <label class="form-check-label" for="exampleRadios1">No</label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label for="recentfall">Do you/they have difficulty performing household tasks such as laundry, shopping or light housekeeping?</label>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="exampleRadios" id="recentVisit" value="option1" checked />
              <label class="form-check-label" for="exampleRadios1">Yes</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="exampleRadios" id="recentVisit" value="option1" checked />
              <label class="form-check-label" for="exampleRadios1">No</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default CareLevels;
