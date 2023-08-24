const studentModel = require("./studentModel")

class StudentController {

    async AddStudent(req, res){
        try {
            const { name , std} = req.body
            if(!name) return res.status(400).send({message:"Messing Dependency Name"})
            if(!std) return res.status(400).send({message:"Messing Dependency std"})
    
            const result = await studentModel.InsertStudent(req.body)
            if(result) return res.status(200).send({message:"Success"})
            
            return res.status(400).send({message:"Somthing Went Wrong"})
            
        } catch (error) {
            return res.status(500).send({message:"Internal Server Error"})
        }
    }

    async GetStudent(req, res){
        try {
            const result = await studentModel.GetStudent()
            
            if(result) return res.status(200).send({message:"Success", student:result})

            return res.status(400).send({message:"Somthing Went Wrong"})

        } catch (error) {
            return res.status(500).send({message:"Internal Server Error"})
        }
    }

}

const studentController = new StudentController()
module.exports = studentController