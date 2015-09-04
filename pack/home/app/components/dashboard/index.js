module.exports = function (ngModule) {
    require('!style!css!less!./dashboard.less');
    require('./dashboard')(ngModule);
};
