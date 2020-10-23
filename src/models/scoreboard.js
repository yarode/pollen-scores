const mongoose = require('mongoose')

const ScoreboardSchema = new mongoose.Schema({
  created: { type : Date, unique : true, required : true, dropDups : true},
  scoreboard: [{
    rank: {type:Number},
    name: {type:String},
    cred: {type:Number}
  }],
}, { versionKey: false })

module.exports = mongoose.model('Scoreboard', ScoreboardSchema)
