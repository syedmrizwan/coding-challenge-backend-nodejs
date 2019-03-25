'use strict';
module.exports = (sequelize, DataTypes) => {
  var PoliceOfficer = sequelize.define('PoliceOfficer', {
    name: { type: DataTypes.STRING, allowNull: false },
    isAvailable: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'PoliceDepartments',
        key: 'id'
      }
    }
  }, {});

  PoliceOfficer.getAvailablePoliceOfficer = function () {
    let res = PoliceOfficer.findAll({
      limit: 1,
      order: [['updatedAt', 'ASC']],
      where: {
        isAvailable: true
      },
      attributes: ['id'],
    });
    return res;
  };


  PoliceOfficer.changeAvailability = function (officerId, availability) {
    let res = PoliceOfficer.update({ isAvailable: availability },
      { where: { id: officerId } });
    return res;
  }
  return PoliceOfficer;
};





