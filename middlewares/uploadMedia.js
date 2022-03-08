//gestion des requetes pour l'envoie de fichier

const multer = require("multer");

// dictionnaire de Mime types
const MIME_TYPES = {
    "image/jpg" : "jpg", 
    "image/jpeg" : "jpg",
    "image/gif" : "gif",
    "image/png" : "png"
};
maxSize = 2*1024*1024;
const DIR = './IMG';
//repertoire des fichier. avec generation des nom de fichier unique
const storage = multer.diskStorage({
    //destination de stockage
    destination : (req, file, cb) => {
        cb(null, DIR);
    }, 
    
    filename: (req, file, cb) =>{
        //suppression des espaces dans le nom du fichier
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype];

        cb(null, name + "_" + Date.now() + extension);
    }
})


module.exports = multer({
    storage, 
    limits:{fileSize: maxSize}
}).single("picture");
