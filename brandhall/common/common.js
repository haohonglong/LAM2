//加载基础类

LAMJS.run(function() {
    'use strict';
    var System=this;
    System.Loader
        .load({
            'baseUrl':System.COMMON,
            'suffix':'.css',
            'rel':'stylesheet',
            'css':[
                '/css/lib/bootstrap'
            ]
        })
        .load({
            'baseUrl':System.CSS,
            'suffix':'.css',
            'rel':'stylesheet',
            'css':[
                '/global'
            ]
        })
        .load({
            'baseUrl':System.CSS,
            'suffix':'.css',
            'rel':'stylesheet',
            'css':[
                '/lib'
            ]
        })

        .print();
    System.import([
    ],System.classPath);
});