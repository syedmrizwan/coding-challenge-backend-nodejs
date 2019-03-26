'use strict';

module.exports = (sequelize, DataTypes) => {

  const PoliceDepartment = sequelize.define('PoliceDepartment', {
    name: { type: DataTypes.STRING, allowNull: false }
  }, {});


  return PoliceDepartment;
};