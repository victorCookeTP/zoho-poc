const express = require('express')
const axios = require('axios')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())

const ZOHO_API_BASE_URL = 'https://sign.zoho.com/api/v1'

// Helper function to refresh the Zoho access token
async function getZohoAccessToken() {
  try {
    const response = await axios.post(
      `https://accounts.zoho.com/oauth/v2/token?refresh_token=${process.env.ZOHO_REFRESH_TOKEN}&client_id=${process.env.ZOHO_CLIENT_ID}&client_secret=${process.env.ZOHO_CLIENT_SECRET}&grant_type=refresh_token`
    )

    return response.data.access_token
  } catch (error) {
    console.log(error)
  }
}

// Endpoint to handle signing request
app.post('/api/zoho-sign', async (req, res) => {
  const { recipientName, recipientEmail, templateId, access_token } = req.body
  // Check if documentId is provided
  if (!templateId) {
    return res.status(400).json({ error: 'Document ID is required' })
  }

  try {
    const accessToken = access_token || (await getZohoAccessToken()) // for testing purposes sending a token in the request body.

    if (!accessToken) {
      return res
        .status(500)
        .json({ error: 'Could not generate a valid token, check the .env file please' })
    }

    // Create the Document for signature from a template (provided in the body of the FE request!)

    const body = {
      templates: {
        field_data: {
          field_text_data: {},
          field_boolean_data: {},
          field_date_data: {},
          field_radio_data: {},
          field_checkboxgroup_data: {},
        },
        actions: [
          {
            recipient_name: recipientName,
            recipient_email: recipientEmail,
            action_id: '424466000000035026', // this id is taken from Zoho account settings / Developer settings / template details for API
            signing_order: 1,
            verify_recipient: false,
            private_notes: '',
            is_embedded: true,
          },
        ],
        notes: '',
      },
    }

    const documentCreationResponse = await axios.post(
      `${ZOHO_API_BASE_URL}/templates/${templateId}/createdocument`,
      body,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const requestId = documentCreationResponse.data.requests.request_id

    const actionId = documentCreationResponse.data.requests.actions[0].action_id

    const docSignUrlResponse = await axios.post(
      `${ZOHO_API_BASE_URL}/requests/${requestId}/actions/${actionId}/embedtoken`,
      {},
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    )

    // Retrieve the embedded signing URL
    const signingUrl = docSignUrlResponse.data.sign_url
    res.json({ signingUrl })
  } catch (error) {
    console.error('Error in Zoho Sign API:', error)
    res.status(500).json({ error: 'Failed to generate signing URL' })
  }
})

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
