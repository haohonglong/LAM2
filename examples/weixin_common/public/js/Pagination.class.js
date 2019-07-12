/**
 * Created by haohonglong on 18/1/8.
 */

window[GRN_LHH].run([window],function(window,undefined){
    'use strict';
    var System=this;
    System.is(System,'Html','Pagination');
    var __this__=null;
    var Pagination = System.Html.extend({
        constructor: function (D) {
            this.base();
            var defaults ={
                "row_num":0
            };
            D = System.isPlainObject(D) ? System.merge(D,[defaults]) : defaults;
            this.DATA =[];
            this.TOTAL_NUM = 0;
            this.row_num= 10;
            this.pagination_num= 0;
            this.current_num=1;

        },
        '_className':'Pagination',
        /**
         *
         * @author lhh
         * 产品介绍：析构方法
         * 创建日期：2015-4-2
         * 修改日期：2015-4-2
         * 名称：destructor
         * 功能：在注销Pagination对象时调用此方法
         * 说明：
         * 注意：
         * @return  ()						:
         * Example：
         */
        'destructor':function(){}
    });
    System['Pagination']=Pagination;

});




