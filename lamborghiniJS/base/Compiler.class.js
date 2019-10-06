(function(IT,factory){
    'use strict';
    var System = IT['LAM_20150910123700_'];

    if(!System){
        return;
    }else{
        typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(System) :
            typeof define === 'function' && define.amd ? define(factory(System)) :
                (System['Compiler'] = factory(System));
    }

})(this,function(System){
    'use strict';
    System.is(System,'Component','Compiler',System.classPath+'/base');

    var __this__=null;
    var Compiler = System.Component.extend({
        constructor: function (Config) {
            this.base();
            __this__=this;
            this.Config = Config || System.Config;
            //模板分隔符
            this.delimiters  = this.Config.templat.delimiters;
        },
        '_className':'Compiler',
        '__constructor':function(){},
        /**
         *
         * @author: lhh
         * 产品介绍：
         * 创建日期：2016-03-9
         * 修改日期：2019-03-17
         * 名称：compile
         * 功能：编译模版标签
         * 说明：
         * 注意：
         * @param (String)S 			NO NULL:要查找的字符串
         * @param (Object)D 			NO NULL:对象模板中的数据
         * @param (Array)delimiters     NULL:模板分隔符
         * @returns {String}
         */
        'compile':function(S,D,delimiters){
            var self=this;
            var arr=[],v=[],$1,$2;
            delimiters = delimiters || this.delimiters;
            var delimiterLeft  = delimiters[0];
            var delimiterRight = delimiters[1];
            //没找到模版分隔符就返回传入的字符串
            if(S.indexOf(delimiterLeft) !== -1){
                S.split(delimiterLeft).each(function(){
                    if(-1 === this.indexOf(delimiterRight)){
                        arr.push(this);
                    }else{//如果每个里有模版标签
                        v=this.split(delimiterRight);
                        $1=v[0].trim();
                        $2=v[1].trim();
                        $1 = self.analysis($1,D);
                        $2 = self.compile($2,D);
                        $1 = System.isPlainObject($1) || System.isArray($1) ? System.Json.stringify($1) : $1;
                        $2 = System.isPlainObject($2) || System.isArray($2) ? System.Json.stringify($2) : $2;
                        arr.push([$1,$2].join('').trim());
                    }
                });
            }else{
                return S ||'';
            }
            return arr.join('');
        },
        'replace':function(){},
        'analysis':function(vars,D,
                            k,
                            v,
                            root){
            if(-1 !== vars.indexOf('.')){
                v=vars.split('.');
                if((k=v[0]) in D ){
                    root=D[k];
                    v.each(function(i){
                        if(i!=0){
                            root=root[this];
                        }
                    });
                    return root;
                }
                if(v = System.eval(vars)){return v;}
            }else{
                if((k=vars) in D){
                    return D[k];
                }
            }
            if(System.LAM_ENV_DEV){//只有测试时才报警错误提示
                throw new Error(['Warning: 数据里没有分配',vars,'这个值'].join(' '));
            }
        },

        /**
         *
         * @author lhh
         * 产品介绍：析构方法
         * 创建日期：2015-4-2
         * 修改日期：2015-4-2
         * 名称：destructor
         * 功能：在注销Compiler对象时调用此方法
         * 说明：
         * 注意：
         * @return  ()						:
         * Example：
         */
        'destructor':function(){}
    });

    /**
     * 产品介绍：
     * 创建日期：2016-10-22
     * 修改日期：2018-11-10
     * 名称：Compiler.compiler
     * 功能：模版变量解析器
     * @param {String}template
     * @param {JSON}data
     * @param {Array}delimiters
     * @returns {String}
     */
    Compiler.compiler=function (template, data,delimiters) {
        delimiters = delimiters || System.Config.templat.delimiters;
        var L = delimiters[0],R = delimiters[1],t, key, reg;
        for(key in data){
            reg = new RegExp(L+'\\s*' + key + '\\s*'+R, 'g');
            t = (t || template).replace(reg, data[key]).trim();
        }
        return t || template;
    };

    var cache={};

    /**
     *jQuery模版解析引擎
     * @param S{String} NOT NULL 内容
     * @param D{Object} NOT NULL 分配的数据
     * @returns {*}
     */
    Compiler.jQCompile=function(S,D) {
        var fn = !/\W/.test(S) ?
            cache[S] = cache[S] ||
                Compiler.jQCompile(document.getElementById(S).innerHTML) :

            new Function("obj",
                "var p=[],print=function(){p.push.apply(p,arguments);};" +
                "with(obj){p.push('" +
                S
                    .replace(/[\r\t\n]/g, " ")
                    .split("<%").join("\t")
                    .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                    .replace(/\t=(.*?)%>/g, "',$1,'")
                    .split("\t").join("');")
                    .split("%>").join("p.push('")
                    .split("\r").join("\\'")
                + "');}return p.join('');");
        return D ? fn( D ) : fn;
    };
    var compiler = null;
    Compiler.getInstance=function () {
        if(!compiler){
            compiler = new Compiler();
        }
        return compiler;
    };

    System.merge(null,[{
        'compiler':Compiler.compiler
    }]);

    return Compiler;
});




