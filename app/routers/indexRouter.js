const { Router } = require('express');

const indexRouter = Router();

indexRouter.get("/", indexController.getIndexPage);
indexRouter.get("*", indexController.get404Page);

module.exports = indexRouter;