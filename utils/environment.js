const accessOrigin = [
  "http://172.18.0.1:3001",
  "http://localhost:3000",
  "http://172.18.0.1:3000",
  "http://localhost:3001",
  "http://45.118.144.98:8081"
];
const DB_NAME = "project_management";
const password = "Son123456";
const username = "soncv";
const OAuth = "http://auth.impl.vn/oauth/token";
const OAuthInfo = "http://auth.impl.vn/api/user-info";
const expiresIn = "10s";

module.exports = {
  accessOrigin,
  DB_NAME,
  password,
  username,
  OAuth,
  OAuthInfo,
  expiresIn
};
