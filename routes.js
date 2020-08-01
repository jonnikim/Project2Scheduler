module.exports = function (app) {
  const application = require("./routes/application");
  const client = require("./routes/client");

  app.use("/", application);
  app.use("/client", client);
};
