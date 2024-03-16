const mongoose = require("mongoose")
const router = require("./router/userRouter")
const router2 = require("./router/courseRouter")
const paymentrouter =  require("./router/paymentRouter")

const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express();



//middleware
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

app.use(cors({
  origin: "http://localhost:3001",
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(bodyParser.json());

app.use('/api',router);
app.use('/api',router2);
app.use('/api',paymentrouter)

require("dotenv").config();

const port = 3000;

const apiKey = process.env.apiKey;




mongoose.connect(`mongodb+srv://Cagan:${apiKey}@projecluster.khiaesn.mongodb.net/?retryWrites=true&w=majority&appName=ProjeCluster`, {
  //useNewUrlParser: true,
 // useUnifiedTopology: true 
 //projecluster.khiaesn.mongodb.net
})

.then(() => {
  console.log("MongoDB Connected.");
  app.listen(port, () => {
      console.log("Server Running...");
  });
})
.catch((error) => {
  console.error(error);
});

 



