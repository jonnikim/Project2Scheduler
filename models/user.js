'use strict';

const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
     var User = sequelize.define('User', {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // In this case, before a User is created, we will automatically hash their password
    hooks: {
      beforeCreate: function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
      }
    }
  });
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  }   
  return User;
}