require('dotenv').config();
const universityService = require("./services/universityService");
const InitiateMongoServer = require("./config/db");
var cron = require('node-cron');
var axios = require("axios").default;


InitiateMongoServer();

function generateOptions(country) {
  return {
    method: 'GET',
    url: 'http://universities.hipolabs.com/search',
    params: { country }
  }
};

countries = [
  "argentina",
  "brazil",
  "chile",
  "colombia",
  "paraguay",
  "peru",
  "suriname",
  "uruguay"
]


cron.schedule('26 3 * * *', () => {
  for (const country of countries) {
    axios.request(generateOptions(country)).then(function (response) {
      console.log(response.data);
      try {
        universityService.createBatch(response.data);
      } catch (error) {
        console.error(error)
      }
    }).catch(function (error) {
      console.error(error);
    });
  }
});
