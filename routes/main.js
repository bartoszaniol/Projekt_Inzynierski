const express = require("express");

const pagesController = require("../controllers/pages");
const isAuth = require('../middleware/Auth');

const router = express.Router();

router.get("/wykresy", isAuth, pagesController.getWykresy);

router.get("/dane", isAuth, pagesController.getDane);

router.get("/stream", isAuth, pagesController.getStream);

router.get("/swiatlo", isAuth, pagesController.getSwiatlo);
router.post("/swiatlo", isAuth, pagesController.postSwiatlo);

router.get("/login", pagesController.getLogin);
router.post("/login", pagesController.postLogin);

router.post("/logout", isAuth, pagesController.postLogout);


router.get("/", pagesController.getSzklarnia);

module.exports = router;
