const marksModel = require("./MarksModel")

class MarksController{
    async AddMarks(req, res) {
        try {
            const {student , subject, marks} = req.body 
            if(!student) return res.status(400).send({message:"Missing Dependancy student"})
            if(!subject) return res.status(400).send({message:"Missing Dependancy subject"})
            if(!marks) return res.status(400).send({message:"Missing Dependancy marks"})

            const result= await marksModel.InsertMarks(req.body)

            if(!result) return res.status(400).send({message:"Somthing Went Wrong"})
            
            return res.status(200).send({message:"Success"})
            
        } catch (error) {
            if(error && (error.message.match("E11000"))){
                return res.status(500).send({message:"This Subject marks already asign"})
            }
            return res.status(500).send({message:"Internal Server Error"})
        }
    }

    async ShowResult (req , res) {
        try {
            const { id } = req.params
            if(!id) return res.status(400).send({message:"Missing Dependancy Id"})

            const result = await marksModel.GetResult(id)
            
            if(result) return res.status(200).send({message:"Success", result:result})

            return res.status(400).send({message:"Somthing Went Wrong"})
            
        } catch (error) { 
            console.log(error);  
            return res.status(500).send({message:"Internal Server Error"})
        }
    }

}
const marksController = new MarksController()
module.exports = marksController