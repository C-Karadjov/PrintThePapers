/* globals process */

const connectionString = 'mongodb://localhost/FishingLovers';

module.exports = {
    // eslint-disable-next-line no-process-env
    port: process.env.PORT || 3003,
    connectionString: connectionString,
};
