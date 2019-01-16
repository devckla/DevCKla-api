const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the Profile schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  programmingLang: {
    type: [String],
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  affiliatedCommunities: {
    type: [String],
    default: ["None"]
  },
  gender: {
    type: String,
    required: true
  },
  githubUsername: {
    type: String,
    default: "None"
  },
  website: {
    type: String
  },
  social: {
    facebook: { type: String },
    twitter: { type: String },
    linkedin: { type: String },
    stackoverflow: { type: String }
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
