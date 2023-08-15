const mysql = require("mysql2");

const dbPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = dbPool.promise();
module.exports = {
  iotCentralAppUrl: process.env.IOT_CENTRAL_APP_URL,
  deviceId: process.env.DEVICE_ID,
  sasToken: process.env.SAS_TOKEN,
  port: process.env.PORT,
};
