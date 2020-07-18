'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class EventTimes extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	EventTimes.init(
		{
			hrtime: DataTypes.STRING,
			btnclass: DataTypes.STRING,
			timeindex: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'EventTimes',
		}
	);
	return EventTimes;
};
