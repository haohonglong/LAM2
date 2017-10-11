//加载基础类

LAMJS.run(function() {
    'use strict';
    var System=this;
    System.Loader
        .load({
            'baseUrl':false,
            'suffix':'.css',
            'rel':'stylesheet',
            'css':[
                System.ROOT+'/css/lib'
            ]
        })
        .print();

});