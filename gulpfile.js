/* globals process */

const gulp = require('gulp');
const nodemon = require('nodemon');

// eslint-disable-next-line no-process-env
// const port = process.env.PORT || 3003;

gulp.task('server', () => {
    const app = require('./server');
    const config = require('./server/config');
    app.listen(config.port, () => {
        console.log(`Server running at http://localhost:${config.port}`);
    });
});

// gulp.task('dev', ['server'], () => {
//     return nodemon({
//         ext: 'js',
//         tasks: ['server'],
//         script: 'server.js',
//     });
// });
