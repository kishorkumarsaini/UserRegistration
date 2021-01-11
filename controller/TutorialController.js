const TutorialModel = require('../models/tutorial');


//Create and save the new tutorial

exports.create = (req,res)=>{

    //Validate the reques
    if(!req.body.title) return res.status(400).json({message:'Content is required'})

    // Crate a tutorial
    const tutorial = new TutorialModel({
        title:req.body.title,
        description: req.body.description,
        published: req.body.published? req.body.published:true
    });
    tutorial.save(tutorial)
    .then((data)=>{
        res.status(201).json({
            message:'success',
            tutorial:{
                data
            }
        })
    }).catch(err=>{
        res.status(500).json({
            message: err.message || 'Some error occurred while creation tutorial '
        })
    })

};

// Retrieve all tutorials from database

exports.findAll = (req,res)=>{

    // get all tutorials according to title
    const title = req.query.title;
    const condition = title? {title:{ $regex: new RegExp(title), $options: "i" } } : {};
    TutorialModel.find(condition)
    .then((data)=>{
        res.status(200).json({
            message:'success',
            data
        })
    })
    .catch((err)=>{
        res.status(500).json({
            message: err.message || 'Some error occurred while geting tutorials'
        })
    })

}

// Find a single tutorial with id

exports.findOne = (req,res)=>{

    const id = req.params.id;

    TutorialModel.findById(id)
    .then((data)=>{
        if(!data) return res.status(404).send({message:'Not found tutoral with id:'+id});
        else res.send(data);
    })
    .catch(err=>{
        res.status(500).send({message:'Error retieving the tutorial with id:'+id})
    })
};
// Update a tutorial by the id
exports.update = (req,res)=>{

    if(!req.body) {
        return res.status(400).json({
            message:'Data to update can not be empty'
        });
    }

    const id = req.params.id;
    TutorialModel.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then((data)=>{
        if(!data){
            res.status(404).json({
                message:"tutorial not found with id:"+id
            })
        }
        else res.send({message:'Tutorial updated successfully'});
    })
    .catch((err)=>{
        res.status(500).json({
            message: err.message||'Error occurred while updating the tutorial'
        })
    })


}

// Delete a tutorial with a specified id

exports.delete = (req,res)=>{
    const id = req.params.id;

    TutorialModel.findByIdAndRemove(id)
    .then(data=>{
        if(!data)
        {
            res.status(404).send({
                message:"Cannot delete tutorial"
            })
        }
        else{res.send({message:'Tutorial deleted successfully'})}
    })
    .catch(err=>{
        res.status(500).send({
            message:'Could not delete the tutorial some error acccurred'
        })
    });
}

// Delete all the tutorials from database


exports.deleteAll = (req,res)=>{

    TutorialModel.deleteMany({})
    .then(data=>{
        res.send({
            message:'Tutorials deleted successfully'
        })
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message|| "Some error occurred"
        })
    })

}

// Find all published tutorials
exports.findAllPublished = (req,res)=>{

    TutorialModel.find({published:true})
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message|| "Some error occurred"
        })
    })
}


