const sql = require('mssql');
const config = {user: 'laboratorios',
password: 'KmZpo.2796',
server: '163.178.107.10',
database: 'B77848_B76097_ING_2021',
options: {
trustedconection: false,
enableArithAbort: true,
encrypt: false,
}
};
exports.config = config;
exports.sql = sql;
