'use strict';
module.exports = (sequelize, DataTypes) => {
  var PoliceDepartment = sequelize.define('PoliceDepartment', {
    name: {type:DataTypes.STRING, allowNull:false}
  }, {});
 

  return PoliceDepartment;
};