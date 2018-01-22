(function(window,factory){
    'use strict';
    factory(window,"../..","/examples/weixin_common/common/config/config.js");
})(typeof window !== "undefined" ? window : this,function(window,ROOT,url){
    'use strict';
    if(window.GRN_LHH && window[GRN_LHH] != undefined){return;}
    if(!window._ROOT_){
        window._ROOT_ = ROOT;
    }else{
        ROOT = window._ROOT_;
    }
    var tag = "script",attrs=[];
    attrs.push('type="text/javascript"');
    url=ROOT+url;
    document.write('<',tag,' ',attrs.join(' '),'src=','"',url,'"','>','<','/',tag,'>');
});
