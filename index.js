const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

const iotCentralAppUrl = process.env.IOT_CENTRAL_APP_URL;
const deviceId = process.env.DEVICE_ID;
const sasToken = process.env.SAS_TOKEN;

// Endpoint to fetch telemetry data for both telemetry values
app.get("/api/probox", async (req, res) => {
  try {
    const telemetry1Response = await axios.get(
      `${iotCentralAppUrl}/api/preview/devices/${deviceId}/telemetry/Humidity`,
      {
        headers: {
          Authorization: `SharedAccessSignature ${sasToken}`,
        },
      }
    );

    const telemetry2Response = await axios.get(
      `${iotCentralAppUrl}/api/preview/devices/${deviceId}/telemetry/Temperature`,
      {
        headers: {
          Authorization: `SharedAccessSignature ${sasToken}`,
        },
      }
    );

    const telemetryData = {
      Humidity: telemetry1Response.data.value,
      Temperature: telemetry2Response.data.value,
    };

    res.json({
      status: 200,
      message: "success",
      data: telemetryData,
    });
  } catch (error) {
    console.error("Error fetching telemetry data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching telemetry data." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
