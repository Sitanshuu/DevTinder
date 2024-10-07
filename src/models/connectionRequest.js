const mongoose = require("mongoose");


const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        lowercase: true,
        required: true,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type.`
        }
    }
},
{
    timestamps: true
});

// Compound Indexes..
// To make mongodb queries more fast..
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

connectionRequestSchema.pre("save", function (next){      // Befor save this function will be called..
    const connectionRequest = this;
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("You cannot send connection request to yourself!");
    }
    next();
});

const ConnectionRequestModel = new mongoose.model("ConnectionRequest", connectionRequestSchema);



module.exports = ConnectionRequestModel;