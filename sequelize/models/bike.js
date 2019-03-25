'use strict';
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


    Bike.updateBikeAssignedOfficer = function (bikeId, availablePoliceOfficer) {
        let res = Bike.update(
            {
                assignedOfficerId: availablePoliceOfficer
            },
            {
                where:
                    { id: bikeId }
            }
        );
        return res;
    }

    return Bike;
};





