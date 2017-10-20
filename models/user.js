// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt');

// define the schema for our user model
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
    //,
    // facebook         : {
    //     id           : String,
    //     token        : String,
    //     email        : String,
    //     name         : String
    // },
    // twitter          : {
    //     id           : String,
    //     token        : String,
    //     displayName  : String,
    //     username     : String
    // },
    // google           : {
    //     id           : String,
    //     token        : String,
    //     email        : String,
    //     name         : String
    // }

});

// methods ======================
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


// some considerations examples from MDN tutorial
// var moment = require('moment'); //for date handling


//     {
//     first_name: {type: String, required: true, max: 100},
//     family_name: {type: String, required: true, max: 100},
//     date_of_birth: { type: Date },
//     date_of_death: { type: Date },
//     }
//   );

// // Virtual for author "full" name
// AuthorSchema
// .virtual('name')
// .get(function () {
//   return this.family_name +', '+this.first_name;
// });

// Virtual for this author instance URL
// AuthorSchema
// .virtual('url')
// .get(function () {
//   return '/catalog/author/'+this._id
// });

// AuthorSchema
// .virtual('lifespan')
// .get(function () {
//   var lifetime_string='';
//   if (this.date_of_birth) {
//       lifetime_string=moment(this.date_of_birth).format('MMMM Do, YYYY');
//       }
//   lifetime_string+=' - ';
//   if (this.date_of_death) {
//       lifetime_string+=moment(this.date_of_death).format('MMMM Do, YYYY');
//       }
//   return lifetime_string
// });

// AuthorSchema
// .virtual('date_of_birth_yyyy_mm_dd')
// .get(function () {
//   return moment(this.date_of_birth).format('YYYY-MM-DD');
// });

// AuthorSchema
// .virtual('date_of_death_yyyy_mm_dd')
// .get(function () {
//   return moment(this.date_of_death).format('YYYY-MM-DD');
// });