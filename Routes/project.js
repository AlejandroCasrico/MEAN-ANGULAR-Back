var express = require('express');
var projectController = require('../Controllers/project');

var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir:'./uploads'}) 

router.get('/home',projectController.home);
router.post('/test',projectController.test);
router.post('/save',projectController.saveProject);
router.get('/findProject/:id?',projectController.getProject);
router.get('/findAll',projectController.getProjects);
router.put('/update/:id',projectController.updateProject);
router.delete('/delete/:id',projectController.deleteProject);
router.post('upload/:id',multipartMiddleware,projectController.uploadImage);
module.exports = router;