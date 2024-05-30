const jwt = require("jsonwebtoken")
const user = require("../models/users");
const usercourse = require("../models/usercourses");
const courses = require("../models/courses");
const boughtcourseslist = require('../models/boughtcourses');
const boughtcourses = require("../models/boughtcourses");


const createToken = (_id)=>{
    return jwt.sign({_id},'SuperSecret',{expiresIn:'24h'})
}


const loginUser = async  (req,res)=>{
    const {username,password,email} = req.body;
    console.log(req.body.password,req.body.username,req.body.email)

    try{
        const User = await  user.login(email,password)

        const username = User.username;
        const id = User._id;

        const token = createToken(User._id)

        res.status(200).json({username,token,email,id})
        console.log("TOKEN:",token)

    }
    catch(error){
        res.status(400).json({error: error.message})
        console.log(error)
    }
}
    
const signupUser = async (req,res)=>{
    const {password,email,username} = req.body
    console.log(req.body.password,req.body.email,req.body.username)

    try{

        if( !password  || !email ){
            res.status(401).json("Boş değer var.");
            throw Error("Boş değer var.")
            
        }

        const User = await  user.signup(email,password,username)

        const token = createToken(User._id)

        res.status(200).json({email,token,message:"Hesap başarıyla oluşturuldu."})
        console.log("TOKEN: ",token)

    }
    catch(error){
        res.status(400).json({error:error.message})
        console.log(error);
    }
}

const userList = async(req,res)=>{
    const users = await user.find().sort({createdAt:-1})


    res.status(200).json(users)
}

const usercourseList = async (req, res) => {
    try {
        const userid = req.params.id
        console.log(userid)

        const existingUserCourse = await usercourse.findOne({ userId: userid, courseId: req.body.courseData._id});

        const boughtUserCourse = await boughtcourseslist.findOne({ userId: userid, courseId: req.body.courseData._id});

        if (existingUserCourse) {
            return res.status(400).json({ error: 'Bu kurs sepete eklenmiş!' });
        }
        if (boughtUserCourse) {
            return res.status(400).json({ error: 'Bu kurs satın alınmış!' });
        }

        const data = req.body;
        console.log(req.body.courseData.author)

        const usercourses = await usercourse.create({
            userId:userid,
            courseId: req.body.courseData._id,
            img: req.body.courseData.img,
            title: req.body.courseData.title,
            exp: req.body.courseData.exp,
            author: req.body.courseData.author,
            price: req.body.courseData.price,
            category: req.body.courseData.category
        });

        res.status(200).json({usercourses,message:"Kurs başarıyla sepete eklendi."});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error' });
    }
};

const getusercourseList = async (req,res)=>{
    const userId = req.params.id
    let total = 0;

    try{
        console.log(userId)
        const courses = await usercourse.find({userId}).sort({createdAt:-1})

        for(let i = 0;i<courses.length;i++){

            total = total + parseInt(courses[i].price,10);

        }

        res.status(200).json({courses:courses,total:total});

    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }

    

}

const deleteCourse = async(req,res)=>{

    try{

        console.log(req.body.courseData.courseId);

        const deletedcourse = await usercourse.findByIdAndDelete(req.body.courseData._id);

        if (!deletedcourse) {
            return res.status(404).json({ error: 'Kurs mevcut değil.' });
          }

        res.status(200).json(deletedcourse);

    }
    catch(err){
        console.log(err);
        res.status(500).json(err)
    }   

}

const resetCart = async (req,res)=>{
    try{
        const userId = req.params.id
        const zerocart = await usercourse.deleteMany({userId})

        res.status(200).json(zerocart);

    }
    catch(err){
        console.log(err);
        res.status(500).json(err)
    } 
    
    
}

const boughtcourseAdd  = async (req,res)=>{

    const boughtcourses = req.body.course;

   try{

    for (let i = 0; i < boughtcourses.length; i++) {
        const course = await boughtcourseslist.create({
            userId: boughtcourses[i].userId,
            courseId: boughtcourses[i].courseId,
            img: boughtcourses[i].img,
            title: boughtcourses[i].title,
            exp: boughtcourses[i].exp,
            author: boughtcourses[i].author,
            category: boughtcourses[i].category
        });
    }
    
    res.status(200).json("ok")

   }
   catch(err){
    console.log(err);
    res.status(500).json(err)
    
   }

}
const boughtcoursesList = async(req,res)=>{
    try{
        const userId = req.params.id
        console.log(userId)
        const list = await boughtcourses.find({userId});

        res.status(200).json(list);

    }
    catch(err){
        res.status(500).json(err)
    }
}


module.exports = {
    loginUser,
    signupUser,
    userList,
    usercourseList,
    getusercourseList,
    deleteCourse,
    resetCart,
    boughtcourseAdd,
    boughtcoursesList
}