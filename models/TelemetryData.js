const axios = require("axios");
const { iotCentralAppUrl, deviceId, sasToken } = require("../config/database");

const getTelemetryData = async () => {
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

  return {
    UID: telemetry1Response.data.value || null,
    Status: telemetry2Response.data.value,
  };
};

module.exports = {
  getTelemetryData,
};
