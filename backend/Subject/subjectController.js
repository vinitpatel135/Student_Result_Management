const subjectModel = require("./subjectModel")

class SubjectController {
    async AddSubject (req, res){
        try {
            const { subject } = req.body
    
            if(!subject) return res.status(400).send({message:"Missing Dependency Suject"}) 
    
            const result = await subjectModel.InsertSubject(req.body)
    
            if(!result) return res.status(400).send({message:"Somthing Went Wrong"})
    
            return res.status(200).send({message:"Success"})
            
        } catch (error) {
            if (error && error.message.match('E11000')) {
                return res.status(400).send({ message: "This Subject Alredy Exists" })
            }
            return res.status(500).send({message:"Internal Server Error"})
        }
    }

    async GetSubject(req, res){
        try {
            const result = await subjectModel.GetSubject()
            if(!result) return res.status(400).send({message:"Somthing Went Wrong"})

            return res.status(200).send({message:"Success" , subject:result})

        } catch (error) {
            return res.status(500).send({message:"Internal Server Error"})
        }
    }
}
const subjectController = new SubjectController()
module.exports = subjectController