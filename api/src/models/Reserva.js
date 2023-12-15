const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('Reserva', {
    ClientId:{
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    TurnoId:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
  },
);

};
