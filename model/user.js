const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = Promise;

var bcrypt = require('bcryptjs');


// Define our user schema
const UserSchema = new Schema({
    firstName: {
        type: String,
        required:true
      },
      lastName: {
        type: String,
        required:true
      },
    email: {
        type: String,
        required:true
      },
    password: {
        type: String,
        required:true
    },
});
UserSchema.pre('save', async function preSave(cb) {
  try {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    cb();
  } catch (error) {
    cb(error);
  }
});

UserSchema.methods.encryptPassword = function encryptPassword(password) {
  return bcrypt.hashSync(password, 10);
};

UserSchema.methods.verifyPassword = function verifyPassword(password) {
  return bcrypt.compare(password, this.password);
};
module.exports = User = mongoose.model('users',UserSchema);
