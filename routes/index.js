const express = require('express');
const router = express.Router({mergeParams: true});
const uploadControllers = require('../controllers/index');
const multer = require('multer')
const upload = multer({dest: 'upload/'});

router.route('/')
    .get(uploadControllers.uploadPage)
    .post(upload.single("uploadfile"),uploadControllers.upload)

module.exports = router