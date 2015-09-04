module.exports = function (ngModule) {
    require('!style!css!less!./newRequest.less');
    require('./newRequest')(ngModule);
};