# Transactions Dashboard

This is an implementation of a transaction dashboard written in node.js

## Features

It supports the following features
- It connects to a local development server to retrieve the transactions data.
- It supports pagination by selecting, the user can change the page using the buttons in the bottom.
- Filtering you can filter between different dates by adding some start and end dates on the filter bar on top. The dates should be in the format 'yyyy-mm-dd'
- It should handle connection errors gracefully and display an error component in those cases.
- It has an integrated api server using the json-server module, it stores the data on the `db.json` file.

## How to run the project

- You need to install the respective dependencies.

```
npm install
```

- Start the Api server
```
npm run serve
```

- Start the FrontEnd application

```
npm start
```