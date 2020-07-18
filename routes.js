module.exports = function (app) {
  const application = require("./routes/application");
  const admin = require("./routes/admin");
  const client = require("./routes/client");
  const auth = require("./routes/auth");

  app.use("/", application);
  app.use("/admin", admin);
  app.use("/client", client);
  app.use("/auth", auth);
};
