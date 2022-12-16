const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
//setup cloudinary 
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRET,
});

//
const storage = new CloudinaryStorage({
    cloudinary,
    params: (req,file) => {
        return {
            folder: "NigulhaTsutsu",
            allowedFormats:["png", "jpg", "jpeg","webp"],
            fileFilter: (req, file, cb)=>{
                if(!file.originalname.match(/\.(svg | gif | doc)$/)){
                    return cb(new Error('Archivo no valido'))
                }
                cb(null, file.originalname)
            },
            public_id: `app-${file.originalname}`
        }
    }
});
const uploadCloud = multer({storage})

module.exports = uploadCloud;