'use strict';

const models = require('./index');

module.exports = (sequelize, DataTypes) => {

  const PoliceOfficer = sequelize.define('PoliceOfficer', {
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

  /**
   * Fetch available Police Officer
   */
  PoliceOfficer.getAvailablePoliceOfficer = function () {
    const res = PoliceOfficer.findAll({
      limit: 1,
      order: [['updatedAt', 'ASC']],
      where: {
        isAvailable: true
      },
      attributes: ['id'],
    });
    return res;
  };
  /**
   * Change Police Officer availability
   * @param {Integer} officerId 
   * @param {Boolean} availability 
   */
  PoliceOfficer.changeAvailability = function (officerId, availability) {
    const res = PoliceOfficer.update({ isAvailable: availability },
      { where: { id: officerId } });
    return res;
  }

  /**
   * Fetch Police Officer and corresponding Department
   * @param {Integer} officerId 
   */
  PoliceOfficer.getOfficerAndDepartment = function (officerId) {
    return PoliceOfficer.findAll({
      include:
      {
        model: models.PoliceDepartment,
        attributes: ['name'],
        all: true,
      },
      attributes: { exclude: ['createdAt', 'updatedAt', 'departmentId'] },
      where: { id: officerId }
    });
  };

  return PoliceOfficer;
};





