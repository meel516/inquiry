# Inquiry Form Application

This project consists of a re-write of the Inquiry Form, which is currently hosted on a Wordpress VM, used by the Brookdale Contact Center.  The technology chosen was to write the new application using React along with several installed modules, which are listed below. (As more modules are used they will be listed here and documented as to why they were choosen, for future reference.)

* Formik - do I need to use this - the main reason is for validation and form framework
* React Bootstrap - is used to apply bootstrap formatting to the output of the React UI
* React Router - to route between page requests
* Okta - used for SSO to know who is signed into the application and for cloud security 
  - https://developer.okta.com/code/react/okta_react/
* React Select - this is a pretty powerful library that has type ahead searching, create new dropdown values, multiple values (similar to labels)
	- https://react-select.com/home#getting-started


## Getting Started

These instructions will help you get your machine setup to be able to run the application. If you are familiar with any of these components feel free to skip any of these sections. We will also help you get your local development environment setup to be able to make changes. (Note: This project was originally bootstrapped with [Create React App](https://github.com/facebook/create-react-app).)  And several packages were added to the system on an as needed basis.

### Install npm

If you already have Node.js installed on your machine you can skip this section.  In order to do development and You will need to install npm on your machine in order to run the application and do any development work.  npm (Node.js) can be downloaded [here](https://nodejs.org/en/download/).  The current version of NodeJS that the team is using is 10.16.3 and npm version 6.12.0, while it is not frowned upon to go outside these bounds, these are the versions used to deploy to the server.

### Install IDE

There are several IDEs that are available on the market that can be used for editing this code, see the list below.  While it is not required a team member use a specific IDE, if you choose a different IDE that teammember is responsible for their own development environment.  The team as a whole has decided to use VS Code.

*VS Code - most developers are using this for their IDE
*Atom

## Available Scripts

In the project directory, you can run the following commands:

### `npm run local`

Allows you to run the app in the development mode locally, using the local (.env.local) configuration.

A file needs to be created called .env.local in the base of the project.  Using the following environment variables you can change the behavior of the system.  The OKTA CLIENTID is maintained by the IDM team and but the team will have a copy on their local for testing purposes.  Each environment may have a have a different url/client id defined.

````
# application level environment properties
#REACT_APP_NODE_ENV='production'
#REACT_APP_APPLICATION_NAME=Connection Center Application

# sales services api
REACT_APP_SALES_SERVICES_URL=https://sales-services.uat.brookdale.com

# community api
REACT_APP_COMMUNITY_URL=http://unit-api.brookdale.com/bu-master

# version
REACT_APP_VERSION=localhost

# okta - local
REACT_APP_OKTA_URL=https://brookdaledev.oktapreview.com
REACT_APP_OKTA_CLIENTID=
````

### `npm start`

This script is reserved for running the application in the GCP server environment.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run test -t <path_to_test/>`

Launches only the single test suite based upon the file supplied.

### `npm run test:debug`

Launches the test runn in debugger mode so that you can debug into your unit tests if necessary.  The way to set a break point is to add debugger statement and run the test and chrome will stop at the debug point. [debugging tests](https://facebook.github.io/create-react-app/docs/debugging-tests)

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Versioning

The application version will conform to semantic versioning.  Each release feature release (at this point after each review) a new release will be cut incrementing the
minor version, until we reach production.

## GDK Installation

This

## Deployment

This section covers the deployment process of the Application to the GCP (Google Cloud Platform) environment.  At the time of this we are using the following

```
gcloud app deploy --verbosity=debug --no-promote --version 1.0.12rc1
```
