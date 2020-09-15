const mongoose = require('mongoose');

// Define Schemes
const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  pw: { type: String, required: true },
  email: { type: String, default: false }
});
console.log('Schema defind...');

var User = mongoose.model('User', userSchema, 'users');

console.log('Model defined... ');

// User.find({ }, function(err, users) {
//     if(err) throw err;
//     console.log(users);
//   });


/*
// Create new todo document
userSchema.statics.create = function (payload) {
    // this === Model
    const user = new User(payload);
    console.log('\n\n' + payload + '\n\n');

    
    // return Promise
    return user.save(function (err, user) {
        if (err) return console.error(err);
        console.log(user.id + " saved to users collection.");
      });
  };
  
  // Find All
  userSchema.statics.findAll = function () {
    // return promise
    // V4부터 exec() 필요없음
    return User.find({});
  };
  
  // Find One by user id
  userSchema.statics.findOneByid = function (id) {
    return User.findOne({ id });
  };
  
  // Update by user id
  userSchema.statics.updateByid = function (id, payload) {
    // { new: true }: return the modified document rather than the original. defaults to false
    return User.findOneAndUpdate({ id }, payload, { new: true });
  };
  
  // Delete by user id
  userSchema.statics.deleteByid = function (id) {
    return User.remove({ id });
  };

*/

// Create Model & Export
module.exports = mongoose.model('User', userSchema);