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

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
const run = async () => {
  try {
    const allPost = client.db("practice").collection("post");
    const allUserInfo = client.db("practice").collection("userInfo");
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
    //check out by id
    app.get("/checkoutbyid/:id", async (req, res) => {
      const { id } = req.params;
      const quary = { _id: ObjectId(id) };
      const rejult = await allPost.findOne(quary);
      res.send(rejult);
    });
    app.get("/orders", async (req, res) => {
      let quary = {};
      if (req.query.email) {
        quary = {
          email: req.query.email,
        };
      }
      const cursur = allUserInfo.find(quary);
      const rejult = await cursur.toArray();
      res.send(rejult);
    });
    app.post("/checkoutUser", async (req, res) => {
      const data = req.body;
      const rejult = await allUserInfo.insertOne(data);
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
    app.patch("/updateStatus/:id", async (req, res) => {
      const id = req.params.id;
      const status = req.body.status;
      console.log(id);
      const quary = { _id: ObjectId(id) };
      const updatedDoc = {
        $set: {
          status: status,
        },
      };
      const rejult = await allUserInfo.updateOne(quary, updatedDoc);
      res.send(rejult);
    });
    app.delete("/allpost/:id", async (req, res) => {
      const id = req.params.id;
      const quary = { _id: ObjectId(id) };
      const rejult = await allPost.deleteOne(quary);
      res.send(rejult);
    });
    app.delete("/deleteCird/:id", async (req, res) => {
      const id = req.params.id;
      const quary = { _id: ObjectId(id) };
      const rejult = await allUserInfo.deleteOne(quary);
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
