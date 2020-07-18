const graph = require("@microsoft/microsoft-graph-client");
require("isomorphic-fetch");

module.exports = {
  getUserDetails: async function (accessToken) {
    const client = getAuthenticatedClient(accessToken);

    const user = await client.api("/me").get();
    return user;
  },
  sendMail: async function (accessToken) {
    const newEmail = "jonni@dubsado.com";
    const client = getAuthenticatedClient(accessToken);

    const mail = {
      subject: "Microsoft Graph JavaScript Sample",
      toRecipients: [
        {
          emailAddress: {
            address: "jonni@dubsado.com",
          },
        },
      ],
      body: {
        content:
          "<h1>MicrosoftGraph JavaScript Sample</h1>Check out https://github.com/microsoftgraph/msgraph-sdk-javascript",
        contentType: "html",
      },
    };
    try {
      let response = await client.api("/me/sendMail").post({ message: mail });
      console.log(response);
    } catch (error) {
      throw error;
    }
  },
};
function getAuthenticatedClient(accessToken) {
  // Initialize Graph client
  const client = graph.Client.init({
    // Use the provided access token to authenticate
    // requests
    authProvider: (done) => {
      done(null, accessToken);
    },
  });

  return client;
}
