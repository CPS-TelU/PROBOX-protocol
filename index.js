const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000; // Set your desired port

// Define your Azure IoT Central application URL and device ID
const iotCentralAppUrl = 'https://haricobaiot.azureiotcentral.com';
const deviceId = 'nodemcu1';
const sasToken = 'sr=8663d388-ebb8-43d2-b8ec-cc18e5c0b81e&sig=xk2xcb52DPCKj0R6FORcBpMGKktXw4P%2B2Rp3S5KvamI%3D&skn=haricobaiot&se=1723272328800';

// Endpoint to fetch telemetry data for both telemetry values
app.get('/api/telemetry', async (req, res) => {
  try {
    const telemetry1Response = await axios.get(`${iotCentralAppUrl}/api/preview/devices/${deviceId}/telemetry/Humidity`, {
      headers: {
        Authorization: `SharedAccessSignature ${sasToken}`
      }
    });

    const telemetry2Response = await axios.get(`${iotCentralAppUrl}/api/preview/devices/${deviceId}/telemetry/Temperature`, {
      headers: {
        Authorization: `SharedAccessSignature ${sasToken}`
      }
    });

    const telemetryData = {
      Humidity: telemetry1Response.data.value,
      Temperature: telemetry2Response.data.value
    };

    res.json({
        status: 200,
        message: 'success',
        data: telemetryData});
  } catch (error) {
    console.error('Error fetching telemetry data:', error);
    res.status(500).json({ error: 'An error occurred while fetching telemetry data.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
