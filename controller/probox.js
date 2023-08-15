const axios = require("axios");
const { format } = require("date-fns");
const ProboxModel = require("../models/probox");
const { iotCentralAppUrl, deviceId, sasToken } = require("../config/database");

const createHistoryController = async (req, res) => {
  try {
    const telemetry1Response = await axios.get(
      `${iotCentralAppUrl}/api/preview/devices/${deviceId}/telemetry/uid`,
      {
        headers: {
          Authorization: `SharedAccessSignature ${sasToken}`,
        },
      }
    );

    const telemetry2Response = await axios.get(
      `${iotCentralAppUrl}/api/preview/devices/${deviceId}/telemetry/box`,
      {
        headers: {
          Authorization: `SharedAccessSignature ${sasToken}`,
        },
      }
    );

    const UID = telemetry1Response.data.value;
    const status = telemetry2Response.data.value;
    const timestamp = format(new Date(), "dd-MM-yyyy HH:mm:ss");

    if (UID !== null) {
      await ProboxModel.createHistory(UID, status, timestamp);

      res.status(201).json({
        message: "Data history created successfully",
        data: { UID, status, timestamp },
      });
    } else {
      res.status(200).json({
        message: "No data with UID available",
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error.message,
    });
  }
};

module.exports = {
  createHistoryController,
};
