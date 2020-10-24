const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
    res.status(200).send({
        title: "API - Séries - Reprograma - Semana 11",
        version: "1.0.0"
    });
});

module.exports = router;