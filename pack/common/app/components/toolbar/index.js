module.exports = function (ngModule) {
    require('!style!css!less!./toolbar.less');
    require('./toolbar')(ngModule);
};
