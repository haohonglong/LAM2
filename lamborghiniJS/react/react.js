/**
 * React v15.6.1
 */
(function (f) {
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = f()
    } else if (typeof define === "function" && define.amd) {
        define([], f)
    } else {
        var g;
        if (typeof window !== "undefined") {
            g = window
        } else if (typeof global !== "undefined") {
            g = global
        } else if (typeof self !== "undefined") {
            g = self
        } else {
            g = this
        }
        g.React = f()
    }
})(function () {
    var define, module, exports;
    return (function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = typeof require == "function" && require;
                    if (!u && a)return a(o, !0);
                    if (i)return i(o, !0);
                    var f = new Error("Cannot find module '" + o + "'");
                    throw f.code = "MODULE_NOT_FOUND", f
                }
                var l = n[o] = {exports: {}};
                t[o][0].call(l.exports, function (e) {
                    var n = t[o][1][e];
                    return s(n ? n : e)
                }, l, l.exports, e, t, n, r)
            }
            return n[o].exports
        }

        var i = typeof require == "function" && require;
        for (var o = 0; o < r.length; o++)s(r[o]);
        return s
    })({
        16: [function (_dereq_, module, exports) {
            /**
             * Copyright 2013-present, Facebook, Inc.
             * All rights reserved.
             *
             * This source code is licensed under the BSD-style license found in the
             * LICENSE file in the root directory of this source tree. An additional grant
             * of patent rights can be found in the PATENTS file in the same directory.
             *
             */

            'use strict';

            var _assign = _dereq_(32);

            var React = _dereq_(3);

// `version` will be added here by the React module.
            var ReactUMDEntry = _assign(React, {
                __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
                    ReactCurrentOwner: _dereq_(7)
                }
            });

            if ("development" !== 'production') {
                _assign(ReactUMDEntry.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
                    // ReactComponentTreeHook should not be included in production.
                    ReactComponentTreeHook: _dereq_(6),
                    getNextDebugID: _dereq_(22)
                });
            }

            module.exports = ReactUMDEntry;
        }, {"22": 22, "3": 3, "32": 32, "6": 6, "7": 7}]
    }, {}, [16])(16)
});