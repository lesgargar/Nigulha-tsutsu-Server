const { isAuthenticated } = require("../middleware/jwt.middleware");
const User = require("../models/User.model");
const router = require("express").Router();

router.get("/myProfile", isAuthenticated, async (req, res, next) => {
    const{_id}= req.payload
    try{
       const myProfile= await User.findById(_id)
       res.status(200).json({user:myProfile})
    }catch(err){
        res.status(406).json({errorMessage:"Something`s weon", err})
    }
  
});
//falta 1 middleware img
router.patch("/edit", isAuthenticated, async (req, res, next) => {
    const {_id} = req.payload
    const {email, role, password, ...restBody} = req.body
    try{
        const profileUpdate = await User.findByIdAndUpdate(_id, restBody, {new:true})
        res.status(200).json({user:profileUpdate})

    }catch(err){
        res.status(406).json({errorMessage:"Something`s weon", err})
    }
  });



module.exports = router;
