const connectionString = 'mongodb://localhost/PrintThePapers' ||
    'mongodb://172.31.46.210:27017/PrintThePapers';

module.exports = {
    // eslint-disable-next-line no-process-env
    port: 80 || 3003,
    connectionString: connectionString,
};
