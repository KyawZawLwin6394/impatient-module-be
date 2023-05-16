const path = require('path'),
  rootPath = path.normalize(__dirname + '/..'),
  env = process.env.NODE_ENV || 'production';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'Impatient-Module-BE',
    },
    db: 'mongodb+srv://dbuser:P7qBNveg8bVO1d2z@cluster0.85ozwwv.mongodb.net/impatient-module?retryWrites=true&w=majority',
    uploadsURI:['./uploads/cherry-k/img','./uploads/cherry-k/history','./uploads/cherry-k/phistory'],
    dbName:'impatient-module',
    maxLoginAttempts: 5,
    lockTime: 30 * 60 * 1000,
    jwtSecret:'McQTEUrP=ut*Cr1e4trEDO$q796tEDHz+Sf9@0#YpKFMDZmHR@th5y=7VJtcXk3WU',
    jwtKey:'m*qf63GOeu9*9oDetCb63Y',
    defaultPasswordExpire:86400,
  },

  production: {
    root: rootPath,
    app: {
      name: 'Impatient-Module-BE  ',
    },
    db: 'mongodb+srv://dbuser:P7qBNveg8bVO1d2z@cluster0.85ozwwv.mongodb.net/impatient-module?retryWrites=true&w=majority',
    uploadsURI:['./uploads/cherry-k/img','./uploads/cherry-k/history','./uploads/cherry-k/phistory'],
    dbName:'impatient-module',
    maxLoginAttempts: 5,
    lockTime: 30 * 60 * 1000,
    jwtSecret:'McQTEUrP=ut*Cr1e4trEDO$q796tEDHz+Sf9@0#YpKFMDZmHR@th5y=7VJtcXk3WU',
    jwtKey:'m*qf63GOeu9*9oDetCb63Y',
    defaultPasswordExpire:86400,
  },
};

module.exports = config[env];
