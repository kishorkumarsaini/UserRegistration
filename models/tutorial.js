const mongoose = require('mongoose');

const TutorialSchema = mongoose.Schema({

    title:{
        type:String,
        required:[true,'Please enter the title']
    },
    description:{
        type:String,
        required:[true,'Please enter the description'],
    },
    published:{
        type:Boolean
    }

},{timestamps:true});

TutorialSchema.method("toJSON",function(){
    const{ __v,_id,...object} =this.toObject();
    object.id = _id;
    return object;
});


module.exports = mongoose.model('tutorial',TutorialSchema);