var mongoose = require('mongoose');
var bcrypt   = require('bcrypt');

// NOTE We are not using this model in the finished state of the module
// See posts in future blog post with a different approach that I decided on

var userSchema = mongoose.Schema({

      local  : {
           email: {
            type: String,
            unique: true,
            required: true,
            trim: true
          },
          username: {
            type: String,
            unique: true,
            required: true,
            trim: true
          },
          password: {
            type: String,
            required: true,
          },
          passwordConf: {
            type: String,
            required: true,
          }
    }

});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);