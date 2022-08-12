const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "recipe",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      summary: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      healthScore: {
        type: DataTypes.STRING,
      },
      healthyLevel: {
        type: DataTypes.INTEGER,
      },
      steps: {
        type: DataTypes.STRING, //ARRAY(DataTypes.CHAR),
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
