const express = require("express");
const { MongoClient } = require("mongodb");
const multer = require("multer"); // image upload

const app = express();
const port = 3000;
const fs = require("fs");

const path = require("path");

const cors = require("cors");
app.use(cors());
const upload = multer({ dest: "uploads/" });

app.use(express.json()); // Add this line to parse JSON request bodies

const url =
  "mongodb+srv://saffiullahraja01:b1qe6hi8Q64bMKMk@plantbuddyclustor.h6k2z.mongodb.net/?retryWrites=true&w=majority&appName=PlantBuddyClustor";

async function main() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connection Success");
    const dbo = client.db("PlantBuddy");

    // GET API to retrieve all users
    app.get("/getUsers", async (req, res) => {
      try {
        const users = await dbo.collection("Users").find({}).toArray();
        res.json(users);
      } catch (err) {
        console.error("Error retrieving users:", err);
        res.status(500).send(err);
      }
    });

    //Register
    app.post("/register", async (req, res) => {
      const newUser = req.body;
      const { email, password } = req.body;

      console.log("POST call");
      console.log("Received request body:", newUser);

      const user = await dbo.collection("Users").findOne({ email });

      console.log(user);

      if (user) {
        return res.status(400).json({ message: "User Already Exists" });
      }

      if (!newUser || !newUser.email || !newUser.password) {
        return res.status(400).json({ message: "Invalid data received" });
      }

      try {
        const result = await dbo.collection("Users").insertOne(newUser); 
        console.log("Insert result:", result);

        if (result.insertedId) {
          res.status(201).json({
            message: "User added successfully",
            id: result.insertedId,
          });
        } else {
          res.status(500).json({ message: "Failed to add user" });
        }
      } catch (err) {
        console.error("Error inserting document:", err);
        res.status(500).send(err);
      }
    });

    //Login
    app.post("/login", async (req, res) => {
      console.log();
      const { username, password } = req.body;

      try {
        const user = await dbo.collection("Users").findOne({ username });

        if (!user) {
          return res.status(400).send("Invalid username or password");
        }
        if (password === user.password) {
          res.status(200).send("true");
        } else {
          res.status(400).send("Incorrect Password");
        }
      } catch (err) {
        console.error("Error logging in:", err);
        res.status(500).send("Internal Server Error");
      }
    });

    // Upload Products by base64 Admin Listing of Products  category ===1 ? indoor : outDoor
    app.post("/uploadProducts", async (req, res) => {
      const { user_id, product_id, image, added_date, name, price, category } = req.body;

      try {
        const result = await dbo.collection("Products").insertOne({
          user_id,
          product_id,
          added_date,
          image: image,
          name,
          price,
          category
        });
        res.status(201).json({
          message: "Image uploaded successfully",
          id: result.insertedId,
        });
      } catch (err) {
        console.error("Error inserting document:", err);
        res
          .status(500)
          .json({ message: "Internal Server Error", error: err.message });
      }
    });

    // Get all products Listed
    app.get("/getProducts", async (req, res) => {
      console.log();
      const { username, password } = req.body;

      try {
        const user = await dbo.collection("Products").find({}).toArray();
        res.status(200).send(user);
      } catch (err) {
        console.error("Error logging in:", err);
        res.status(500).send("Internal Server Error");
      }
    });

    //Place Order by User
    app.post("/placeOrder", async (req, res) => {
      const { user_id, product_id, added_date, name, price, quantity } =
        req.body;

      try {
        const result = await dbo.collection("Products").insertOne({
          user_id,
          product_id,
          added_date,
          name,
          price,
          quantity
        });
        res.status(201).json({
          message: "Order Placed Successfully",
          id: result.insertedId,
        });
      } catch (err) {
        console.error("Error retrieving users:", err);
        res.status(500).send(err);
      }
    });

    //Get All Orders by user_id 
    app.get("/getAllOrders", async (req, res) => {
      const { user_id } =
        req.body;

      try {
        const result = await dbo.collection("Products").find({user_id}).toArray();
        res.status(201).json(result);
      } catch (err) {
        console.error("Error retrieving users:", err);
        res.status(500).send(err);
      }
    });

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (e) {
    console.error(e);
  }
}

main();
