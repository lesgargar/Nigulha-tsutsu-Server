const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.routes")
const productRoutes = require("./product.routes")
const reviewRoutes = require("./review.routes")
const storeRoutes = require("./store.routes")
router.get("/", (req, res, next) => {
  res.json("All good in here");
});
router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/reviews", reviewRoutes);
router.use("/stores", storeRoutes);


module.exports = router;
