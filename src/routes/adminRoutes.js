const {Router} = require('express');
const product = require('../controllers/productControllers');
const router = Router();
const adminController = require('../controllers/adminController')
const path = require('path');
//const file = require('../controllers/file');
const multer = require('multer');
const upload = multer({storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.resolve(__dirname, '../../uploads/avatars')),
    filename: (req, file, cb) => cb(null, file.filename + '-' + Date.now() + path.extname(file.originalname))
})})



router.get('/edit/:id', adminController.edit);
router.post('/userList/:id', adminController.update);
router.post('/delete/:id', adminController.delete);






module.exports = router