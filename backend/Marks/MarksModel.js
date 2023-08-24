const { default: mongoose } = require("mongoose");

class MarksModel {
    constructor() {
        this.schema = new mongoose.Schema({
            student: { type: mongoose.Types.ObjectId, required: true, ref: 'table_students' },
            subject: { type: mongoose.Types.ObjectId, required: true, ref: 'tbale_subjects' },
            marks: { type: Number, required: true },
            // percentage: {type: Number, },
            totalmarks: { type: Number, default: 100 }
        })
        this.schema.index({subject:1, student:1}, {unique:true});

        this.marks = mongoose.model("tbl_marks", this.schema)
    }
    async InsertMarks(data) {

        const existingMarks = await this.marks.findOne({
            student: data.student,
            subject: data.subject
        });

        if (existingMarks) {
            throw new Error("Marks for this subject and student combination already exist.");
        }

        return this.marks.create(data)
    }

    GetResult(id) {
        const pipeline = [
            {
                $match: {
                    student: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: "tbl_subjects",
                    localField: "subject",
                    foreignField: "_id",
                    as: "subject"
                }
            },
            {
                $unwind: "$subject"
            },
            {
                $group: {
                    _id: "$student",
                    totalmarks: {
                        $sum: "$totalmarks"
                    },
                    achivedmarks: {
                        $sum: "$marks"
                    },
                    percentage: {
                        $avg: "$marks"
                    },
                    subject: {
                        $push: {
                            $mergeObjects: [{ name: "$subject.subject" }, { marks: "$marks" }]
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: "tbl_students",
                    localField: "_id",
                    foreignField: "_id",
                    as: "student"
                }
            },
            {
                $unwind:"$student"
            },
            {
                $project:{
                    _id:false
                }
            }
        ]
        return this.marks.aggregate(pipeline)
    }
}

const marksModel = new MarksModel()
module.exports = marksModel