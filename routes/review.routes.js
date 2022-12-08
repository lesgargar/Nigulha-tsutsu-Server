const express = require("express");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const router = express.Router();
const Review = require("../models/Review.model");


//get all reviews from 1 store
router.get("/:storeId/reviews", isAuthenticated, async(req,res,next)=>{
    const {storeId} = req.params
    try{
        const allRevStore = await Review.find({_store:storeId})
        res.status(200).json({result: allRevStore})

    }catch(err){
        res.status(403).json({ errorMessage: "error :( ", err });
    }
});

router.post("/:storeId/newReview", isAuthenticated, async (req, res, next) => {
    const {_id} =req.payload
    const {storeId} = req.params
  try {
    const newReview = await Review.create({...req.body, _store:storeId, _owner: _id});
    res.status(201).json({result: newReview});
  } catch (err) {
    res.status(403).json({errormessage:"Error, review not created"})
  }
});

router.patch("/:idReview/edit", isAuthenticated,  async (req, res, next) => {
  const { idReview } = req.params;
  const { _owner, _store, ...restBody } = req.body;
  const {_id} = req.payload
  try {
    const reviewUpdate = await Review.findOneAndUpdate({_id:idReview, _owner:_id}, restBody, {new: true});
    res.status(200).json({ result: reviewUpdate });
  } catch (err) {
    res.status(403).json({ errorMessage: "update error :( ", err });
  }
});

router.delete("/:idReview/delete",isAuthenticated, async(req,res,next)=>{
const {idReview} =req.params
const {_id}= req.payload
    try{
await Review.findOneAndDelete({_id:idReview, _owner:_id});
res.status(200).json({ message: "Review deleted" })
    }catch (err) {
    res.status(403).json({ errorMessage: "Deleting error :( ", err });
  }
})

module.exports = router;