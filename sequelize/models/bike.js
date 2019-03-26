'use strict';
var models = require('./index');
module.exports = (sequelize, DataTypes) => {
    var Bike = sequelize.define('Bike', {
        licenseNumber: { type: DataTypes.STRING, allowNull: false },
        color: { type: DataTypes.STRING, allowNull: true },
        type: { type: DataTypes.STRING, allowNull: true },
        ownerFullName: { type: DataTypes.STRING, allowNull: false },
        theftDescription: { type: DataTypes.STRING, allowNull: true },
        theftDate: { type: DataTypes.DATE, allowNull: true, defaultValue: sequelize.fn('now') },
        isResolved: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
        assignedOfficerId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'PoliceOfficers',
                key: 'id'
            }
        }
    }, {});

    /**
     * Fetch oldest and not assigned Stolen Bike Incident
     */
    Bike.getStolenBikeCase = function () {
        let res = Bike.findAll({
            limit: 1,
            order: [['createdAt', 'ASC']],
            where: {
                isResolved: false,
                assignedOfficerId: null
            },
            attributes: ['id'],
        });
        return res;
    };

    /**
     * update Bike Assigned Officer
     * @param {Integer} bikeId 
     * @param {Integer} availablePoliceOfficer 
     */
    Bike.updateBikeAssignedOfficer = function (bikeId, availablePoliceOfficer) {
        let res = Bike.update({ assignedOfficerId: availablePoliceOfficer },
            { where: { id: bikeId } });
        return res;
    }

    /**
     * Mark Bike Incident Resolved
     * @param {Integer} bikeId 
     */
    Bike.markBikeCaseResolved = function (bikeId) {
        let res = Bike.update({ isResolved: true },
            { where: { id: bikeId } });
        return res;
    }

    /**
     * Fetch Stolem Bike Incident and Police Department assigned to it
     * @param {String} whereCondition 
     */
    Bike.getBikeDetailAndDepartment = function (whereCondition) {
        return Bike.findAll({
            include:
            {
                model: models.PoliceOfficer,
                attributes: ['id', 'name'],
                all: true,
                include: [
                    {
                        model: models.PoliceDepartment,
                        attributes: ['id', 'name'],
                        all: true
                    }
                ]
            },
            attributes: { exclude: ['createdAt', 'updatedAt', 'assignedOfficerId'] },
            where: whereCondition
        });
    };

    return Bike;
};





