/**
 * 创建人：lhh
 * 创建日期:2018-2-1
 * 修改日期:2018-2-1
 * 名称：Base64
 * 功能：
 * 说明 :
 * note :
 */

window[GRN_LHH].run(function(){
    'use strict';
    var System = this;
    System.is(System,'Component','Base64',System.classPath+'/base');
    var __this__=null;

    var _table= [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
        'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
        'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
        'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'
    ];

    var Base64 = System.Component.extend({
        constructor: function (){
            this.base();
            __this__=this;

        },
        '_className':'Base64',
        '__constructor':function(){},

        /**
         *
         * @author lhh
         * 产品介绍：析构方法
         * 创建日期：2015-4-2
         * 修改日期：2015-4-2
         * 名称：destructor
         * 功能：在注销Base64对象时调用此方法
         * 说明：
         * 注意：
         * @return  ()						:
         * Example：
         */
        'destructor':function(){}
    });
    /**
     *
     * @param bin
     * @returns {string}
     */
    Base64.encode= function (bin) {
        var codes = [];
        var un = 0;
        un = bin.length % 3;
        if (un == 1)
            bin.push(0, 0);
        else if (un == 2)
            bin.push(0);
        for (var i = 2; i < bin.length; i += 3) {
            var c = bin[i - 2] << 16;
            c |= bin[i - 1] << 8;
            c |= bin[i];
            codes.push(_table[c >> 18 & 0x3f]);
            codes.push(_table[c >> 12 & 0x3f]);
            codes.push(_table[c >> 6 & 0x3f]);
            codes.push(_table[c & 0x3f]);
        }
        if (un >= 1) {
            codes[codes.length - 1] = "=";
            bin.pop();
        }
        if (un == 1) {
            codes[codes.length - 2] = "=";
            bin.pop();
        }
        return codes.join("");
    };
    /**
     *
     * @param base64Str
     * @returns {Array}
     */
    Base64.decode= function (base64Str) {
        var i = 0;
        var bin = [];
        var x = 0, code = 0, eq = 0;
        while (i < base64Str.length) {
            var c = base64Str.charAt(i++);
            var idx = _table.indexOf(c);
            if (idx == -1) {
                switch (c) {
                    case '=': idx = 0; eq++; break;
                    case ' ':
                    case '\n':
                    case "\r":
                    case '\t':
                        continue;
                    default:
                        throw { "message": "\u0062\u0061\u0073\u0065\u0036\u0034\u002E\u0074\u0068\u0065\u002D\u0078\u002E\u0063\u006E\u0020\u0045\u0072\u0072\u006F\u0072\u003A\u65E0\u6548\u7F16\u7801\uFF1A" + c };
                }
            }
            if (eq > 0 && idx != 0)
                throw { "message": "\u0062\u0061\u0073\u0065\u0036\u0034\u002E\u0074\u0068\u0065\u002D\u0078\u002E\u0063\u006E\u0020\u0045\u0072\u0072\u006F\u0072\u003A\u7F16\u7801\u683C\u5F0F\u9519\u8BEF\uFF01" };

            code = code << 6 | idx;
            if (++x != 4)
                continue;
            bin.push(code >> 16);
            bin.push(code >> 8 & 0xff);
            bin.push(code & 0xff);
            code = x = 0;
        }
        if (code != 0)
            throw { "message": "\u0062\u0061\u0073\u0065\u0036\u0034\u002E\u0074\u0068\u0065\u002D\u0078\u002E\u0063\u006E\u0020\u0045\u0072\u0072\u006F\u0072\u003A\u7F16\u7801\u6570\u636E\u957F\u5EA6\u9519\u8BEF" };
        if (eq == 1)
            bin.pop();
        else if (eq == 2) {
            bin.pop();
            bin.pop();
        } else if (eq > 2)
            throw { "message": "\u0062\u0061\u0073\u0065\u0036\u0034\u002E\u0074\u0068\u0065\u002D\u0078\u002E\u0063\u006E\u0020\u0045\u0072\u0072\u006F\u0072\u003A\u7F16\u7801\u683C\u5F0F\u9519\u8BEF\uFF01" };

        return bin;
    };


    System['Base64']=Base64;
});