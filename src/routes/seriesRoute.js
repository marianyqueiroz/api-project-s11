const expresss = require("express");
const router = expresss.Router();
const controller = require("../controller/seriesController");

router.get("/", controller.getAll);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.postSeries);
router.post("/series", controller.postSeries);
router.put("/:id", controller.putSeries);
router.delete("/:id", controller.deleteSerie);
router.patch("/:id", controller.patchSeries);

module.exports = router;