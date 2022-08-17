const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
mongoose.connect("mongodb://localhost:27017/tododb",{
 useNewUrlParser:true,useUnifiedTopology:true
},(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("yo sucess")
    }
})

const itemSchema = {
  title: String,
  description: String,
};

const Item = mongoose.model("Item", itemSchema);

app.get("/items", (req, res) => {
  Item.find()
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err));
});

app.post("/newitem", (req, res) => {
  const newItem = new Item({
    title: req.body.title,
    description: req.body.description,
  });

  newItem
    .save()
    .then((item) => console.log(item))
    .catch((err) => res.status(400).json("Error " + err));
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  Item.findByIdAndDelete({ _id: id }, (req, res, err) => {
    if (!err) {
      console.log("Item deleted");
    } else {
      console.log(err);
    }
  });
});

app.put("/put/:id", (req, res) => {
  const updatedItem = {
    title: req.body.title,
    description: req.body.description,
  };

  Item.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: updatedItem },
    (req, res, err) => {
      if (!err) {
        console.log("Item updated");
      } else {
        console.log(err);
      }
    }
  );
});

app.listen(8080, function () {
  console.log("Express is running");
});