const log4js = require("log4js");

log4js.configure({
  appenders: {
    loggerConsole: { type: "console" },
    loggerWarningFile: { type: "file", filename: "warning.log" },
    loggerErrorFile: { type: "file", filename: "error.log" },

    loggerDefault: {
      type: "logLevelFilter",
      appender: "loggerConsole",
      level: "info",
    },
    loggerWarning: {
      type: "logLevelFilter",
      appender: "loggerWarningFile",
      level: "warn",
    },
    loggerError: {
      type: "logLevelFilter",
      appender: "loggerErrorFile",
      level: "error",
    },
  },
  categories: {
    default: {
      appenders: ["loggerDefault"],
      level: "all",
    },
    custom: {
      appenders: ["loggerDefault", "loggerWarning", "loggerError"],
      level: "all",
    },
  },
});

const logger = log4js.getLogger("custom");
module.exports = logger;
