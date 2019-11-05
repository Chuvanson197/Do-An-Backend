var request = require("request");
var Member = require("../../controllers").member;
var moment = require("moment");

var config = require("../../config/authConfig");

module.exports = (email, refresh_token, res, callback) => {
  request.post(
    {
      url: "http://auth.impl.vn/oauth/token",
      form: {
        grant_type: config.grant_type,
        client_id: config.client_id,
        client_secret: config.clientSecret,
        refresh_token,
        scope: config.scope
      }
    },
    async function(error, httpResponse, body) {
      if (error || httpResponse.statusCode === 400) {
        let result = false;
        callback && callback(result);
      }
      let data = JSON.parse(body);
      await Member.savingToken(
        email,
        {
          access_token: data.access_token,
          refresh_token: data.refresh_token,
          last_auth: moment().format("YYYY-MM-DDTHH:mm:ss")
        },
        res
      );
      let result = true;
      callback && callback(result);
    }
  );
};
