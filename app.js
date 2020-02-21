const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const ENV = require("./utils/environment");

//DB connection
require("./database/connection");

const authRouter = require("./routes/authencation");
const customerRouter = require("./routes/customer");
const projectRouter = require("./routes/project");
const memberRouter = require("./routes/member");
const authencation = require("./middleware/authentication");
const customField = require("./routes/customField");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: ENV.accessOrigin,
    optionsSuccessStatus: 200,
    credentials: true
  })
);

app.use("/api/auth", authRouter);

app.use(authencation);

app.use("/api/customers", customerRouter);
app.use("/api/members", memberRouter);
app.use("/api/projects", projectRouter);
app.use("/api/customFields", customField);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
