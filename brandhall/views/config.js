(function(window){
    'use strict';
    if(window.GRN_LHH && window[window.GRN_LHH]){return;}
    (function(factory){
        'use strict';
        factory("../..","/backend/common/config/config.js");
    })(function(ROOT,url){
        'use strict';
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
})(this);

