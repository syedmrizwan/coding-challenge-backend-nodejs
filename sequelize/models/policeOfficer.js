'use strict';
module.exports = (sequelize, DataTypes) => {
  var PoliceOfficer = sequelize.define('PoliceOfficer', {
    name: { type: DataTypes.STRING, allowNull: false },
    isAvailable: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'PoliceDepartments',
        key: 'id'
      }
    }
  }, {});
  return PoliceOfficer;
};





