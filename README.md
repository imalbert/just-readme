This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Live demo is available here https://just-readme.netlify.app

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />

### `yarn build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. Your app is ready to be deployed!

## What the app is about

The app takes the [list of user repositories](https://developer.github.com/v3/repos/#list-repositories-for-a-user) and [a repository's readme content](https://developer.github.com/v3/repos/contents/#get-the-readme) from the [github public API](https://developer.github.com/v3).

### `react-router`

[react-router](https://developer.github.com/v3/repos/#list-repositories-for-a-user) is a client-side routing "Dynamic Routing" where the routes are treated as you would treat any other React Component and can be rendered throughout the app. In contrast with the traditional "Static Routing", all the routes are described in the top-level of the application.

### `markdown-it`

[markdown-it](https://github.com/markdown-it/markdown-it) is a markdown parser done right. Fast and easy to extend, as described in their readme.

