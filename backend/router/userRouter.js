const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth")

const {loginUser,signupUser,userList,usercourseList,getusercourseList,deleteCourse, resetCart,boughtcourseAdd, boughtcoursesList} = require("../controller/userController");

router.post("/user/register",signupUser);
router.post("/user/login",loginUser);

router.get("/user/list",requireAuth,userList);

router.post("/user/:id/courses",requireAuth,usercourseList);
router.get("/user/:id/courses",requireAuth,getusercourseList);

router.put("/user/:id/courses",requireAuth,deleteCourse);
router.put("/user/:id/courses/reset",requireAuth,resetCart);

router.post('/user/:id/boughtcourses',requireAuth,boughtcourseAdd);
router.get('/user/:id/boughtcourses',requireAuth,boughtcoursesList);



module.exports = router;