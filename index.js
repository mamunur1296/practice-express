const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

//medalWore
app.use(cors());
app.use(express.json());

//user: practivedb1254
//pass: 3qTZY7keGCb3FUEo

const uri =
  "mongodb+srv://practivedb1254:3qTZY7keGCb3FUEo@cluster0.qnvnenk.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
const run = async () => {
  try {
    const postLest = client.db("myPrictisePost").collection("postes");
    const posts = {
      title: "my fast post ",
      body: "this is in the  home in the houser in this home in to do",
    };
    const rejult = await postLest.insertOne(posts);
    console.log(rejult);
  } catch (error) {
    console.log(error);
  } finally {
  }
};

run().catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("hallo .");
});
app.listen(port, () => {
  console.log("I am here");
});
