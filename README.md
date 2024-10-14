## HEAT APP - Howdy English Assessment Task

Initial English Assestment task for candidates using AI to create questionnaire and correct the answers provided by the candidate.

## Structure

The project consists of two folders, `heat-back` for the back end created with NodeJs & Express and `heat-from` for the frontend created with React & Next

## Getting Started

First, from the main folder, run the  server:

```bash
cd zoho-poc

yarn
# or
npm install

yarn start
# or
npm start

```

The backend should start listening at port the port specified in the .env file.

Secondly, from the main folder, run the client with the 'index.html' file with your browser or GoLive extension as you prefer.

To test the Backend you can try:

```
POST /api/zoho-sign

payload: {
    "templateId": <template-id>,
    "recipientName": <recipient-name>,
    "recipientEmail": <recipient-email>
}
```

Or you can use the form in the 'index.html'  file as you prefer.


## Environment variables

Both the frontend and backend has an example `.env.development` with the variables needed to run the app, check the real values with a code owner to spin your local environment!
