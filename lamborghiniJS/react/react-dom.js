/**
 * ReactDOM v15.6.1
 */

;
(function (f) {
    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = f(require('react'));

        // RequireJS
    } else if (typeof define === "function" && define.amd) {
        define(['react'], f);

        // <script>
    } else {
        var g;
        if (typeof window !== "undefined") {
            g = window;
        } else if (typeof global !== "undefined") {
            g = global;
        } else if (typeof self !== "undefined") {
            g = self;
        } else {
            // works providing we're not in "use strict";
            // needed for Java 8 Nashorn
            // see https://github.com/facebook/react/issues/3037
            g = this;
        }
        g.ReactDOM = f(g.React);
    }
})(function (React) {
    return (function (f) {
        return f()
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
            48: [function (_dereq_, module, exports) {
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

                var React = _dereq_(135);
                var ReactDOM = _dereq_(31);

                var ReactDOMUMDEntry = ReactDOM;

                if ("development" !== 'production') {
                    ReactDOMUMDEntry.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = {
                        // ReactPerf and ReactTestUtils currently only work with the DOM renderer
                        // so we expose them from here, but only in DEV mode.
                        ReactPerf: _dereq_(71),
                        ReactTestUtils: _dereq_(80)
                    };
                }

// Inject ReactDOM into React for the addons UMD build that depends on ReactDOM (TransitionGroup).
// We can remove this after we deprecate and remove the addons UMD build.
                if (React.addons) {
                    React.__SECRET_INJECTED_REACT_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactDOMUMDEntry;
                }

                module.exports = ReactDOMUMDEntry;
            }, {"135": 135, "31": 31, "71": 71, "80": 80}]
        }, {}, [48])(48)
    });
});
