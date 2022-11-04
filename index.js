const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

//medalWore
app.use(cors());
app.use(express.json());
//bd conuction

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qnvnenk.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
const run = async () => {
  try {
    const allPost = client.db("practice").collection("post");
    //dbpost
    app.get("/allpost", async (req, res) => {
      const quary = {};
      const cursur = allPost.find(quary);
      const rejult = await cursur.toArray();
      res.send(rejult);
    });
    app.get("/update/:id", async (req, res) => {
      const { id } = req.params;
      const rejult = await allPost.findOne({ _id: ObjectId(id) });
      res.send(rejult);
    });
    app.post("/allpost", async (req, res) => {
      const data = req.body;
      const rejult = await allPost.insertOne(data);
      res.send(rejult);
    });
    app.put("/update/:id", async (req, res) => {
      const { id } = req.params;
      const { body } = req;
      const quary = { _id: ObjectId(id) };
      const optins = { upsert: true };
      const updateData = {
        $set: {
          title: body.title,
          body: body.body,
          img: body.img,
          price: body.price,
          catagory: body.catagory,
        },
      };
      const rejult = await allPost.updateOne(quary, updateData, optins);
      res.send(rejult);
    });
    app.delete("/allpost/:id", async (req, res) => {
      const id = req.params.id;
      const quary = { _id: ObjectId(id) };
      const rejult = await allPost.deleteOne(quary);
      res.send(rejult);
    });
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
