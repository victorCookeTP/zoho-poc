## ZOHO EMBEDDED SIGN URL PROOF OF CONCEPT

This is just a small POC to test the funcionality of the embedded sign url [API by Zoho](https://www.zoho.com/sign/api/embedded-signing.html)


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

body: 
{
    "templateId": <template-id>,
    "recipientName": <recipient-name>,
    "recipientEmail": <recipient-email>
}
```

Or you can use the form in the 'index.html'  file as you prefer. If the POC FE work it should open a new tab with the url for the signature!


## Environment variables

Envieronmental vars example: `.env.development` with the variables needed to run the app, check some working values with a code owner to spin your local environment!
