# Inquiry Form Application

This project consists of a re-write of the Inquiry Form used by the Brookdale Contact Center.  It was built using reactjs along with several installed modules, which are listed below.

Formik - do I need to use this - the main reason is for validation but not sure?
React Bootstrap - is used to apply bootstrap formatting to the output of the reactjs ui
React Router - to route between page requests
Okta - used to connect to okta and requires react-router to be in place
  - https://developer.okta.com/code/react/okta_react/
React Select - this is a pretty powerful library that has type ahead searching, create new dropdown values, multiple values (similar to labels)
	- https://react-select.com/home#getting-started


## Getting Started

These instructions will help you get your machine setup to be able to run the application. If you are familiar with any of these components feel free to skip any of these sections. We will also help you get your local development environment setup to be able to make changes. (Note: This project was originally bootstrapped with [Create React App](https://github.com/facebook/create-react-app).)  And several packages were added to the system on an as needed basis.

### Install npm

If you already have Node.js installed on your machine you can skip this section.  In order to do development and You will need to install npm on your machine in order to run the application and do any development work.  npm (Node.js) can be downloaded [here](https://nodejs.org/en/download/).

### Install IDE

There are several IDEs that are available on the market that can be used for editing this code, see the list below.

*Atom
*VS Code - most developers are using this for their IDE
*Notepad++
*Sublime

## Available Scripts

In the project directory, you can run the following commands:

### `npm run local`

Allows you to run the app in the development mode locally, using the local .env.local configuration.

A file needs to be created called .env.local in the base of the project.


### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
