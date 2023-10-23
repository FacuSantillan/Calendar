const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('Turnos', {
    id:{
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    fecha: {
      type: DataTypes.STRING,
      allowNull: false
    },

    hora: {
      type: DataTypes.STRING,
      allowNull: false
    },
    servicio: {
      type: DataTypes.TEXT,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('servicio');
        return rawValue ? JSON.parse(rawValue) : null;
      },
      set(value) {
        this.setDataValue('servicio', JSON.stringify(value));
      }
    }

  },
  {timestamps:false}
  );

};
