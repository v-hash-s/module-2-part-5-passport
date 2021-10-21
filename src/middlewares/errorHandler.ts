async function errorHandler(err: any, req: any, res: any, next: any) {
    if (res.headersSent) {
        return next(err);
    }

    res.status(500);
    res.send("Server Error");
}

export default errorHandler;
