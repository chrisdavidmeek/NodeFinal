const app = require("./myCampaignManager/app");

const server = app.listen(8081, () => {
  console.log(`This application is running on port ${server.address().port}`);
});
