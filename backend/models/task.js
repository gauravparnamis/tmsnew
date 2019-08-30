const mongo = require('mongoose');
const Schema = mongo.Schema;

const task = mongo.Schema({
    tid: { type: Number, require: true},
    taskname: { type :String, require: true},
    desc: { type : String, require: true },
    sdata: { type: String},
    ldata: { type: String},
    assignemp: [{type: Schema.Types.ObjectId, ref: 'register'}]
})

module.exports = mongo.model('task',task);

