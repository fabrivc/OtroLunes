const express = require('express');
const {Router} = require('express');
const router = Router();
const userControllers = require('../controllers/userControllers');
const auth = require('../middlewares/authMiddleware')
const validatorSave = require('../middlewares/saveMiddleware');
const path = require('path');

//Imagenes con Multer
const multer = require('multer');
const adminController = require('../controllers/adminController');
//const userController = require('../controllers/user');
const multerDiskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = path.join(__dirname, '../../uploads/avatars')
        cb (null, folder);
    },
    filename: (req, file, cb) => {
        const nombreArchivo = 'imagenUsuario' + Date.now() + path.extname (file.originalname);
        cb(null, nombreArchivo)
    }
})
const fileUpload = multer({ storage: multerDiskStorage});

//Middlewares
//const guestMiddleware = require('../middlewares/guestMiddleware');
//const authMiddleware = require('../middlewares/authMiddleware');

//Crear un Usuario
router.get('/register', userControllers.create);

//Guardar Usuario
router.post('/register', [fileUpload.single('imagenUsuario'), validatorSave], userControllers.save);

//Iniciar Sesion
router.get('/login',userControllers.login);

//Acceso a Cuenta
router.post('/access',userControllers.access);

//Perfil de Usuario
router.get('/profile', userControllers.profile);

router.get('/userList', adminController.update);
//Listado de Usuarios
router.get('/list', userControllers.list);
router.get('/listComun', userControllers.list);

//Desloguear Usuario
router.get('/logout',userControllers.logout);

//Editar un Usuario
router.get('/edit', userControllers.edit);
/*
router.get('/edit', userControllers.editList);
router.post('/userUpdate/', userControllers.editList); */
router.post('/userUpdate/', userControllers.userUpdate);

//Eliminar un Usuario
router.post('/delete/:id', userControllers.userDelete);


//router.get('/userUpdate/:id', user.edit);


//post
//router.post('/create', create);
//router.post('/register', save);
//router.post('/access',access);

//router.post('/edit', edit)

//put

//router.put('/upload/password', [], uploadPassword);
//router.put('/upload/avatar', [], uploadAvatar);



module.exports = router;