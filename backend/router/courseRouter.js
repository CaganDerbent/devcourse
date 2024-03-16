const express = require("express");
const router = express.Router();

const {courseList,getCoursesFull,programmingLlist,dataScList,mobileList,gameList,webList,databaseList,softwareList} = require("../controller/courseController");

router.get("/courses",courseList);
router.get("/full",getCoursesFull);
router.get("/programming",programmingLlist)
router.get("/datasc",dataScList)
router.get("/mobile",mobileList)
router.get("/game",gameList)
router.get("/web",webList)
router.get("/database",databaseList)
router.get("/software",softwareList)

module.exports = router;