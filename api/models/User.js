const mongoose = require('mongoose');
const bcrypt=require('bcryptjs');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String
    },
    phone: {
        type: String,
        required: true
    },
    admin:{
        type:Boolean,
        default:false
    },
    favorites: {
        type: Array,
        default: null
    }
},{versionKey:false});

UserSchema.pre("save", function (next) {
    const user = this;
  
    if (this.isModified("password") || this.isNew) {
      bcrypt.genSalt(10, function (saltError, salt) {
        if (saltError) {
          return next(saltError);
        } else {
          bcrypt.hash(user.password, salt, function(hashError, hash) {
            if (hashError) {
              return next(hashError);
            }
  
            user.password = hash
            next();
          });
        }
      });
    } else {
      return next();
    }
  });

const User = mongoose.model('User', UserSchema);
module.exports = User;