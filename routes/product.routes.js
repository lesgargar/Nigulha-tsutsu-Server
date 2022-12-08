const express = require("express");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const router = express.Router();
const Product = require("../models/Product.model");
const Store = require("../models/Store.model")


//all products from 1 store
router.get("/:idStore/products", async (req, res, next) => {
  const { idStore } = req.params;
  try {
    const products = await Product.find({ _store: idStore });
    res.status(200).json({ result: products });
  } catch (err) {
    res
      .status(403)
      .json({ errorMessage: "Error, cannot get the products." });
  }
});

router.post(
  "/:idStore/createProduct",
  isAuthenticated,
  async (req, res, next) => {
    const { idStore } = req.params;
    const {_id} = req.payload
    try {
        const isMyStore = await Store.findOne({_id:idStore, _owner:_id })
        if(!isMyStore){
            return res.status(403).json({errorMessage:"Not allowed"})
        }
      const newProduct = await Product.create({ ...req.body, _store: idStore });
      res.status(201).json({ result: newProduct });
    } catch (err) {
      res.status(403).json({ errorMessage: "Create product error :( ", err });
    }
  }
);

router.patch("/:id/edit", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const { _id } = req.payload;
  //add midlewate p images
  try {

    const productUpdate = await Product.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    res.status(200).json({ result: productUpdate });
  } catch (err) {
    res.status(403).json({ errorMessage: "update error :( ", err });
  }
});

router.delete("/:id/delete", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "product deleted" });
  } catch (err) {
    res.status(403).json({ errorMessage: "delete error :( ", err });
  }
});

module.exports = router;
