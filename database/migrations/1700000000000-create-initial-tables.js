// Migration: Creates initial domain and keyword tables
// This migration creates the base schema that all subsequent migrations depend on

module.exports = {
  up: async function up(params = {}, legacySequelize) {
    const queryInterface = params?.context ?? params;
    const SequelizeLib = params?.Sequelize
      ?? legacySequelize
      ?? queryInterface?.sequelize?.constructor
      ?? require('sequelize');

    return queryInterface.sequelize.transaction(async (t) => {
      try {
        // Create domain table
        await queryInterface.createTable('domain', {
          ID: {
            type: SequelizeLib.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          domain: {
            type: SequelizeLib.DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
            unique: true,
          },
          slug: {
            type: SequelizeLib.DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
            unique: true,
          },
          lastUpdated: {
            type: SequelizeLib.DataTypes.STRING,
            allowNull: true,
          },
          added: {
            type: SequelizeLib.DataTypes.STRING,
            allowNull: true,
          },
          tags: {
            type: SequelizeLib.DataTypes.STRING,
            allowNull: true,
            defaultValue: JSON.stringify([]),
          },
          scrape_enabled: {
            type: SequelizeLib.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
          },
          notification: {
            type: SequelizeLib.DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true,
          },
          notification_interval: {
            type: SequelizeLib.DataTypes.STRING,
            allowNull: true,
            defaultValue: 'daily',
          },
          notification_emails: {
            type: SequelizeLib.DataTypes.STRING,
            allowNull: true,
            defaultValue: '',
          },
          search_console: {
            type: SequelizeLib.DataTypes.STRING,
            allowNull: true,
          },
        }, { transaction: t });

        // Create keyword table
        await queryInterface.createTable('keyword', {
          ID: {
            type: SequelizeLib.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          keyword: {
            type: SequelizeLib.DataTypes.STRING,
            allowNull: false,
          },
          device: {
            type: SequelizeLib.DataTypes.STRING,
            allowNull: true,
            defaultValue: 'desktop',
          },
          country: {
            type: SequelizeLib.DataTypes.STRING,
            allowNull: true,
            defaultValue: 'US',
          },
          location: {
            type: SequelizeLib.DataTypes.STRING,
            allowNull: true,
            defaultValue: '',
          },
          domain: {
            type: SequelizeLib.DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
          },
          lastUpdated: {
            type: SequelizeLib.DataTypes.STRING,
            allowNull: true,
          },
          added: {
            type: SequelizeLib.DataTypes.STRING,
            allowNull: true,
          },
          position: {
            type: SequelizeLib.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
          },
          history: {
            type: SequelizeLib.DataTypes.STRING,
            allowNull: true,
            defaultValue: JSON.stringify({}),
          },
          volume: {
            type: SequelizeLib.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
          },
          url: {
            type: SequelizeLib.DataTypes.STRING,
            allowNull: true,
            defaultValue: JSON.stringify([]),
          },
          tags: {
            type: SequelizeLib.DataTypes.STRING,
            allowNull: true,
            defaultValue: JSON.stringify([]),
          },
          lastResult: {
            type: SequelizeLib.DataTypes.STRING,
            allowNull: true,
            defaultValue: JSON.stringify([]),
          },
          sticky: {
            type: SequelizeLib.DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true,
          },
          updating: {
            type: SequelizeLib.DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
          },
          lastUpdateError: {
            type: SequelizeLib.DataTypes.STRING,
            allowNull: true,
            defaultValue: 'false',
          },
          map_pack_top3: {
            type: SequelizeLib.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
        }, { transaction: t });

        console.log('Successfully created initial domain and keyword tables');
      } catch (error) {
        console.log('Error creating initial tables:', error);
        throw error;
      }
    });
  },

  down: async function down(params = {}) {
    const queryInterface = params?.context ?? params;

    return queryInterface.sequelize.transaction(async (t) => {
      try {
        // Drop tables in reverse order to handle any potential foreign key constraints
        await queryInterface.dropTable('keyword', { transaction: t });
        await queryInterface.dropTable('domain', { transaction: t });

        console.log('Successfully dropped initial tables');
      } catch (error) {
        console.log('Error dropping initial tables:', error);
        throw error;
      }
    });
  },
};