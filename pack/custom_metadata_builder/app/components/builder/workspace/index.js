module.exports = function(ngModule){
    require("!style!css!less!./workspace.less");
    require('./workspace')(ngModule);
};
