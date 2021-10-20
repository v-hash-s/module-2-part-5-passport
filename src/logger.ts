import { NextFunction, Request, Response } from "express";
import * as log from "simple-node-logger";
import { Logger } from "simple-node-logger";

const logInfo: Logger = log.createRollingFileLogger({
  errorEventName: "error",
  logDirectory: "../logs",
  fileNamePattern: "logFile-<DATE>.log",
  dateFormat: "DD-MM-YYYY HH",
  timestampFormat: "DD-MM-YYYY HH:mm:ss.SSS",
});

function loggerFunction(
  reqOrMsg: Request | string,
  res?: Response,
  next?: NextFunction
): void {
  if (typeof reqOrMsg === "string") {
    logInfo.info(`Ответ сервера: ${reqOrMsg}`);
  } else {
    logInfo.info(`Запрос на сервер: Method - ${reqOrMsg.method}; 
        URL - ${reqOrMsg.url}; 
        Body - ${JSON.stringify(reqOrMsg.body)}; 
        Headers - ${JSON.stringify(reqOrMsg.headers)}`);
  }

  if (next) {
    next();
  }
}

export default loggerFunction;
