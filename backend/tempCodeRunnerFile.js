const { MongoClient, ServerApiVersion } = require('mongodb');
const router = require("./router/userRouter")
const uri = "mongodb+srv://Cagan:CugaN3451.@projecluster.khiaesn.mongodb.net/?retryWrites=true&w=majority&appName=ProjeCluster";

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express();

app.use(express.json())

//middleware
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(bodyParser.json());

app.use('/api',router);

const port = 3000;

async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)  
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);

  app.listen(port,()=>console.log("server running..."));



