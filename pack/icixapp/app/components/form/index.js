module.exports = function(ngModule){
    require("!style!css!less!./previewForm.less");
    require('./previewForm')(ngModule);
};