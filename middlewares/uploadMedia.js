const multer = require("multer");

const MIME_TYPES = {
    "image/jpg" : "jpg",
    "image/jpeg" : "jpg",
    "image/gif" : "gif",
    "image/png" : "png"
};
maxSize = 2*1024*1024;
const DIR = './IMG';
const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) =>{
        const name = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const extension = MIME_TYPES[file.mimetype];
        cb(null, `${name}.${extension}`);
    }
})
module.exports = multer({
    storage,
    limits:{fileSize: maxSize}
}).single('picture');
