'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Event extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Event.init(
		{
			title: DataTypes.STRING,
			start: DataTypes.STRING,
			end: DataTypes.STRING,
			constraint: DataTypes.STRING,
			admin_id: DataTypes.INTEGER,
			first_name: DataTypes.STRING,
			last_name: DataTypes.STRING,
			email: DataTypes.STRING,
			if1: DataTypes.STRING,
			if2: DataTypes.STRING,
			Ift: DataTypes.TEXT,
			invite_id: DataTypes.INTEGER,
			invite_code: DataTypes.INTEGER,
			testdateind: DataTypes.STRING,
			testdate: DataTypes.STRING,
			testtime: DataTypes.STRING,
			is_booked: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Event',
		}
	);
	return Event;
};
