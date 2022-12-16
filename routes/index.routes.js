const express = require("express");
const router = express.Router();
const uploadRoutes = require("./upload.routes");

const authRoutes = require("./auth.routes")
const productRoutes = require("./product.routes")
const reviewRoutes = require("./review.routes")
const storeRoutes = require("./store.routes")
const userRoutes = require("./user.routes")
router.get("/", (req, res, next) => {
  res.json("All good in here");
});
router.use("/auth", authRoutes);
router.use("/user",userRoutes)
router.use("/products", productRoutes);
router.use("/reviews", reviewRoutes);
router.use("/stores", storeRoutes);
router.use("/upload",uploadRoutes)

module.exports = router;
