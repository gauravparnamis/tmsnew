var express = require('express');
var router = express.Router();
const multer = require('multer');
var path = require('path');
const userctrl = require('../controller/users');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ 
  storage: storage, 
  limits: { 
    fileSize: 1024 * 1024 * 5 
  }
});

router.post('/register', userctrl.register); 

router.post('/check', userctrl.check);  

router.post('/login', userctrl.login); 

router.get('/username/', userctrl.username);  

router.post('/forgot', userctrl.forgot);  

router.post('/reset', userctrl.reset);  
  
router.post('/createuser', upload.single('file'), userctrl.createuser); 

router.get('/getuserlist', userctrl.getuserlist); 

router.get('/deleteUser', userctrl.deleteUser); 

router.get('/edit', userctrl.edit);
router.post('/edituser', upload.single('file'), userctrl.edituser); 

router.post('/CreateTask', userctrl.CreateTask); 

router.get('/gettask', userctrl.gettask); 

router.get('/deletetask', userctrl.deletetask);

router.get('/showedittask', userctrl.showedittask);

router.post('/edittask', userctrl.edittask); 

router.get('/getadmin', userctrl.getadmin);

router.get('/setrole', userctrl.setrole);

module.exports = router;


