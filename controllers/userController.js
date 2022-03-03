const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {User} = require('../models');

//le token sera valide pendant 3 mois
const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
    return jwt.sign({id}, "OurSuperLongRandomSecretToSignOurJWTgre5ezg4jyt5j4ui64gn56bd4sfs5qe4erg5t5yjh46yu6knsw4q", {
        expiresIn: maxAge
    })
}

const userController = {
    getAllUsers: async (req, res) =>{
        try {
            const allUsers = await User.findAll();
            res.json(allUsers);
        }catch(err){
            console.trace(err);
            res.status(500).json(err.toString());
        }
    },

    signUp: async (req, res) => {
        const {name, email, password, passwordConfirm } = req.body;
        // 1: Vérifier le format de l'email
        if (!emailValidator.validate(email)) {
          return res.render('signup', {
              error: 'Cet email n\'est pas valide.',
          });
      }

  try {
    // 2: Vérifier l'existence de l'email
    const user = await User.findOne({
        where: {
            email,
        }
    });
    if (user) {
      return res.render('signup', {
          error: 'Cet email est déjà utilisé par un utilisateur.',
      });
  } 
   // 3: On compare les 2 password fournis
   if (password !== passwordConfirm) {
    return res.render('signup', {
        error: 'Les deux mots de passes ne concordent pas.',
    });
  }
  // On crée enfin l'user:
  const newUser = new User({
    name,
    email,
    password: bcrypt.hashSync(password, 10),
  });
  await newUser.save();
            res.status(200).json('/login');
  
  }catch (err) {
    console.trace(err);
    res.status(500).send(err);
  }},

    logIn: async(req, res) => {
        const {email, password} = req.body;
        // 1: On recupère le compte associé à l'email
        try {
          const user = await User.findOne({
              where: {
                  email,
              }
          });
          
          if (!user) {
              return res.status(400).json('Cet email n\'existe pas.');
          }

          // 2: On compare les passwords avec bcrypt
          if (!bcrypt.compareSync(password, user.password)) {
              return res.status(400).json('Le mot de passe fourni n\'est pas valide.');
          }
          // On peux connecter l'user
          // on COPIE les valeurs de user.dataValues dans sessionUser
          const sessionUser = { ...user.dataValues };
          sessionUser.fullname = user.getFullname();
          delete sessionUser.password;

          req.session.user = sessionUser;

          res.status(200).json('connexion ok');
      } catch (err) {
          console.trace(err);
          res.status(500).json(err.toString());
      }},

    logOut: (req, res)=> {
        req.session.user = undefined;
        res.status(200).json('deconnection');
    }
};

module.exports = userController;