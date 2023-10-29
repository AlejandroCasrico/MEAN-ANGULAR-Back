
const { param, error } = require('jquery');
var ProjectModel = require('../Models/project');
var fs = require('fs');
var controller = {
    home: function(req,res){
        return res.status(200).send({
            message:"Home Page"
        });
    },
    test:function(req,res){
        return res.status(200).send({
            message:'Test Page'
        })
    },
    //save a project
    saveProject:function(req,res){
        var project = new ProjectModel();
        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.year = params.year;
        project.category = params.category;
        project.leng = params.leng;
        project.image = params.image;

        project.save()
            .then((projectStored)=>{
                if(!projectStored){
                   return res.status(404).send({message:'Cant save the project'}); 
                } 
                return res.status(200).send({message:'Project saved successfully'})
            })
            .catch((error)=>{
                return res.status(500).send({message:'Error while saving'},error);
            })


        return res.status(200).send({
            project:project,
            message:'Method save Project works'
        })
    },
//get only one project
    getProject:function(req,res){
        var projectId = req.params.id;
        if(projectId === null) return res.status(400).send({ message: 'Project ID is missing' });
        ProjectModel.findById(projectId)
        .then((project)=>{
            if(!project){
                return res.status(404).send({message:'Canto find the project'});
            }
            return res.status(200).send({message:'Project found!!'})
        }).catch((error)=>{
            return res.status(500).send({message:'An error just happened while searching the project'},error);
        })
    },

//get all projects
getProjects: function (req, res) {
    ProjectModel.find({})
    .sort('year')
      .exec()
      .then((projects) => {
        if (!projects || projects.length === 0) {
          return res.status(404).send({ message: 'No projects found' });
        }
        return res.status(200).send({ projects });
      })
      .catch((error) => {
        return res.status(500).send({ message: 'Error getting the data', error });
      });
  },
  //update projects
  updateProject:function(req,res){
    var projectId = req.params.id;
    var update = req.body;
    ProjectModel.findByIdAndUpdate(projectId,update)
        .then((projectUpdated) =>{
            if(!projectUpdated){
                return res.status(404).send({message:'Cant updated the project'});
            }
            return res.status(200).send({message:'Project updated!!'});
        }).catch((error)=>{
            return res.status(500).send({message:'An error just happened while updating the project'},error);
        });
  },
  //delete projects
  deleteProject:function(req,res){
        var projectId = req.params.id;
        ProjectModel.findByIdAndRemove(projectId)
        .then((projectDeleted)=>{
            if(!projectDeleted){
                return res.status(404).send({message:'Cant delete the project'});
            }
            return res.status(200).send({message:'Project deleted!!'});
        }).catch((error)=>{
            return res.status(500).send({message:'An error just happened while deleting the project'},error);
        });
  },
  //upload Image
  uploadImage:function(req, res){
    var projectId = req.params.id;
    var file_name = 'image not loaded';
    if(req.files){
        var filePath = req.files.image.path;
        var filesSplit = filePath.split('\\');
        var file_name = filesSplit[1];
        var exitSplit = file_name('\.');
        var fileExt = exitSplit[1];
        if(fileExt === 'png' || fileExt === 'jpg' || fileExt === 'jpeg' || fileExt === 'gif'){
             ProjectModel.findByIdAndUpdate(projectId,{new:true},{image:filePath})
        .then((projectUpdated)=>{
            if(!projectUpdated){
                return res.status(404).send({message:'Cant update the project'});
            }
            return res.status(200).send({project:projectUpdated});
        }).catch((error)=>{
            return res.status(500).send({message:'An error just happened while uploading the project'},error);
        });
        }else{
            fs.unlink(filePath)
           
        }
      
    }else{
        return req.status(200).send({
            message:file_name
        })
    }
  }

}

module.exports = controller;