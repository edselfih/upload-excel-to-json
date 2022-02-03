const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uploadSchema = new Schema ({
    name:{  
        type:String  
    },  
    address:{  
        type:String  
    },    
    age:{  
        type:Number  
    }
})

module.exports = mongoose.model('Upload' , uploadSchema)