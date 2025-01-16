import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    deleteAt: {
      type: Date,
      default: null,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    price: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    }
},{
    timestamps: true,
    versionKey: false
})

const Course = mongoose.model("Course", courseSchema)

export default Course