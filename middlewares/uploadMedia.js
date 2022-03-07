//gestion des requetes pour l'envoie de fichier

const multer = require("multer");

// dictionnaire de Mime types
const MIME_TYPES = {
    "image/jpg" : "jpg", 
    "image/jpeg" : "jpg",
    "image/gif" : "gif",
    "image/png" : "png"
};

//repertoire des fichier. avec generation des nom de fichier unique
const storage = multer.diskStorage({
    //destination de stockage
    destination : (req, file, callback) => {
        callback(null, "IMG");
    }, 
    filename: (req, file, callback) =>{
        //suppression des espaces dans le nom du fichier
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype];

        callback(null, name + "_" + Date.now() + extension);
    }
})

module.exports = multer({storage}).single("image");
