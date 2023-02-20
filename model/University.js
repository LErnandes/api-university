const mongoose = require("mongoose");

const UniversitySchema = mongoose.Schema({
  domains: {
    type: [String],
    required: true
  },
  country: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  stateProvince: {
    type: String,
    required: false
  },
  webPages: {
    type: [String],
    required: true
  },
  alpha_two_code: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  modifiedAt: {
    type: Date,
    default: Date.now()
  }
});

// export model university with UniversitySchema
module.exports = mongoose.model("universities", UniversitySchema);
