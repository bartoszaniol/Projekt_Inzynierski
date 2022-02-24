const express = require("express");

const pagesController = require("../controllers/pages");

const router = express.Router();

router.get("/wykresy", pagesController.getWykresy);

router.get("/dane", pagesController.getDane);

router.get("/stream", pagesController.getStream);

router.get("/swiatlo", pagesController.getSwiatlo);

router.get("/", pagesController.getSzklarnia);

module.exports = router;
