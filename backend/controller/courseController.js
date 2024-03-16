const course = require("../models/courses");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer")

const courseList = async (req,res)=>{

    const courses = await course.find().sort({createdAt:-1});

    res.status(200).json(courses);


}

const programmingLlist = async (req,res)=>{

  const courses = await course.find({category:"Programlama Dilleri"}).sort({createdAt:-1});

  res.status(200).json(courses);


}

const dataScList = async (req,res)=>{

  const courses = await course.find({category:"Veri Bilimi"}).sort({createdAt:-1});

  res.status(200).json(courses);


}

const  mobileList = async  (req,res)=>{
  const courses = await course.find({category:"Mobil Geliştirme"}).sort({createdAt:-1});

  res.status(200).json(courses);


}

const gameList = async (req,res)=>{

  const courses = await course.find({category:"Oyun Geliştirme"}).sort({createdAt:-1});

  res.status(200).json(courses);


}

const webList = async (req,res)=>{

  try{
    const courses = await course.find({category:"Web Geliştirme"}).sort({createdAt:-1});

    res.status(200).json(courses);
  }

  catch(err){
    console.log(err)
    res.status(400).json({error:err})
  }


}

const databaseList = async (req,res)=>{

  const courses = await course.find({category:"Veri Tabanı Tasarımı"}).sort({createdAt:-1});

  res.status(200).json(courses);


}

const softwareList = async (req,res)=>{

  const courses = await course.find({category:"Yazılım Mühendisliği"}).sort({createdAt:-1});

  res.status(200).json(courses);


}

const getCoursesFull = async (req, res) => {
        
   /**
    try {
                 
         const browser = await puppeteer.launch({ headless: true });
         const page = await browser.newPage();
         await page.goto(`https://www.udemy.com/`);
         
   
             
         const content = await page.content();
 
         const browser2 = await puppeteer.launch({ headless: true });
         const page2 = await browser2.newPage();
         await page2.goto(`https://www.udemy.com/`);
         
   
             
         const content2 = await page2.content();
             
         console.log(content)
         console.log(content2)
                 
           
           
               const ch = cheerio.load(content);
               ch('.course-list--card-layout-container--0J72A').each((index, element) => {
           
                 const infocont = ch(element).find('.course-card-module--main-content--pEiUr.course-card-module--has-price-text--g6p85');
                 console.log(infocont.text())
                 
                     const imgcont = ch(element).find('.course-card-module--image-container--o-meJ');
               
                     const title = infocont.find('h3.ud-heading-md.course-card-title-module--course-title--wmFXN a').text();
               
                     console.log(title);
                 
               });
             } catch (err) {
               console.log(err);
             }
   */
        
      };


module.exports = {courseList,getCoursesFull,programmingLlist,dataScList,mobileList,gameList,webList,databaseList,softwareList}