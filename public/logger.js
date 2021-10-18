"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log = require("simple-node-logger");
var logInfo = log.createRollingFileLogger({
    errorEventName: 'error',
    logDirectory: '../logs',
    fileNamePattern: 'logFile-<DATE>.log',
    dateFormat: 'DD-MM-YYYY HH',
    timestampFormat: 'DD-MM-YYYY HH:mm:ss.SSS'
});
function loggerFunction(reqOrMsg, res, next) {
    if (typeof reqOrMsg === 'string') {
        logInfo.info("\u041E\u0442\u0432\u0435\u0442 \u0441\u0435\u0440\u0432\u0435\u0440\u0430: " + reqOrMsg);
    }
    else {
        logInfo.info("\u0417\u0430\u043F\u0440\u043E\u0441 \u043D\u0430 \u0441\u0435\u0440\u0432\u0435\u0440: Method - " + reqOrMsg.method + "; \n        URL - " + reqOrMsg.url + "; \n        Body - " + JSON.stringify(reqOrMsg.body) + "; \n        Headers - " + JSON.stringify(reqOrMsg.headers));
    }
    if (next) {
        next();
    }
}
exports.default = loggerFunction;
