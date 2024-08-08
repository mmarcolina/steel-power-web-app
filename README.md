# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `($env:HTTPS = "true") -and (npm start)`

Runs the app in the development mode.\
The additional modifier for the HTTPS .env variable is used to get the C# API CORS policy to play nicely with the react app's incoming request. Originally used HTTP instead of HTTPS, and including this variable when calling npm start will allow us to subvert certificate signing for local dev purposes.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## How To Use

Run command listed above to start [http://localhost:3000](http://localhost:3000) in your browser, enter information in the dropwdown menu items provided, fetch results by clicking the 'Submit' button.