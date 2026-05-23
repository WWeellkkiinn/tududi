require('dotenv').config();
const { getConfig } = require('../config/config');
const config = getConfig();

const dialect = process.env.DB_DIALECT || 'sqlite';

const commonDefine = {
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
};

function buildConfig(envName) {
    if (dialect === 'postgres') {
        return {
            dialect: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '5432', 10),
            database: process.env.DB_NAME || 'tududi',
            username: process.env.DB_USER || 'tududi',
            password: process.env.DB_PASSWORD || '',
            logging: envName === 'development' ? console.log : false,
            define: commonDefine,
            pool: { max: 10, min: 0, idle: 10000 },
        };
    }
    return {
        dialect: 'sqlite',
        storage: config.dbFile,
        logging: envName === 'development' ? console.log : false,
        define: commonDefine,
    };
}

module.exports = {
    development: buildConfig('development'),
    test: buildConfig('test'),
    production: buildConfig('production'),
};
