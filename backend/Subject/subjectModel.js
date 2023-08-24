const { default: mongoose } = require("mongoose");

class SubjectModel {
    constructor(){
        this.schema = new mongoose.Schema({
            subject:{type:String, required:true, unique:true}
        })
        this.subject = mongoose.model("tbl_Subjects", this.schema)
    }

    InsertSubject(data) {
        return this.subject.create(data)
    }

    GetSubject(){
        return this.subject.find()
    }

}

const subjectModel = new SubjectModel()
module.exports = subjectModel