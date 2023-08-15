const dbPool = require("../config/database");

const createHistory = async (UID, status, timestamp) => {
  const SQLQuery =
    "INSERT INTO history (uid, status, timestamp) VALUES (?, ?, ?)";

  await dbPool.execute(SQLQuery, [UID, status, timestamp]);
};

module.exports = {
  createHistory,
};
