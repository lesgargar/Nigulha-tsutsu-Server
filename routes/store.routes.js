const express = require("express");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const router = express.Router();
const Store = require("../models/Store.model");

//view all stores
router.get("/", async (rq, res, next) => {
  try {
    const stores = await Store.find();
    res.status(200).json({result:stores});
  } catch (err) {
    res.status(403).json({ message: "Error, Cannot get stores" }, err);
  }
});

//create store
router.post(
  "/create",
  isAuthenticated,
  async (req, res, next) => {
    const { _id } = req.payload;
    try {
      const createStore = await Store.create({ ...req.body, _owner: _id });
      res.status(201).json({ result: createStore });
    } catch (err) {
      res.satus(403).json({ errorMessage: "Error, store not created" }, err);
    }
  }
);

//edit store 
///middleware para image *******************************************************
router.patch("/:storeId/edit", isAuthenticated,  async(req, res, next)=>{
    const{storeId} = req.params 
    const {_id }=req.payload
    const { image, ...restBody } = req.body 
try{
const storeUpdate = await Store.findOneAndUpdate({_id:storeId, _owner:_id}, {...restBody}, {new:true})
res.status(200).json({result: storeUpdate})
}catch(err){
    console.log("errorrr", err)
    res.status(403).json({errorMessage:"Error, could not edit"})
}
})

//delete store 
router.delete("/:idStore/delete", isAuthenticated, async(req, res, next)=>{
    const{idStore} = req.params
try{
await Store.findByIdAndDelete(idStore);
res.status(200).json({message: "Store correctly deleted"})
}catch(err){

    res.status(403).json({errorMessage:"Error, could not delete store, pease try again"})
}
})

module.exports = router;