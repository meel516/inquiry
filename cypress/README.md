# Connect Center Automated Tests
Tests are written in JavaScript using the [cypress](https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell) framework.

## Running Tests
Before running tests, be sure to start the application locally with `npm run local`

 - `npm run cypress:run` - will run all tests in a headless browser. A video will be created for failing tests in `cypress/videos`.
 - `npm run cypress:open` - will open the cypress test runner which allow for running individual specs. Will open a brower to run the tests cases and rerun as you save related files.

 ## Specs
- [Communities](./integration/communities_spec.js) - Tests concerning the Add Community button and form elements within a Community.
- [Influencer](./integration/influencer_spec.js) - Tests concerning the influencer name, phone, email, and address. Note: must account for the duplicate modal.
- [Inquiry Form](./integration/inquiry_form_spec.js) - Has a tests to touch every field on the form. Intended as a smoke test to ensure the selectors and component utilities in `/utils` function properly.
- [Login](./integration/login_spec.js) - Tests that the test user can login and will be redirected to the inquiry form.
- [Notes](./integration/notes_spec.js) - Tests validation requirements for all the notes.
- [Prospect](./integration/prospect_spec.js) - Tests concerning the prospect name, phone, email, and age.
- [Required Validation](./integration/required_validation_spec.js) - Touches every required field on the form and ensures the required validation is thrown.
- [Result of Call](./integration/result_of_call_section_spec.js) - Additional tests for fields in the result of call section.
- [Second Person](./integration/second_person_spec.js) - Tests concerning the result of call section and associated fields that show.

## Utilities
### [Befores](./utils/befores/index.js)
Helpers intended to be used in `before` and `beforeEach` blocks of tests.
- `replaceFetch` - must be called before each spec runs. Cypresss can only mock out and inspect XHR calls, this utility replaces the native browser fetch with one based on XHR. See https://github.com/cypress-io/cypress/issues/95.
- `login` - authenticates the test user with okta so the implicit flow succeeds.
- `setupAllMocks` - will mock out all api calls used by the form, `setupDropdownMocks` and `setupDuplicateModalMocks` are also exposed if that's all that is needed. Mock data comes from json files defined in `/fixtures`. Each route has an [alias](https://docs.cypress.io/guides/core-concepts/variables-and-aliases.html#Aliases) - useful for waiting on an API calls response.
- `visitInquiryForm` - calls `cy.visit` and waits on the leadSource api call response (a fairly robust way to wait for the spinner to disappear before attempting to access form elements). Note: waiting on mutliple api calls should be possible, but wasn't working initially.

### [Elements](./utils/elements/index.js)
Exposes APIs for elements that cannot be directly accessed with a `cy.get` and a [selector](./utils/fieldSelectors.js) like react-select and react-number-format. Also exposes controls for components that are needed to successfully navigate the form like the Add Community button or duplicate modal.

### [Fields](./utils/fields.js) and [Field Selectors](./utils/fieldSelectors.js)
Matches the nesting structure of Formik's `values` property. Fields contains the path to each field (the value of the name attribute on each input). Field Selectors contain a jQuery selector (the input to `cy.get()`)

## [Commands](./support/commands.js)
Custom commands can be added to the `cy` object. `fastType` is one of these commands. It is used to quickly enter data into a `textarea` instead of waiting for `cy.type` to run. Note: it doesn't work the same for `input` elements.

## Tests To Implement
- There are no tests ensuring the duplicate modal populates the corrects fields based on what was selected and the data contained in the fixute. Note: when implementing this the [duplication](./fixtures/duplication.json) and [leadContact](./fixtures/leadContact.json) fixtures may need additional data or more fixutes may be needed for the different tests.
- There are no tests around the submit button and what happens on an sucessful/unsuccessful attempt. However, the [submitButton](./utils/elements/submitButton.js) element is setup to be able to control the modal.