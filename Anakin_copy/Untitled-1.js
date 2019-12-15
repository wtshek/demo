var route = function() {
    "use strict";
    var i, n, o, a, s, e = function(s) {
            s = s || {};
            var l = {},
                c = Array.prototype.slice;
            return Object.defineProperties(s, {
                on: {
                    value: function(e, t) {
                        return "function" == typeof t && (l[e] = l[e] || []).push(t), s
                    },
                    enumerable: !1,
                    writable: !1,
                    configurable: !1
                },
                off: {
                    value: function(e, t) {
                        if ("*" != e || t)
                            if (t)
                                for (var r, n = l[e], i = 0; r = n && n[i]; ++i) r == t && n.splice(i--, 1);
                            else delete l[e];
                        else l = {};
                        return s
                    },
                    enumerable: !1,
                    writable: !1,
                    configurable: !1
                },
                one: {
                    value: function(t, r) {
                        return s.on(t, function e() {
                            s.off(t, e), r.apply(s, arguments)
                        })
                    },
                    enumerable: !1,
                    writable: !1,
                    configurable: !1
                },
                trigger: {
                    value: function(e) {
                        var t, r, n, i = arguments,
                            o = arguments.length - 1,
                            a = new Array(o);
                        for (n = 0; n < o; n++) a[n] = i[n + 1];
                        for (t = c.call(l[e] || [], 0), n = 0; r = t[n]; ++n) r.apply(s, a);
                        return l["*"] && "*" != e && s.trigger.apply(s, ["*", e].concat(a)), s
                    },
                    enumerable: !1,
                    writable: !1,
                    configurable: !1
                }
            }), s
        },
        r = /^.+?\/\/+[^\/]+/,
        t = "EventListener",
        l = "remove" + t,
        c = "add" + t,
        u = "hasAttribute",
        f = "popstate",
        d = "hashchange",
        p = "trigger",
        g = 3,
        h = "undefined" != typeof window && window,
        m = "undefined" != typeof document && document,
        v = h && history,
        y = h && (v.location || h.location),
        b = F.prototype,
        w = m && m.ontouchstart ? "touchstart" : "click",
        x = e(),
        S = !1,
        k = !1,
        P = [],
        C = 0;

    function T(e) {
        return e.split(/[\/?#]/)
    }

    function E(e, t) {
        var r = t.replace(/\?/g, "\\?").replace(/\*/g, "([^/?#]+?)").replace(/\.\./, ".*"),
            n = new RegExp("^" + r + "$"),
            i = e.match(n);
        if (i) return i.slice(1)
    }

    function V(e) {
        var t, r, n;
        t = L, r = 1, i = function() {
            clearTimeout(n), n = setTimeout(t, r)
        }, h[c](f, i), h[c](d, i), m[c](w, O), e && L(!0)
    }

    function F() {
        this.$ = [], e(this), x.on("stop", this.s.bind(this)), x.on("emit", this.e.bind(this))
    }

    function A(e) {
        return e.replace(/^\/|\/$/, "")
    }

    function $(e) {
        return "string" == typeof e
    }

    function z(e) {
        return (e || y.href).replace(r, "")
    }

    function N(e) {
        return "#" === n[0] ? (e || y.href || "").split(n)[1] || "" : (y ? z(e) : e || "").replace(n, "")
    }

    function L(t) {
        var e = 0 === C;
        if (!(g <= C) && (C++, P.push(function() {
                var e = N();
                (t || e !== o) && (x[p]("emit", e), o = e)
            }), e)) {
            for (var r; r = P.shift();) r();
            C = 0
        }
    }

    function O(e) {
        if (!(1 !== e.which || e.metaKey || e.ctrlKey || e.shiftKey || e.defaultPrevented)) {
            for (var t = e.target; t && "A" !== t.nodeName;) t = t.parentNode;
            !t || "A" !== t.nodeName || t[u]("download") || !t[u]("href") || t.target && "_self" !== t.target || -1 === t.href.indexOf(y.href.match(r)[0]) || t.href !== y.href && (t.href.split("#")[0] === y.href.split("#")[0] || "#" !== n[0] && 0 !== z(t.href).indexOf(n) || "#" === n[0] && t.href.split(n)[0] !== y.href.split(n)[0] || !H(N(t.href), t.title || m.title)) || e.preventDefault()
        }
    }

    function H(e, t, r) {
        return v ? (e = n + A(e), t = t || m.title, r ? v.replaceState(null, t, e) : v.pushState(null, t, e), m.title = t, k = !1, L(), k) : x[p]("emit", N(e))
    }
    b.m = function(e, t, r) {
        !$(e) || t && !$(t) ? t ? this.r(e, t) : this.r("@", e) : H(e, t, r || !1)
    }, b.s = function() {
        this.off("*"), this.$ = []
    }, b.e = function(r) {
        this.$.concat("@").some(function(e) {
            var t = ("@" === e ? a : s)(A(r), A(e));
            if (void 0 !== t) return this[p].apply(null, [e].concat(t)), k = !0
        }, this)
    }, b.r = function(e, t) {
        "@" !== e && (e = "/" + A(e), this.$.push(e)), this.on(e, t)
    };
    var R = new F,
        j = R.m.bind(R);
    return j.create = function() {
        var e = new F,
            t = e.m.bind(e);
        return t.stop = e.s.bind(e), t
    }, j.base = function(e) {
        n = e || "#", o = N()
    }, j.exec = function() {
        L(!0)
    }, j.parser = function(e, t) {
        e || t || (a = T, s = E), e && (a = e), t && (s = t)
    }, j.query = function() {
        var n = {};
        return (y.href || o).replace(/[?&](.+?)=([^&]*)/g, function(e, t, r) {
            n[t] = r
        }), n
    }, j.stop = function() {
        S && (h && (h[l](f, i), h[l](d, i), m[l](w, O)), x[p]("stop"), S = !1)
    }, j.start = function(e) {
        S || (h && ("complete" === document.readyState ? V(e) : h[c]("load", function() {
            setTimeout(function() {
                V(e)
            }, 1)
        })), S = !0)
    }, j.base(), j.parser(), j
}();
! function(t) {
    "use strict";

    function s(e) {
        var t = e.length,
            r = u.type(e);
        return "function" !== r && !u.isWindow(e) && (!(1 !== e.nodeType || !t) || "array" === r || 0 === t || "number" == typeof t && 0 < t && t - 1 in e)
    }
    if (!t.jQuery) {
        var u = function(e, t) {
            return new u.fn.init(e, t)
        };
        u.isWindow = function(e) {
            return e && e === e.window
        }, u.type = function(e) {
            return e ? "object" == typeof e || "function" == typeof e ? r[i.call(e)] || "object" : typeof e : e + ""
        }, u.isArray = Array.isArray || function(e) {
            return "array" === u.type(e)
        }, u.isPlainObject = function(e) {
            var t;
            if (!e || "object" !== u.type(e) || e.nodeType || u.isWindow(e)) return !1;
            try {
                if (e.constructor && !n.call(e, "constructor") && !n.call(e.constructor.prototype, "isPrototypeOf")) return !1
            } catch (e) {
                return !1
            }
            for (t in e);
            return void 0 === t || n.call(e, t)
        }, u.each = function(e, t, r) {
            var n = 0,
                i = e.length,
                o = s(e);
            if (r) {
                if (o)
                    for (; n < i && !1 !== t.apply(e[n], r); n++);
                else
                    for (n in e)
                        if (e.hasOwnProperty(n) && !1 === t.apply(e[n], r)) break
            } else if (o)
                for (; n < i && !1 !== t.call(e[n], n, e[n]); n++);
            else
                for (n in e)
                    if (e.hasOwnProperty(n) && !1 === t.call(e[n], n, e[n])) break; return e
        }, u.data = function(e, t, r) {
            if (void 0 === r) {
                var n = e[u.expando],
                    i = n && a[n];
                if (void 0 === t) return i;
                if (i && t in i) return i[t]
            } else if (void 0 !== t) {
                var o = e[u.expando] || (e[u.expando] = ++u.uuid);
                return a[o] = a[o] || {}, a[o][t] = r
            }
        }, u.removeData = function(e, t) {
            var r = e[u.expando],
                n = r && a[r];
            n && (t ? u.each(t, function(e, t) {
                delete n[t]
            }) : delete a[r])
        }, u.extend = function() {
            var e, t, r, n, i, o, a = arguments[0] || {},
                s = 1,
                l = arguments.length,
                c = !1;
            for ("boolean" == typeof a && (c = a, a = arguments[s] || {}, s++), "object" != typeof a && "function" !== u.type(a) && (a = {}), s === l && (a = this, s--); s < l; s++)
                if (i = arguments[s])
                    for (n in i) i.hasOwnProperty(n) && (e = a[n], a !== (r = i[n]) && (c && r && (u.isPlainObject(r) || (t = u.isArray(r))) ? (o = t ? (t = !1, e && u.isArray(e) ? e : []) : e && u.isPlainObject(e) ? e : {}, a[n] = u.extend(c, o, r)) : void 0 !== r && (a[n] = r)));
            return a
        }, u.queue = function(e, t, r) {
            if (e) {
                t = (t || "fx") + "queue";
                var n = u.data(e, t);
                return r ? (!n || u.isArray(r) ? n = u.data(e, t, (a = o || [], (i = r) && (s(Object(i)) ? function(e, t) {
                    for (var r = +t.length, n = 0, i = e.length; n < r;) e[i++] = t[n++];
                    if (r != r)
                        for (; void 0 !== t[n];) e[i++] = t[n++];
                    e.length = i
                }(a, "string" == typeof i ? [i] : i) : [].push.call(a, i)), a)) : n.push(r), n) : n || []
            }
            var i, o, a
        }, u.dequeue = function(e, i) {
            u.each(e.nodeType ? [e] : e, function(e, t) {
                i = i || "fx";
                var r = u.queue(t, i),
                    n = r.shift();
                "inprogress" === n && (n = r.shift()), n && ("fx" === i && r.unshift("inprogress"), n.call(t, function() {
                    u.dequeue(t, i)
                }))
            })
        }, u.fn = u.prototype = {
            init: function(e) {
                if (e.nodeType) return this[0] = e, this;
                throw new Error("Not a DOM node.")
            },
            offset: function() {
                var e = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : {
                    top: 0,
                    left: 0
                };
                return {
                    top: e.top + (t.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0),
                    left: e.left + (t.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0)
                }
            },
            position: function() {
                var e = this[0],
                    t = function(e) {
                        for (var t = e.offsetParent; t && "html" !== t.nodeName.toLowerCase() && t.style && "static" === t.style.position;) t = t.offsetParent;
                        return t || document
                    }(e),
                    r = this.offset(),
                    n = /^(?:body|html)$/i.test(t.nodeName) ? {
                        top: 0,
                        left: 0
                    } : u(t).offset();
                return r.top -= parseFloat(e.style.marginTop) || 0, r.left -= parseFloat(e.style.marginLeft) || 0, t.style && (n.top += parseFloat(t.style.borderTopWidth) || 0, n.left += parseFloat(t.style.borderLeftWidth) || 0), {
                    top: r.top - n.top,
                    left: r.left - n.left
                }
            }
        };
        var a = {};
        u.expando = "velocity" + (new Date).getTime(), u.uuid = 0;
        for (var r = {}, n = r.hasOwnProperty, i = r.toString, e = "Boolean Number String Function Array Date RegExp Object Error".split(" "), o = 0; o < e.length; o++) r["[object " + e[o] + "]"] = e[o].toLowerCase();
        u.fn.init.prototype = u.fn, t.Velocity = {
            Utilities: u
        }
    }
}(window),
function(e) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : e()
}(function() {
    "use strict";
    return function(e, D, B, W) {
        function h(e) {
            return U.isWrapped(e) ? e = [].slice.call(e) : U.isNode(e) && (e = [e]), e
        }

        function I(e) {
            var t = G.data(e, "velocity");
            return null === t ? W : t
        }

        function m(e, t) {
            var r = I(e);
            r && r.delayTimer && !r.delayPaused && (r.delayRemaining = r.delay - t + r.delayBegin, r.delayPaused = !0, clearTimeout(r.delayTimer.setTimeout))
        }

        function v(e, t) {
            var r = I(e);
            r && r.delayTimer && r.delayPaused && (r.delayPaused = !1, r.delayTimer.setTimeout = setTimeout(r.delayTimer.next, r.delayRemaining))
        }

        function n(a, t, s, r) {
            function n(e, t) {
                return 1 - 3 * t + 3 * e
            }

            function i(e, t) {
                return 3 * t - 6 * e
            }

            function o(e) {
                return 3 * e
            }

            function l(e, t, r) {
                return ((n(t, r) * e + i(t, r)) * e + o(t)) * e
            }

            function c(e, t, r) {
                return 3 * n(t, r) * e * e + 2 * i(t, r) * e + o(t)
            }

            function u(e) {
                for (var t = 0, r = 1, n = h - 1; r !== n && y[r] <= e; ++r) t += m;
                var i = t + (e - y[--r]) / (y[r + 1] - y[r]) * m,
                    o = c(i, a, s);
                return .001 <= o ? function(e, t) {
                    for (var r = 0; r < d; ++r) {
                        var n = c(t, a, s);
                        if (0 === n) return t;
                        t -= (l(t, a, s) - e) / n
                    }
                    return t
                }(e, i) : 0 === o ? i : function(e, t, r) {
                    for (var n, i, o = 0; 0 < (n = l(i = t + (r - t) / 2, a, s) - e) ? r = i : t = i, Math.abs(n) > p && ++o < g;);
                    return i
                }(e, t, t + m)
            }

            function f() {
                b = !0, a === t && s === r || function() {
                    for (var e = 0; e < h; ++e) y[e] = l(e * m, a, s)
                }()
            }
            var d = 4,
                p = 1e-7,
                g = 10,
                h = 11,
                m = 1 / (h - 1),
                e = "Float32Array" in D;
            if (4 !== arguments.length) return !1;
            for (var v = 0; v < 4; ++v)
                if ("number" != typeof arguments[v] || isNaN(arguments[v]) || !isFinite(arguments[v])) return !1;
            a = Math.min(a, 1), s = Math.min(s, 1), a = Math.max(a, 0), s = Math.max(s, 0);
            var y = e ? new Float32Array(h) : new Array(h),
                b = !1,
                w = function(e) {
                    return b || f(), a === t && s === r ? e : 0 === e ? 0 : 1 === e ? 1 : l(u(e), t, r)
                };
            w.getControlPoints = function() {
                return [{
                    x: a,
                    y: t
                }, {
                    x: s,
                    y: r
                }]
            };
            var x = "generateBezier(" + [a, t, s, r] + ")";
            return w.toString = function() {
                return x
            }, w
        }

        function _(e, t) {
            var r = e;
            return U.isString(e) ? Y.Easings[e] || (r = !1) : r = U.isArray(e) && 1 === e.length ? function(t) {
                return function(e) {
                    return Math.round(e * t) * (1 / t)
                }
            }.apply(null, e) : U.isArray(e) && 2 === e.length ? a.apply(null, e.concat([t])) : !(!U.isArray(e) || 4 !== e.length) && n.apply(null, e), !1 === r && (r = Y.Easings[Y.defaults.easing] ? Y.defaults.easing : o), r
        }

        function X(e) {
            if (e) {
                var t = Y.timestamp && !0 !== e ? e : V.now(),
                    r = Y.State.calls.length;
                1e4 < r && (Y.State.calls = function(e) {
                    for (var t = -1, r = e ? e.length : 0, n = []; ++t < r;) {
                        var i = e[t];
                        i && n.push(i)
                    }
                    return n
                }(Y.State.calls), r = Y.State.calls.length);
                for (var n = 0; n < r; n++)
                    if (Y.State.calls[n]) {
                        var i = Y.State.calls[n],
                            o = i[0],
                            a = i[2],
                            s = i[3],
                            l = !!s,
                            c = null,
                            u = i[5],
                            f = i[6];
                        if (s || (s = Y.State.calls[n][3] = t - 16), u) {
                            if (!0 !== u.resume) continue;
                            s = i[3] = Math.round(t - f - 16), i[5] = null
                        }
                        f = i[6] = t - s;
                        for (var d = Math.min(f / a.duration, 1), p = 0, g = o.length; p < g; p++) {
                            var h = o[p],
                                m = h.element;
                            if (I(m)) {
                                var v = !1;
                                if (a.display !== W && null !== a.display && "none" !== a.display) {
                                    if ("flex" === a.display) {
                                        G.each(["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"], function(e, t) {
                                            Q.setPropertyValue(m, "display", t)
                                        })
                                    }
                                    Q.setPropertyValue(m, "display", a.display)
                                }
                                for (var y in a.visibility !== W && "hidden" !== a.visibility && Q.setPropertyValue(m, "visibility", a.visibility), h)
                                    if (h.hasOwnProperty(y) && "element" !== y) {
                                        var b, w = h[y],
                                            x = U.isString(w.easing) ? Y.Easings[w.easing] : w.easing;
                                        if (U.isString(w.pattern)) {
                                            var S = 1 === d ? function(e, t, r) {
                                                var n = w.endValue[t];
                                                return r ? Math.round(n) : n
                                            } : function(e, t, r) {
                                                var n = w.startValue[t],
                                                    i = w.endValue[t] - n,
                                                    o = n + i * x(d, a, i);
                                                return r ? Math.round(o) : o
                                            };
                                            b = w.pattern.replace(/{(\d+)(!)?}/g, S)
                                        } else if (1 === d) b = w.endValue;
                                        else {
                                            var k = w.endValue - w.startValue;
                                            b = w.startValue + k * x(d, a, k)
                                        }
                                        if (!l && b === w.currentValue) continue;
                                        if (w.currentValue = b, "tween" === y) c = b;
                                        else {
                                            var P;
                                            if (Q.Hooks.registered[y]) {
                                                P = Q.Hooks.getRoot(y);
                                                var C = I(m).rootPropertyValueCache[P];
                                                C && (w.rootPropertyValue = C)
                                            }
                                            var T = Q.setPropertyValue(m, y, w.currentValue + (E < 9 && 0 === parseFloat(b) ? "" : w.unitType), w.rootPropertyValue, w.scrollData);
                                            Q.Hooks.registered[y] && (Q.Normalizations.registered[P] ? I(m).rootPropertyValueCache[P] = Q.Normalizations.registered[P]("extract", null, T[1]) : I(m).rootPropertyValueCache[P] = T[1]), "transform" === T[0] && (v = !0)
                                        }
                                    }
                                a.mobileHA && I(m).transformCache.translate3d === W && (I(m).transformCache.translate3d = "(0px, 0px, 0px)", v = !0), v && Q.flushTransformCache(m)
                            }
                        }
                        a.display !== W && "none" !== a.display && (Y.State.calls[n][2].display = !1), a.visibility !== W && "hidden" !== a.visibility && (Y.State.calls[n][2].visibility = !1), a.progress && a.progress.call(i[1], i[1], d, Math.max(0, s + a.duration - t), s, c), 1 === d && $(n)
                    }
            }
            Y.State.isTicking && F(X)
        }

        function $(e, t) {
            if (!Y.State.calls[e]) return !1;
            for (var r = Y.State.calls[e][0], n = Y.State.calls[e][1], i = Y.State.calls[e][2], o = Y.State.calls[e][4], a = !1, s = 0, l = r.length; s < l; s++) {
                var c = r[s].element;
                t || i.loop || ("none" === i.display && Q.setPropertyValue(c, "display", i.display), "hidden" === i.visibility && Q.setPropertyValue(c, "visibility", i.visibility));
                var u = I(c);
                if (!0 !== i.loop && (G.queue(c)[1] === W || !/\.velocityQueueEntryFlag/i.test(G.queue(c)[1])) && u) {
                    u.isAnimating = !1;
                    var f = !(u.rootPropertyValueCache = {});
                    G.each(Q.Lists.transforms3D, function(e, t) {
                        var r = /^scale/.test(t) ? 1 : 0,
                            n = u.transformCache[t];
                        u.transformCache[t] !== W && new RegExp("^\\(" + r + "[^.]").test(n) && (f = !0, delete u.transformCache[t])
                    }), i.mobileHA && (f = !0, delete u.transformCache.translate3d), f && Q.flushTransformCache(c), Q.Values.removeClass(c, "velocity-animating")
                }
                if (!t && i.complete && !i.loop && s === l - 1) try {
                    i.complete.call(n, n)
                } catch (e) {
                    setTimeout(function() {
                        throw e
                    }, 1)
                }
                o && !0 !== i.loop && o(n), u && !0 === i.loop && !t && (G.each(u.tweensContainer, function(e, t) {
                    if (/^rotate/.test(e) && (parseFloat(t.startValue) - parseFloat(t.endValue)) % 360 == 0) {
                        var r = t.startValue;
                        t.startValue = t.endValue, t.endValue = r
                    }
                    /^backgroundPosition/.test(e) && 100 === parseFloat(t.endValue) && "%" === t.unitType && (t.endValue = 0, t.startValue = 100)
                }), Y(c, "reverse", {
                    loop: !0,
                    delay: i.delay
                })), !1 !== i.queue && G.dequeue(c, i.queue)
            }
            Y.State.calls[e] = !1;
            for (var d = 0, p = Y.State.calls.length; d < p; d++)
                if (!1 !== Y.State.calls[d]) {
                    a = !0;
                    break
                }!1 === a && (Y.State.isTicking = !1, delete Y.State.calls, Y.State.calls = [])
        }
        var G, i, E = function() {
                if (B.documentMode) return B.documentMode;
                for (var e = 7; 4 < e; e--) {
                    var t = B.createElement("div");
                    if (t.innerHTML = "\x3c!--[if IE " + e + "]><span></span><![endif]--\x3e", t.getElementsByTagName("span").length) return t = null, e
                }
                return W
            }(),
            t = (i = 0, D.webkitRequestAnimationFrame || D.mozRequestAnimationFrame || function(e) {
                var t, r = (new Date).getTime();
                return t = Math.max(0, 16 - (r - i)), i = r + t, setTimeout(function() {
                    e(r + t)
                }, t)
            }),
            V = function() {
                var e = D.performance || {};
                if (!e.hasOwnProperty("now")) {
                    var t = e.timing && e.timing.domComplete ? e.timing.domComplete : (new Date).getTime();
                    e.now = function() {
                        return (new Date).getTime() - t
                    }
                }
                return e
            }(),
            U = {
                isNumber: function(e) {
                    return "number" == typeof e
                },
                isString: function(e) {
                    return "string" == typeof e
                },
                isArray: Array.isArray || function(e) {
                    return "[object Array]" === Object.prototype.toString.call(e)
                },
                isFunction: function(e) {
                    return "[object Function]" === Object.prototype.toString.call(e)
                },
                isNode: function(e) {
                    return e && e.nodeType
                },
                isWrapped: function(e) {
                    return e && U.isNumber(e.length) && !U.isString(e) && !U.isFunction(e) && !U.isNode(e) && (0 === e.length || U.isNode(e[0]))
                },
                isSVG: function(e) {
                    return D.SVGElement && e instanceof D.SVGElement
                },
                isEmptyObject: function(e) {
                    for (var t in e)
                        if (e.hasOwnProperty(t)) return !1;
                    return !0
                }
            },
            r = !1;
        if (e.fn && e.fn.jquery ? (G = e, r = !0) : G = D.Velocity.Utilities, E <= 8 && !r) throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");
        if (!(E <= 7)) {
            var o = "swing",
                Y = {
                    State: {
                        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                        isAndroid: /Android/i.test(navigator.userAgent),
                        isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
                        isChrome: D.chrome,
                        isFirefox: /Firefox/i.test(navigator.userAgent),
                        prefixElement: B.createElement("div"),
                        prefixMatches: {},
                        scrollAnchor: null,
                        scrollPropertyLeft: null,
                        scrollPropertyTop: null,
                        isTicking: !1,
                        calls: [],
                        delayedElements: {
                            count: 0
                        }
                    },
                    CSS: {},
                    Utilities: G,
                    Redirects: {},
                    Easings: {},
                    Promise: D.Promise,
                    defaults: {
                        queue: "",
                        duration: 400,
                        easing: o,
                        begin: W,
                        complete: W,
                        progress: W,
                        display: W,
                        visibility: W,
                        loop: !1,
                        delay: !1,
                        mobileHA: !0,
                        _cacheValues: !0,
                        promiseRejectEmpty: !0
                    },
                    init: function(e) {
                        G.data(e, "velocity", {
                            isSVG: U.isSVG(e),
                            isAnimating: !1,
                            computedStyle: null,
                            tweensContainer: null,
                            rootPropertyValueCache: {},
                            transformCache: {}
                        })
                    },
                    hook: null,
                    mock: !1,
                    version: {
                        major: 1,
                        minor: 4,
                        patch: 1
                    },
                    debug: !1,
                    timestamp: !0,
                    pauseAll: function(r) {
                        var n = (new Date).getTime();
                        G.each(Y.State.calls, function(e, t) {
                            if (t) {
                                if (r !== W && (t[2].queue !== r || !1 === t[2].queue)) return !0;
                                t[5] = {
                                    resume: !1
                                }
                            }
                        }), G.each(Y.State.delayedElements, function(e, t) {
                            t && m(t, n)
                        })
                    },
                    resumeAll: function(r) {
                        (new Date).getTime();
                        G.each(Y.State.calls, function(e, t) {
                            if (t) {
                                if (r !== W && (t[2].queue !== r || !1 === t[2].queue)) return !0;
                                t[5] && (t[5].resume = !0)
                            }
                        }), G.each(Y.State.delayedElements, function(e, t) {
                            t && v(t)
                        })
                    }
                };
            D.pageYOffset !== W ? (Y.State.scrollAnchor = D, Y.State.scrollPropertyLeft = "pageXOffset", Y.State.scrollPropertyTop = "pageYOffset") : (Y.State.scrollAnchor = B.documentElement || B.body.parentNode || B.body, Y.State.scrollPropertyLeft = "scrollLeft", Y.State.scrollPropertyTop = "scrollTop");
            var a = function() {
                function y(e) {
                    return -e.tension * e.x - e.friction * e.v
                }

                function b(e, t, r) {
                    var n = {
                        x: e.x + r.dx * t,
                        v: e.v + r.dv * t,
                        tension: e.tension,
                        friction: e.friction
                    };
                    return {
                        dx: n.v,
                        dv: y(n)
                    }
                }
                return function e(t, r, n) {
                    var i, o, a, s, l, c, u, f, d, p, g, h = {
                            x: -1,
                            v: 0,
                            tension: null,
                            friction: null
                        },
                        m = [0],
                        v = 0;
                    for (t = parseFloat(t) || 500, r = parseFloat(r) || 20, n = n || null, h.tension = t, h.friction = r, o = (i = null !== n) ? (v = e(t, r)) / n * .016 : .016; l = o, void 0, c = {
                            dx: (s = a || h).v,
                            dv: y(s)
                        }, u = b(s, .5 * l, c), f = b(s, .5 * l, u), d = b(s, l, f), p = 1 / 6 * (c.dx + 2 * (u.dx + f.dx) + d.dx), g = 1 / 6 * (c.dv + 2 * (u.dv + f.dv) + d.dv), s.x = s.x + p * l, s.v = s.v + g * l, a = s, m.push(1 + a.x), v += 16, 1e-4 < Math.abs(a.x) && 1e-4 < Math.abs(a.v););
                    return i ? function(e) {
                        return m[e * (m.length - 1) | 0]
                    } : v
                }
            }();
            Y.Easings = {
                linear: function(e) {
                    return e
                },
                swing: function(e) {
                    return .5 - Math.cos(e * Math.PI) / 2
                },
                spring: function(e) {
                    return 1 - Math.cos(4.5 * e * Math.PI) * Math.exp(6 * -e)
                }
            }, G.each([
                ["ease", [.25, .1, .25, 1]],
                ["ease-in", [.42, 0, 1, 1]],
                ["ease-out", [0, 0, .58, 1]],
                ["ease-in-out", [.42, 0, .58, 1]],
                ["easeInSine", [.47, 0, .745, .715]],
                ["easeOutSine", [.39, .575, .565, 1]],
                ["easeInOutSine", [.445, .05, .55, .95]],
                ["easeInQuad", [.55, .085, .68, .53]],
                ["easeOutQuad", [.25, .46, .45, .94]],
                ["easeInOutQuad", [.455, .03, .515, .955]],
                ["easeInCubic", [.55, .055, .675, .19]],
                ["easeOutCubic", [.215, .61, .355, 1]],
                ["easeInOutCubic", [.645, .045, .355, 1]],
                ["easeInQuart", [.895, .03, .685, .22]],
                ["easeOutQuart", [.165, .84, .44, 1]],
                ["easeInOutQuart", [.77, 0, .175, 1]],
                ["easeInQuint", [.755, .05, .855, .06]],
                ["easeOutQuint", [.23, 1, .32, 1]],
                ["easeInOutQuint", [.86, 0, .07, 1]],
                ["easeInExpo", [.95, .05, .795, .035]],
                ["easeOutExpo", [.19, 1, .22, 1]],
                ["easeInOutExpo", [1, 0, 0, 1]],
                ["easeInCirc", [.6, .04, .98, .335]],
                ["easeOutCirc", [.075, .82, .165, 1]],
                ["easeInOutCirc", [.785, .135, .15, .86]]
            ], function(e, t) {
                Y.Easings[t[0]] = n.apply(null, t[1])
            });
            var Q = Y.CSS = {
                RegEx: {
                    isHex: /^#([A-f\d]{3}){1,2}$/i,
                    valueUnwrap: /^[A-z]+\((.*)\)$/i,
                    wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
                    valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi
                },
                Lists: {
                    colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"],
                    transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"],
                    transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"],
                    units: ["%", "em", "ex", "ch", "rem", "vw", "vh", "vmin", "vmax", "cm", "mm", "Q", "in", "pc", "pt", "px", "deg", "grad", "rad", "turn", "s", "ms"],
                    colorNames: {
                        aliceblue: "240,248,255",
                        antiquewhite: "250,235,215",
                        aquamarine: "127,255,212",
                        aqua: "0,255,255",
                        azure: "240,255,255",
                        beige: "245,245,220",
                        bisque: "255,228,196",
                        black: "0,0,0",
                        blanchedalmond: "255,235,205",
                        blueviolet: "138,43,226",
                        blue: "0,0,255",
                        brown: "165,42,42",
                        burlywood: "222,184,135",
                        cadetblue: "95,158,160",
                        chartreuse: "127,255,0",
                        chocolate: "210,105,30",
                        coral: "255,127,80",
                        cornflowerblue: "100,149,237",
                        cornsilk: "255,248,220",
                        crimson: "220,20,60",
                        cyan: "0,255,255",
                        darkblue: "0,0,139",
                        darkcyan: "0,139,139",
                        darkgoldenrod: "184,134,11",
                        darkgray: "169,169,169",
                        darkgrey: "169,169,169",
                        darkgreen: "0,100,0",
                        darkkhaki: "189,183,107",
                        darkmagenta: "139,0,139",
                        darkolivegreen: "85,107,47",
                        darkorange: "255,140,0",
                        darkorchid: "153,50,204",
                        darkred: "139,0,0",
                        darksalmon: "233,150,122",
                        darkseagreen: "143,188,143",
                        darkslateblue: "72,61,139",
                        darkslategray: "47,79,79",
                        darkturquoise: "0,206,209",
                        darkviolet: "148,0,211",
                        deeppink: "255,20,147",
                        deepskyblue: "0,191,255",
                        dimgray: "105,105,105",
                        dimgrey: "105,105,105",
                        dodgerblue: "30,144,255",
                        firebrick: "178,34,34",
                        floralwhite: "255,250,240",
                        forestgreen: "34,139,34",
                        fuchsia: "255,0,255",
                        gainsboro: "220,220,220",
                        ghostwhite: "248,248,255",
                        gold: "255,215,0",
                        goldenrod: "218,165,32",
                        gray: "128,128,128",
                        grey: "128,128,128",
                        greenyellow: "173,255,47",
                        green: "0,128,0",
                        honeydew: "240,255,240",
                        hotpink: "255,105,180",
                        indianred: "205,92,92",
                        indigo: "75,0,130",
                        ivory: "255,255,240",
                        khaki: "240,230,140",
                        lavenderblush: "255,240,245",
                        lavender: "230,230,250",
                        lawngreen: "124,252,0",
                        lemonchiffon: "255,250,205",
                        lightblue: "173,216,230",
                        lightcoral: "240,128,128",
                        lightcyan: "224,255,255",
                        lightgoldenrodyellow: "250,250,210",
                        lightgray: "211,211,211",
                        lightgrey: "211,211,211",
                        lightgreen: "144,238,144",
                        lightpink: "255,182,193",
                        lightsalmon: "255,160,122",
                        lightseagreen: "32,178,170",
                        lightskyblue: "135,206,250",
                        lightslategray: "119,136,153",
                        lightsteelblue: "176,196,222",
                        lightyellow: "255,255,224",
                        limegreen: "50,205,50",
                        lime: "0,255,0",
                        linen: "250,240,230",
                        magenta: "255,0,255",
                        maroon: "128,0,0",
                        mediumaquamarine: "102,205,170",
                        mediumblue: "0,0,205",
                        mediumorchid: "186,85,211",
                        mediumpurple: "147,112,219",
                        mediumseagreen: "60,179,113",
                        mediumslateblue: "123,104,238",
                        mediumspringgreen: "0,250,154",
                        mediumturquoise: "72,209,204",
                        mediumvioletred: "199,21,133",
                        midnightblue: "25,25,112",
                        mintcream: "245,255,250",
                        mistyrose: "255,228,225",
                        moccasin: "255,228,181",
                        navajowhite: "255,222,173",
                        navy: "0,0,128",
                        oldlace: "253,245,230",
                        olivedrab: "107,142,35",
                        olive: "128,128,0",
                        orangered: "255,69,0",
                        orange: "255,165,0",
                        orchid: "218,112,214",
                        palegoldenrod: "238,232,170",
                        palegreen: "152,251,152",
                        paleturquoise: "175,238,238",
                        palevioletred: "219,112,147",
                        papayawhip: "255,239,213",
                        peachpuff: "255,218,185",
                        peru: "205,133,63",
                        pink: "255,192,203",
                        plum: "221,160,221",
                        powderblue: "176,224,230",
                        purple: "128,0,128",
                        red: "255,0,0",
                        rosybrown: "188,143,143",
                        royalblue: "65,105,225",
                        saddlebrown: "139,69,19",
                        salmon: "250,128,114",
                        sandybrown: "244,164,96",
                        seagreen: "46,139,87",
                        seashell: "255,245,238",
                        sienna: "160,82,45",
                        silver: "192,192,192",
                        skyblue: "135,206,235",
                        slateblue: "106,90,205",
                        slategray: "112,128,144",
                        snow: "255,250,250",
                        springgreen: "0,255,127",
                        steelblue: "70,130,180",
                        tan: "210,180,140",
                        teal: "0,128,128",
                        thistle: "216,191,216",
                        tomato: "255,99,71",
                        turquoise: "64,224,208",
                        violet: "238,130,238",
                        wheat: "245,222,179",
                        whitesmoke: "245,245,245",
                        white: "255,255,255",
                        yellowgreen: "154,205,50",
                        yellow: "255,255,0"
                    }
                },
                Hooks: {
                    templates: {
                        textShadow: ["Color X Y Blur", "black 0px 0px 0px"],
                        boxShadow: ["Color X Y Blur Spread", "black 0px 0px 0px 0px"],
                        clip: ["Top Right Bottom Left", "0px 0px 0px 0px"],
                        backgroundPosition: ["X Y", "0% 0%"],
                        transformOrigin: ["X Y Z", "50% 50% 0px"],
                        perspectiveOrigin: ["X Y", "50% 50%"]
                    },
                    registered: {},
                    register: function() {
                        for (var e = 0; e < Q.Lists.colors.length; e++) {
                            var t = "color" === Q.Lists.colors[e] ? "0 0 0 1" : "255 255 255 1";
                            Q.Hooks.templates[Q.Lists.colors[e]] = ["Red Green Blue Alpha", t]
                        }
                        var r, n, i;
                        if (E)
                            for (r in Q.Hooks.templates)
                                if (Q.Hooks.templates.hasOwnProperty(r)) {
                                    i = (n = Q.Hooks.templates[r])[0].split(" ");
                                    var o = n[1].match(Q.RegEx.valueSplit);
                                    "Color" === i[0] && (i.push(i.shift()), o.push(o.shift()), Q.Hooks.templates[r] = [i.join(" "), o.join(" ")])
                                }
                        for (r in Q.Hooks.templates)
                            if (Q.Hooks.templates.hasOwnProperty(r))
                                for (var a in i = (n = Q.Hooks.templates[r])[0].split(" "))
                                    if (i.hasOwnProperty(a)) {
                                        var s = r + i[a],
                                            l = a;
                                        Q.Hooks.registered[s] = [r, l]
                                    }
                    },
                    getRoot: function(e) {
                        var t = Q.Hooks.registered[e];
                        return t ? t[0] : e
                    },
                    getUnit: function(e, t) {
                        var r = (e.substr(t || 0, 5).match(/^[a-z%]+/) || [])[0] || "";
                        return r && 0 <= Q.Lists.units.indexOf(r) ? r : ""
                    },
                    fixColors: function(e) {
                        return e.replace(/(rgba?\(\s*)?(\b[a-z]+\b)/g, function(e, t, r) {
                            return Q.Lists.colorNames.hasOwnProperty(r) ? (t || "rgba(") + Q.Lists.colorNames[r] + (t ? "" : ",1)") : t + r
                        })
                    },
                    cleanRootPropertyValue: function(e, t) {
                        return Q.RegEx.valueUnwrap.test(t) && (t = t.match(Q.RegEx.valueUnwrap)[1]), Q.Values.isCSSNullValue(t) && (t = Q.Hooks.templates[e][1]), t
                    },
                    extractValue: function(e, t) {
                        var r = Q.Hooks.registered[e];
                        if (r) {
                            var n = r[0],
                                i = r[1];
                            return (t = Q.Hooks.cleanRootPropertyValue(n, t)).toString().match(Q.RegEx.valueSplit)[i]
                        }
                        return t
                    },
                    injectValue: function(e, t, r) {
                        var n = Q.Hooks.registered[e];
                        if (n) {
                            var i, o = n[0],
                                a = n[1];
                            return (i = (r = Q.Hooks.cleanRootPropertyValue(o, r)).toString().match(Q.RegEx.valueSplit))[a] = t, i.join(" ")
                        }
                        return r
                    }
                },
                Normalizations: {
                    registered: {
                        clip: function(e, t, r) {
                            switch (e) {
                                case "name":
                                    return "clip";
                                case "extract":
                                    var n;
                                    return n = Q.RegEx.wrappedValueAlreadyExtracted.test(r) ? r : (n = r.toString().match(Q.RegEx.valueUnwrap)) ? n[1].replace(/,(\s+)?/g, " ") : r;
                                case "inject":
                                    return "rect(" + r + ")"
                            }
                        },
                        blur: function(e, t, r) {
                            switch (e) {
                                case "name":
                                    return Y.State.isFirefox ? "filter" : "-webkit-filter";
                                case "extract":
                                    var n = parseFloat(r);
                                    if (!n && 0 !== n) {
                                        var i = r.toString().match(/blur\(([0-9]+[A-z]+)\)/i);
                                        n = i ? i[1] : 0
                                    }
                                    return n;
                                case "inject":
                                    return parseFloat(r) ? "blur(" + r + ")" : "none"
                            }
                        },
                        opacity: function(e, t, r) {
                            if (E <= 8) switch (e) {
                                case "name":
                                    return "filter";
                                case "extract":
                                    var n = r.toString().match(/alpha\(opacity=(.*)\)/i);
                                    return n ? n[1] / 100 : 1;
                                case "inject":
                                    return (t.style.zoom = 1) <= parseFloat(r) ? "" : "alpha(opacity=" + parseInt(100 * parseFloat(r), 10) + ")"
                            } else switch (e) {
                                case "name":
                                    return "opacity";
                                case "extract":
                                case "inject":
                                    return r
                            }
                        }
                    },
                    register: function() {
                        function o(e, t, r) {
                            if ("border-box" === Q.getPropertyValue(t, "boxSizing").toString().toLowerCase() !== (r || !1)) return 0;
                            var n, i, o = 0,
                                a = "width" === e ? ["Left", "Right"] : ["Top", "Bottom"],
                                s = ["padding" + a[0], "padding" + a[1], "border" + a[0] + "Width", "border" + a[1] + "Width"];
                            for (n = 0; n < s.length; n++) i = parseFloat(Q.getPropertyValue(t, s[n])), isNaN(i) || (o += i);
                            return r ? -o : o
                        }

                        function e(n, i) {
                            return function(e, t, r) {
                                switch (e) {
                                    case "name":
                                        return n;
                                    case "extract":
                                        return parseFloat(r) + o(n, t, i);
                                    case "inject":
                                        return parseFloat(r) - o(n, t, i) + "px"
                                }
                            }
                        }
                        E && !(9 < E) || Y.State.isGingerbread || (Q.Lists.transformsBase = Q.Lists.transformsBase.concat(Q.Lists.transforms3D));
                        for (var t = 0; t < Q.Lists.transformsBase.length; t++) ! function() {
                            var i = Q.Lists.transformsBase[t];
                            Q.Normalizations.registered[i] = function(e, t, r) {
                                switch (e) {
                                    case "name":
                                        return "transform";
                                    case "extract":
                                        return I(t) === W || I(t).transformCache[i] === W ? /^scale/i.test(i) ? 1 : 0 : I(t).transformCache[i].replace(/[()]/g, "");
                                    case "inject":
                                        var n = !1;
                                        switch (i.substr(0, i.length - 1)) {
                                            case "translate":
                                                n = !/(%|px|em|rem|vw|vh|\d)$/i.test(r);
                                                break;
                                            case "scal":
                                            case "scale":
                                                Y.State.isAndroid && I(t).transformCache[i] === W && r < 1 && (r = 1), n = !/(\d)$/i.test(r);
                                                break;
                                            case "skew":
                                                n = !/(deg|\d)$/i.test(r);
                                                break;
                                            case "rotate":
                                                n = !/(deg|\d)$/i.test(r)
                                        }
                                        return n || (I(t).transformCache[i] = "(" + r + ")"), I(t).transformCache[i]
                                }
                            }
                        }();
                        for (var r = 0; r < Q.Lists.colors.length; r++) ! function() {
                            var a = Q.Lists.colors[r];
                            Q.Normalizations.registered[a] = function(e, t, r) {
                                switch (e) {
                                    case "name":
                                        return a;
                                    case "extract":
                                        var n;
                                        if (Q.RegEx.wrappedValueAlreadyExtracted.test(r)) n = r;
                                        else {
                                            var i, o = {
                                                black: "rgb(0, 0, 0)",
                                                blue: "rgb(0, 0, 255)",
                                                gray: "rgb(128, 128, 128)",
                                                green: "rgb(0, 128, 0)",
                                                red: "rgb(255, 0, 0)",
                                                white: "rgb(255, 255, 255)"
                                            };
                                            /^[A-z]+$/i.test(r) ? i = o[r] !== W ? o[r] : o.black : Q.RegEx.isHex.test(r) ? i = "rgb(" + Q.Values.hexToRgb(r).join(" ") + ")" : /^rgba?\(/i.test(r) || (i = o.black), n = (i || r).toString().match(Q.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ")
                                        }
                                        return (!E || 8 < E) && 3 === n.split(" ").length && (n += " 1"), n;
                                    case "inject":
                                        return /^rgb/.test(r) ? r : (E <= 8 ? 4 === r.split(" ").length && (r = r.split(/\s+/).slice(0, 3).join(" ")) : 3 === r.split(" ").length && (r += " 1"), (E <= 8 ? "rgb" : "rgba") + "(" + r.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")")
                                }
                            }
                        }();
                        Q.Normalizations.registered.innerWidth = e("width", !0), Q.Normalizations.registered.innerHeight = e("height", !0), Q.Normalizations.registered.outerWidth = e("width"), Q.Normalizations.registered.outerHeight = e("height")
                    }
                },
                Names: {
                    camelCase: function(e) {
                        return e.replace(/-(\w)/g, function(e, t) {
                            return t.toUpperCase()
                        })
                    },
                    SVGAttribute: function(e) {
                        var t = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";
                        return (E || Y.State.isAndroid && !Y.State.isChrome) && (t += "|transform"), new RegExp("^(" + t + ")$", "i").test(e)
                    },
                    prefixCheck: function(e) {
                        if (Y.State.prefixMatches[e]) return [Y.State.prefixMatches[e], !0];
                        for (var t = ["", "Webkit", "Moz", "ms", "O"], r = 0, n = t.length; r < n; r++) {
                            var i;
                            if (i = 0 === r ? e : t[r] + e.replace(/^\w/, function(e) {
                                    return e.toUpperCase()
                                }), U.isString(Y.State.prefixElement.style[i])) return [Y.State.prefixMatches[e] = i, !0]
                        }
                        return [e, !1]
                    }
                },
                Values: {
                    hexToRgb: function(e) {
                        var t;
                        return e = e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(e, t, r, n) {
                            return t + t + r + r + n + n
                        }), (t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e)) ? [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)] : [0, 0, 0]
                    },
                    isCSSNullValue: function(e) {
                        return !e || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(e)
                    },
                    getUnitType: function(e) {
                        return /^(rotate|skew)/i.test(e) ? "deg" : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(e) ? "" : "px"
                    },
                    getDisplayType: function(e) {
                        var t = e && e.tagName.toString().toLowerCase();
                        return /^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(t) ? "inline" : /^(li)$/i.test(t) ? "list-item" : /^(tr)$/i.test(t) ? "table-row" : /^(table)$/i.test(t) ? "table" : /^(tbody)$/i.test(t) ? "table-row-group" : "block"
                    },
                    addClass: function(e, t) {
                        if (e)
                            if (e.classList) e.classList.add(t);
                            else if (U.isString(e.className)) e.className += (e.className.length ? " " : "") + t;
                        else {
                            var r = e.getAttribute(E <= 7 ? "className" : "class") || "";
                            e.setAttribute("class", r + (r ? " " : "") + t)
                        }
                    },
                    removeClass: function(e, t) {
                        if (e)
                            if (e.classList) e.classList.remove(t);
                            else if (U.isString(e.className)) e.className = e.className.toString().replace(new RegExp("(^|\\s)" + t.split(" ").join("|") + "(\\s|$)", "gi"), " ");
                        else {
                            var r = e.getAttribute(E <= 7 ? "className" : "class") || "";
                            e.setAttribute("class", r.replace(new RegExp("(^|s)" + t.split(" ").join("|") + "(s|$)", "gi"), " "))
                        }
                    }
                },
                getPropertyValue: function(e, t, r, c) {
                    function u(e, t) {
                        var r = 0;
                        if (E <= 8) r = G.css(e, t);
                        else {
                            var n = !1;
                            /^(width|height)$/.test(t) && 0 === Q.getPropertyValue(e, "display") && (n = !0, Q.setPropertyValue(e, "display", Q.Values.getDisplayType(e)));
                            var i, o = function() {
                                n && Q.setPropertyValue(e, "display", "none")
                            };
                            if (!c) {
                                if ("height" === t && "border-box" !== Q.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                                    var a = e.offsetHeight - (parseFloat(Q.getPropertyValue(e, "borderTopWidth")) || 0) - (parseFloat(Q.getPropertyValue(e, "borderBottomWidth")) || 0) - (parseFloat(Q.getPropertyValue(e, "paddingTop")) || 0) - (parseFloat(Q.getPropertyValue(e, "paddingBottom")) || 0);
                                    return o(), a
                                }
                                if ("width" === t && "border-box" !== Q.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                                    var s = e.offsetWidth - (parseFloat(Q.getPropertyValue(e, "borderLeftWidth")) || 0) - (parseFloat(Q.getPropertyValue(e, "borderRightWidth")) || 0) - (parseFloat(Q.getPropertyValue(e, "paddingLeft")) || 0) - (parseFloat(Q.getPropertyValue(e, "paddingRight")) || 0);
                                    return o(), s
                                }
                            }
                            i = I(e) === W ? D.getComputedStyle(e, null) : I(e).computedStyle ? I(e).computedStyle : I(e).computedStyle = D.getComputedStyle(e, null), "borderColor" === t && (t = "borderTopColor"), "" !== (r = 9 === E && "filter" === t ? i.getPropertyValue(t) : i[t]) && null !== r || (r = e.style[t]), o()
                        }
                        if ("auto" === r && /^(top|right|bottom|left)$/i.test(t)) {
                            var l = u(e, "position");
                            ("fixed" === l || "absolute" === l && /top|left/i.test(t)) && (r = G(e).position()[t] + "px")
                        }
                        return r
                    }
                    var n;
                    if (Q.Hooks.registered[t]) {
                        var i = t,
                            o = Q.Hooks.getRoot(i);
                        r === W && (r = Q.getPropertyValue(e, Q.Names.prefixCheck(o)[0])), Q.Normalizations.registered[o] && (r = Q.Normalizations.registered[o]("extract", e, r)), n = Q.Hooks.extractValue(i, r)
                    } else if (Q.Normalizations.registered[t]) {
                        var a, s;
                        "transform" !== (a = Q.Normalizations.registered[t]("name", e)) && (s = u(e, Q.Names.prefixCheck(a)[0]), Q.Values.isCSSNullValue(s) && Q.Hooks.templates[t] && (s = Q.Hooks.templates[t][1])), n = Q.Normalizations.registered[t]("extract", e, s)
                    }
                    if (!/^[\d-]/.test(n)) {
                        var l = I(e);
                        if (l && l.isSVG && Q.Names.SVGAttribute(t))
                            if (/^(height|width)$/i.test(t)) try {
                                n = e.getBBox()[t]
                            } catch (e) {
                                n = 0
                            } else n = e.getAttribute(t);
                            else n = u(e, Q.Names.prefixCheck(t)[0])
                    }
                    return Q.Values.isCSSNullValue(n) && (n = 0), 2 <= Y.debug && console.log("Get " + t + ": " + n), n
                },
                setPropertyValue: function(e, t, r, n, i) {
                    var o = t;
                    if ("scroll" === t) i.container ? i.container["scroll" + i.direction] = r : "Left" === i.direction ? D.scrollTo(r, i.alternateValue) : D.scrollTo(i.alternateValue, r);
                    else if (Q.Normalizations.registered[t] && "transform" === Q.Normalizations.registered[t]("name", e)) Q.Normalizations.registered[t]("inject", e, r), o = "transform", r = I(e).transformCache[t];
                    else {
                        if (Q.Hooks.registered[t]) {
                            var a = t,
                                s = Q.Hooks.getRoot(t);
                            n = n || Q.getPropertyValue(e, s), r = Q.Hooks.injectValue(a, r, n), t = s
                        }
                        if (Q.Normalizations.registered[t] && (r = Q.Normalizations.registered[t]("inject", e, r), t = Q.Normalizations.registered[t]("name", e)), o = Q.Names.prefixCheck(t)[0], E <= 8) try {
                            e.style[o] = r
                        } catch (e) {
                            Y.debug && console.log("Browser does not support [" + r + "] for [" + o + "]")
                        } else {
                            var l = I(e);
                            l && l.isSVG && Q.Names.SVGAttribute(t) ? e.setAttribute(t, r) : e.style[o] = r
                        }
                        2 <= Y.debug && console.log("Set " + t + " (" + o + "): " + r)
                    }
                    return [o, r]
                },
                flushTransformCache: function(t) {
                    var r = "",
                        e = I(t);
                    if ((E || Y.State.isAndroid && !Y.State.isChrome) && e && e.isSVG) {
                        var n = function(e) {
                                return parseFloat(Q.getPropertyValue(t, e))
                            },
                            i = {
                                translate: [n("translateX"), n("translateY")],
                                skewX: [n("skewX")],
                                skewY: [n("skewY")],
                                scale: 1 !== n("scale") ? [n("scale"), n("scale")] : [n("scaleX"), n("scaleY")],
                                rotate: [n("rotateZ"), 0, 0]
                            };
                        G.each(I(t).transformCache, function(e) {
                            /^translate/i.test(e) ? e = "translate" : /^scale/i.test(e) ? e = "scale" : /^rotate/i.test(e) && (e = "rotate"), i[e] && (r += e + "(" + i[e].join(" ") + ") ", delete i[e])
                        })
                    } else {
                        var o, a;
                        G.each(I(t).transformCache, function(e) {
                            return o = I(t).transformCache[e], "transformPerspective" === e ? (a = o, !0) : (9 === E && "rotateZ" === e && (e = "rotate"), void(r += e + o + " "))
                        }), a && (r = "perspective" + a + " " + r)
                    }
                    Q.setPropertyValue(t, "transform", r)
                }
            };
            Q.Hooks.register(), Q.Normalizations.register(), Y.hook = function(e, n, i) {
                var o;
                return e = h(e), G.each(e, function(e, t) {
                    if (I(t) === W && Y.init(t), i === W) o === W && (o = Q.getPropertyValue(t, n));
                    else {
                        var r = Q.setPropertyValue(t, n, i);
                        "transform" === r[0] && Y.CSS.flushTransformCache(t), o = r
                    }
                }), o
            };
            var y = function() {
                function e() {
                    return t ? F.promise || null : n
                }
                var r, t, n, i, T, E, V, o = arguments[0] && (arguments[0].p || G.isPlainObject(arguments[0].properties) && !arguments[0].properties.names || U.isString(arguments[0].properties));
                U.isWrapped(this) ? (t = !1, i = 0, n = T = this) : (t = !0, i = 1, T = o ? arguments[0].elements || arguments[0].e : arguments[0]);
                var F = {
                    promise: null,
                    resolver: null,
                    rejecter: null
                };
                if (t && Y.Promise && (F.promise = new Y.Promise(function(e, t) {
                        F.resolver = e, F.rejecter = t
                    })), V = o ? (E = arguments[0].properties || arguments[0].p, arguments[0].options || arguments[0].o) : (E = arguments[i], arguments[i + 1]), T = h(T)) {
                    var A, R = T.length,
                        j = 0;
                    if (!/^(stop|finish|finishAll|pause|resume)$/i.test(E) && !G.isPlainObject(V)) {
                        V = {};
                        for (var a = i + 1; a < arguments.length; a++) U.isArray(arguments[a]) || !/^(fast|normal|slow)$/i.test(arguments[a]) && !/^\d/.test(arguments[a]) ? U.isString(arguments[a]) || U.isArray(arguments[a]) ? V.easing = arguments[a] : U.isFunction(arguments[a]) && (V.complete = arguments[a]) : V.duration = arguments[a]
                    }
                    switch (E) {
                        case "scroll":
                            A = "scroll";
                            break;
                        case "reverse":
                            A = "reverse";
                            break;
                        case "pause":
                            var s = (new Date).getTime();
                            return G.each(T, function(e, t) {
                                m(t, s)
                            }), G.each(Y.State.calls, function(e, n) {
                                var i = !1;
                                n && G.each(n[1], function(e, r) {
                                    var t = V === W ? "" : V;
                                    return !0 !== t && n[2].queue !== t && (V !== W || !1 !== n[2].queue) || (G.each(T, function(e, t) {
                                        if (t === r) return n[5] = {
                                            resume: !1
                                        }, !(i = !0)
                                    }), !i && void 0)
                                })
                            }), e();
                        case "resume":
                            return G.each(T, function(e, t) {
                                v(t)
                            }), G.each(Y.State.calls, function(e, n) {
                                var i = !1;
                                n && G.each(n[1], function(e, r) {
                                    var t = V === W ? "" : V;
                                    return !0 !== t && n[2].queue !== t && (V !== W || !1 !== n[2].queue) || !n[5] || (G.each(T, function(e, t) {
                                        if (t === r) return n[5].resume = !0, !(i = !0)
                                    }), !i && void 0)
                                })
                            }), e();
                        case "finish":
                        case "finishAll":
                        case "stop":
                            G.each(T, function(e, t) {
                                I(t) && I(t).delayTimer && (clearTimeout(I(t).delayTimer.setTimeout), I(t).delayTimer.next && I(t).delayTimer.next(), delete I(t).delayTimer), "finishAll" !== E || !0 !== V && !U.isString(V) || (G.each(G.queue(t, U.isString(V) ? V : ""), function(e, t) {
                                    U.isFunction(t) && t()
                                }), G.queue(t, U.isString(V) ? V : "", []))
                            });
                            var l = [];
                            return G.each(Y.State.calls, function(o, a) {
                                a && G.each(a[1], function(e, n) {
                                    var i = V === W ? "" : V;
                                    return !0 !== i && a[2].queue !== i && (V !== W || !1 !== a[2].queue) || void G.each(T, function(e, t) {
                                        if (t === n)
                                            if ((!0 === V || U.isString(V)) && (G.each(G.queue(t, U.isString(V) ? V : ""), function(e, t) {
                                                    U.isFunction(t) && t(null, !0)
                                                }), G.queue(t, U.isString(V) ? V : "", [])), "stop" === E) {
                                                var r = I(t);
                                                r && r.tweensContainer && !1 !== i && G.each(r.tweensContainer, function(e, t) {
                                                    t.endValue = t.currentValue
                                                }), l.push(o)
                                            } else "finish" !== E && "finishAll" !== E || (a[2].duration = 1)
                                    })
                                })
                            }), "stop" === E && (G.each(l, function(e, t) {
                                $(t, !0)
                            }), F.promise && F.resolver(T)), e();
                        default:
                            if (!G.isPlainObject(E) || U.isEmptyObject(E)) {
                                if (U.isString(E) && Y.Redirects[E]) {
                                    var c = (r = G.extend({}, V)).duration,
                                        u = r.delay || 0;
                                    return !0 === r.backwards && (T = G.extend(!0, [], T).reverse()), G.each(T, function(e, t) {
                                        parseFloat(r.stagger) ? r.delay = u + parseFloat(r.stagger) * e : U.isFunction(r.stagger) && (r.delay = u + r.stagger.call(t, e, R)), r.drag && (r.duration = parseFloat(c) || (/^(callout|transition)/.test(E) ? 1e3 : 400), r.duration = Math.max(r.duration * (r.backwards ? 1 - e / R : (e + 1) / R), .75 * r.duration, 200)), Y.Redirects[E].call(t, t, r || {}, e, R, T, F.promise ? F : W)
                                    }), e()
                                }
                                var f = "Velocity: First argument (" + E + ") was not a property map, a known action, or a registered redirect. Aborting.";
                                return F.promise ? F.rejecter(new Error(f)) : console.log(f), e()
                            }
                            A = "start"
                    }
                    var q = {
                            lastParent: null,
                            lastPosition: null,
                            lastFontSize: null,
                            lastPercentToPxWidth: null,
                            lastPercentToPxHeight: null,
                            lastEmToPx: null,
                            remToPx: null,
                            vwToPx: null,
                            vhToPx: null
                        },
                        M = [];
                    G.each(T, function(e, t) {
                        U.isNode(t) && function(N, C) {
                            function r(e) {
                                var $, z, t, r, n, i, o;
                                if (O.begin && 0 === j) try {
                                    O.begin.call(T, T)
                                } catch (e) {
                                    setTimeout(function() {
                                        throw e
                                    }, 1)
                                }
                                if ("scroll" === A) {
                                    var a, s, l, c = /^x$/i.test(O.axis) ? "Left" : "Top",
                                        u = parseFloat(O.offset) || 0;
                                    O.container ? U.isWrapped(O.container) || U.isNode(O.container) ? (O.container = O.container[0] || O.container, l = (a = O.container["scroll" + c]) + G(N).position()[c.toLowerCase()] + u) : O.container = null : (a = Y.State.scrollAnchor[Y.State["scrollProperty" + c]], s = Y.State.scrollAnchor[Y.State["scrollProperty" + ("Left" === c ? "Top" : "Left")]], l = G(N).offset()[c.toLowerCase()] + u), H = {
                                        scroll: {
                                            rootPropertyValue: !1,
                                            startValue: a,
                                            currentValue: a,
                                            endValue: l,
                                            unitType: "",
                                            easing: O.easing,
                                            scrollData: {
                                                container: O.container,
                                                direction: c,
                                                alternateValue: s
                                            }
                                        },
                                        element: N
                                    }, Y.debug && console.log("tweensContainer (scroll): ", H.scroll, N)
                                } else if ("reverse" === A) {
                                    if (!($ = I(N))) return;
                                    if (!$.tweensContainer) return void G.dequeue(N, O.queue);
                                    for (var f in "none" === $.opts.display && ($.opts.display = "auto"), "hidden" === $.opts.visibility && ($.opts.visibility = "visible"), $.opts.loop = !1, $.opts.begin = null, $.opts.complete = null, V.easing || delete O.easing, V.duration || delete O.duration, O = G.extend({}, $.opts, O), z = G.extend(!0, {}, $ ? $.tweensContainer : null))
                                        if (z.hasOwnProperty(f) && "element" !== f) {
                                            var d = z[f].startValue;
                                            z[f].startValue = z[f].currentValue = z[f].endValue, z[f].endValue = d, U.isEmptyObject(V) || (z[f].easing = O.easing), Y.debug && console.log("reverse tweensContainer (" + f + "): " + JSON.stringify(z[f]), N)
                                        }
                                    H = z
                                } else if ("start" === A) {
                                    ($ = I(N)) && $.tweensContainer && !0 === $.isAnimating && (z = $.tweensContainer);
                                    var p = function(e, t) {
                                        var r, n = Q.Hooks.getRoot(e),
                                            i = !1,
                                            o = t[0],
                                            a = t[1],
                                            s = t[2];
                                        if ($ && $.isSVG || "tween" === n || !1 !== Q.Names.prefixCheck(n)[1] || Q.Normalizations.registered[n] !== W) {
                                            (O.display !== W && null !== O.display && "none" !== O.display || O.visibility !== W && "hidden" !== O.visibility) && /opacity|filter/.test(e) && !s && 0 !== o && (s = 0), O._cacheValues && z && z[e] ? (s === W && (s = z[e].endValue + z[e].unitType), i = $.rootPropertyValueCache[n]) : Q.Hooks.registered[e] ? s === W ? (i = Q.getPropertyValue(N, n), s = Q.getPropertyValue(N, e, i)) : i = Q.Hooks.templates[n][1] : s === W && (s = Q.getPropertyValue(N, e));
                                            var l, c, u, f = !1,
                                                d = function(e, t) {
                                                    var r, n;
                                                    return n = (t || "0").toString().toLowerCase().replace(/[%A-z]+$/, function(e) {
                                                        return r = e, ""
                                                    }), r || (r = Q.Values.getUnitType(e)), [n, r]
                                                };
                                            if (s !== o && U.isString(s) && U.isString(o)) {
                                                r = "";
                                                var p = 0,
                                                    g = 0,
                                                    h = [],
                                                    m = [],
                                                    v = 0,
                                                    y = 0,
                                                    b = 0;
                                                for (s = Q.Hooks.fixColors(s), o = Q.Hooks.fixColors(o); p < s.length && g < o.length;) {
                                                    var w = s[p],
                                                        x = o[g];
                                                    if (/[\d\.]/.test(w) && /[\d\.]/.test(x)) {
                                                        for (var S = w, k = x, P = ".", C = "."; ++p < s.length;) {
                                                            if ((w = s[p]) === P) P = "..";
                                                            else if (!/\d/.test(w)) break;
                                                            S += w
                                                        }
                                                        for (; ++g < o.length;) {
                                                            if ((x = o[g]) === C) C = "..";
                                                            else if (!/\d/.test(x)) break;
                                                            k += x
                                                        }
                                                        var T = Q.Hooks.getUnit(s, p),
                                                            E = Q.Hooks.getUnit(o, g);
                                                        if (p += T.length, g += E.length, T === E) S === k ? r += S + T : (r += "{" + h.length + (y ? "!" : "") + "}" + T, h.push(parseFloat(S)), m.push(parseFloat(k)));
                                                        else {
                                                            var V = parseFloat(S),
                                                                F = parseFloat(k);
                                                            r += (v < 5 ? "calc" : "") + "(" + (V ? "{" + h.length + (y ? "!" : "") + "}" : "0") + T + " + " + (F ? "{" + (h.length + (V ? 1 : 0)) + (y ? "!" : "") + "}" : "0") + E + ")", V && (h.push(V), m.push(0)), F && (h.push(0), m.push(F))
                                                        }
                                                    } else {
                                                        if (w !== x) {
                                                            v = 0;
                                                            break
                                                        }
                                                        r += w, p++, g++, 0 === v && "c" === w || 1 === v && "a" === w || 2 === v && "l" === w || 3 === v && "c" === w || 4 <= v && "(" === w ? v++ : (v && v < 5 || 4 <= v && ")" === w && --v < 5) && (v = 0), 0 === y && "r" === w || 1 === y && "g" === w || 2 === y && "b" === w || 3 === y && "a" === w || 3 <= y && "(" === w ? (3 === y && "a" === w && (b = 1), y++) : b && "," === w ? 3 < ++b && (y = b = 0) : (b && y < (b ? 5 : 4) || (b ? 4 : 3) <= y && ")" === w && --y < (b ? 5 : 4)) && (y = b = 0)
                                                    }
                                                }
                                                p === s.length && g === o.length || (Y.debug && console.error('Trying to pattern match mis-matched strings ["' + o + '", "' + s + '"]'), r = W), r && (h.length ? (Y.debug && console.log('Pattern found "' + r + '" -> ', h, m, "[" + s + "," + o + "]"), s = h, o = m, c = u = "") : r = W)
                                            }
                                            if (r || (s = (l = d(e, s))[0], u = l[1], o = (l = d(e, o))[0].replace(/^([+-\/*])=/, function(e, t) {
                                                    return f = t, ""
                                                }), c = l[1], s = parseFloat(s) || 0, o = parseFloat(o) || 0, "%" === c && (/^(fontSize|lineHeight)$/.test(e) ? (o /= 100, c = "em") : /^scale/.test(e) ? (o /= 100, c = "") : /(Red|Green|Blue)$/i.test(e) && (o = o / 100 * 255, c = ""))), /[\/*]/.test(f)) c = u;
                                            else if (u !== c && 0 !== s)
                                                if (0 === o) c = u;
                                                else {
                                                    L = L || function() {
                                                        var e = {
                                                                myParent: N.parentNode || B.body,
                                                                position: Q.getPropertyValue(N, "position"),
                                                                fontSize: Q.getPropertyValue(N, "fontSize")
                                                            },
                                                            t = e.position === q.lastPosition && e.myParent === q.lastParent,
                                                            r = e.fontSize === q.lastFontSize;
                                                        q.lastParent = e.myParent, q.lastPosition = e.position, q.lastFontSize = e.fontSize;
                                                        var n = {};
                                                        if (r && t) n.emToPx = q.lastEmToPx, n.percentToPxWidth = q.lastPercentToPxWidth, n.percentToPxHeight = q.lastPercentToPxHeight;
                                                        else {
                                                            var i = $ && $.isSVG ? B.createElementNS("http://www.w3.org/2000/svg", "rect") : B.createElement("div");
                                                            Y.init(i), e.myParent.appendChild(i), G.each(["overflow", "overflowX", "overflowY"], function(e, t) {
                                                                Y.CSS.setPropertyValue(i, t, "hidden")
                                                            }), Y.CSS.setPropertyValue(i, "position", e.position), Y.CSS.setPropertyValue(i, "fontSize", e.fontSize), Y.CSS.setPropertyValue(i, "boxSizing", "content-box"), G.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function(e, t) {
                                                                Y.CSS.setPropertyValue(i, t, "100%")
                                                            }), Y.CSS.setPropertyValue(i, "paddingLeft", "100em"), n.percentToPxWidth = q.lastPercentToPxWidth = (parseFloat(Q.getPropertyValue(i, "width", null, !0)) || 1) / 100, n.percentToPxHeight = q.lastPercentToPxHeight = (parseFloat(Q.getPropertyValue(i, "height", null, !0)) || 1) / 100, n.emToPx = q.lastEmToPx = (parseFloat(Q.getPropertyValue(i, "paddingLeft")) || 1) / 100, e.myParent.removeChild(i)
                                                        }
                                                        return null === q.remToPx && (q.remToPx = parseFloat(Q.getPropertyValue(B.body, "fontSize")) || 16), null === q.vwToPx && (q.vwToPx = parseFloat(D.innerWidth) / 100, q.vhToPx = parseFloat(D.innerHeight) / 100), n.remToPx = q.remToPx, n.vwToPx = q.vwToPx, n.vhToPx = q.vhToPx, 1 <= Y.debug && console.log("Unit ratios: " + JSON.stringify(n), N), n
                                                    }();
                                                    var A = /margin|padding|left|right|width|text|word|letter/i.test(e) || /X$/.test(e) || "x" === e ? "x" : "y";
                                                    switch (u) {
                                                        case "%":
                                                            s *= "x" === A ? L.percentToPxWidth : L.percentToPxHeight;
                                                            break;
                                                        case "px":
                                                            break;
                                                        default:
                                                            s *= L[u + "ToPx"]
                                                    }
                                                    switch (c) {
                                                        case "%":
                                                            s *= 1 / ("x" === A ? L.percentToPxWidth : L.percentToPxHeight);
                                                            break;
                                                        case "px":
                                                            break;
                                                        default:
                                                            s *= 1 / L[c + "ToPx"]
                                                    }
                                                }
                                            switch (f) {
                                                case "+":
                                                    o = s + o;
                                                    break;
                                                case "-":
                                                    o = s - o;
                                                    break;
                                                case "*":
                                                    o *= s;
                                                    break;
                                                case "/":
                                                    o = s / o
                                            }
                                            H[e] = {
                                                rootPropertyValue: i,
                                                startValue: s,
                                                currentValue: s,
                                                endValue: o,
                                                unitType: c,
                                                easing: a
                                            }, r && (H[e].pattern = r), Y.debug && console.log("tweensContainer (" + e + "): " + JSON.stringify(H[e]), N)
                                        } else Y.debug && console.log("Skipping [" + n + "] due to a lack of browser support.")
                                    };
                                    for (var g in E)
                                        if (E.hasOwnProperty(g)) {
                                            var h = Q.Names.camelCase(g),
                                                m = (t = E[g], o = i = n = r = void 0, U.isFunction(t) && (t = t.call(N, C, R)), U.isArray(t) ? (n = t[0], o = !U.isArray(t[1]) && /^[\d-]/.test(t[1]) || U.isFunction(t[1]) || Q.RegEx.isHex.test(t[1]) ? t[1] : U.isString(t[1]) && !Q.RegEx.isHex.test(t[1]) && Y.Easings[t[1]] || U.isArray(t[1]) ? (i = r ? t[1] : _(t[1], O.duration), t[2]) : t[1] || t[2]) : n = t, r || (i = i || O.easing), U.isFunction(n) && (n = n.call(N, C, R)), U.isFunction(o) && (o = o.call(N, C, R)), [n || 0, i, o]);
                                            if (0 <= Q.Lists.colors.indexOf(h)) {
                                                var v = m[0],
                                                    y = m[1],
                                                    b = m[2];
                                                if (Q.RegEx.isHex.test(v)) {
                                                    for (var w = ["Red", "Green", "Blue"], x = Q.Values.hexToRgb(v), S = b ? Q.Values.hexToRgb(b) : W, k = 0; k < w.length; k++) {
                                                        var P = [x[k]];
                                                        y && P.push(y), S !== W && P.push(S[k]), p(h + w[k], P)
                                                    }
                                                    continue
                                                }
                                            }
                                            p(h, m)
                                        }
                                    H.element = N
                                }
                                H.element && (Q.Values.addClass(N, "velocity-animating"), M.push(H), ($ = I(N)) && ("" === O.queue && ($.tweensContainer = H, $.opts = O), $.isAnimating = !0), j === R - 1 ? (Y.State.calls.push([M, T, O, null, F.resolver, null, 0]), !1 === Y.State.isTicking && (Y.State.isTicking = !0, X())) : j++)
                            }
                            var L, e, O = G.extend({}, Y.defaults, V),
                                H = {};
                            switch (I(N) === W && Y.init(N), parseFloat(O.delay) && !1 !== O.queue && G.queue(N, O.queue, function(e) {
                                Y.velocityQueueEntryFlag = !0;
                                var t = Y.State.delayedElements.count++;
                                Y.State.delayedElements[t] = N;
                                var r, n = (r = t, function() {
                                    Y.State.delayedElements[r] = !1, e()
                                });
                                I(N).delayBegin = (new Date).getTime(), I(N).delay = parseFloat(O.delay), I(N).delayTimer = {
                                    setTimeout: setTimeout(e, parseFloat(O.delay)),
                                    next: n
                                }
                            }), O.duration.toString().toLowerCase()) {
                                case "fast":
                                    O.duration = 200;
                                    break;
                                case "normal":
                                    O.duration = 400;
                                    break;
                                case "slow":
                                    O.duration = 600;
                                    break;
                                default:
                                    O.duration = parseFloat(O.duration) || 1
                            }
                            if (!1 !== Y.mock && (!0 === Y.mock ? O.duration = O.delay = 1 : (O.duration *= parseFloat(Y.mock) || 1, O.delay *= parseFloat(Y.mock) || 1)), O.easing = _(O.easing, O.duration), O.begin && !U.isFunction(O.begin) && (O.begin = null), O.progress && !U.isFunction(O.progress) && (O.progress = null), O.complete && !U.isFunction(O.complete) && (O.complete = null), O.display !== W && null !== O.display && (O.display = O.display.toString().toLowerCase(), "auto" === O.display && (O.display = Y.CSS.Values.getDisplayType(N))), O.visibility !== W && null !== O.visibility && (O.visibility = O.visibility.toString().toLowerCase()), O.mobileHA = O.mobileHA && Y.State.isMobile && !Y.State.isGingerbread, !1 === O.queue)
                                if (O.delay) {
                                    var t = Y.State.delayedElements.count++;
                                    Y.State.delayedElements[t] = N;
                                    var n = (e = t, function() {
                                        Y.State.delayedElements[e] = !1, r()
                                    });
                                    I(N).delayBegin = (new Date).getTime(), I(N).delay = parseFloat(O.delay), I(N).delayTimer = {
                                        setTimeout: setTimeout(r, parseFloat(O.delay)),
                                        next: n
                                    }
                                } else r();
                            else G.queue(N, O.queue, function(e, t) {
                                return !0 === t ? (F.promise && F.resolver(T), !0) : (Y.velocityQueueEntryFlag = !0, void r())
                            });
                            "" !== O.queue && "fx" !== O.queue || "inprogress" === G.queue(N)[0] || G.dequeue(N)
                        }(t, e)
                    }), (r = G.extend({}, Y.defaults, V)).loop = parseInt(r.loop, 10);
                    var d = 2 * r.loop - 1;
                    if (r.loop)
                        for (var p = 0; p < d; p++) {
                            var g = {
                                delay: r.delay,
                                progress: r.progress
                            };
                            p === d - 1 && (g.display = r.display, g.visibility = r.visibility, g.complete = r.complete), y(T, "reverse", g)
                        }
                    return e()
                }
                F.promise && (E && V && !1 === V.promiseRejectEmpty ? F.resolver() : F.rejecter())
            };
            (Y = G.extend(y, Y)).animate = y;
            var F = D.requestAnimationFrame || t;
            if (!Y.State.isMobile && B.hidden !== W) {
                var s = function() {
                    B.hidden ? (F = function(e) {
                        return setTimeout(function() {
                            e(!0)
                        }, 16)
                    }, X()) : F = D.requestAnimationFrame || t
                };
                s(), B.addEventListener("visibilitychange", s)
            }
            return e.Velocity = Y, e !== D && (e.fn.velocity = y, e.fn.velocity.defaults = Y.defaults), G.each(["Down", "Up"], function(e, f) {
                Y.Redirects["slide" + f] = function(r, e, n, t, i, o) {
                    var a = G.extend({}, e),
                        s = a.begin,
                        l = a.complete,
                        c = {},
                        u = {
                            height: "",
                            marginTop: "",
                            marginBottom: "",
                            paddingTop: "",
                            paddingBottom: ""
                        };
                    a.display === W && (a.display = "Down" === f ? "inline" === Y.CSS.Values.getDisplayType(r) ? "inline-block" : "block" : "none"), a.begin = function() {
                        for (var e in 0 === n && s && s.call(i, i), u)
                            if (u.hasOwnProperty(e)) {
                                c[e] = r.style[e];
                                var t = Q.getPropertyValue(r, e);
                                u[e] = "Down" === f ? [t, 0] : [0, t]
                            }
                        c.overflow = r.style.overflow, r.style.overflow = "hidden"
                    }, a.complete = function() {
                        for (var e in c) c.hasOwnProperty(e) && (r.style[e] = c[e]);
                        n === t - 1 && (l && l.call(i, i), o && o.resolver(i))
                    }, Y(r, u, a)
                }
            }), G.each(["In", "Out"], function(e, c) {
                Y.Redirects["fade" + c] = function(e, t, r, n, i, o) {
                    var a = G.extend({}, t),
                        s = a.complete,
                        l = {
                            opacity: "In" === c ? 1 : 0
                        };
                    0 !== r && (a.begin = null), a.complete = r !== n - 1 ? null : function() {
                        s && s.call(i, i), o && o.resolver(i)
                    }, a.display === W && (a.display = "In" === c ? "auto" : "none"), Y(this, l, a)
                }
            }), Y
        }
        jQuery.fn.velocity = jQuery.fn.animate
    }(window.jQuery || window.Zepto || window, window, window ? window.document : void 0)
}),
function(e, t) {
    "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t() : e.ScrollMagic = t()
}(this, function() {
    "use strict";
    var z = function() {};
    z.version = "2.0.5", window.addEventListener("mousewheel", function() {});
    var N = "data-scrollmagic-pin-spacer";
    z.Controller = function(e) {
        var r, n, i = "REVERSE",
            t = k.defaults,
            a = this,
            s = O.extend({}, t, e),
            o = [],
            l = !1,
            c = 0,
            u = "PAUSED",
            f = !0,
            d = 0,
            p = !0,
            g = function() {
                0 < s.refreshInterval && (n = window.setTimeout(x, s.refreshInterval))
            },
            h = function() {
                return s.vertical ? O.get.scrollTop(s.container) : O.get.scrollLeft(s.container)
            },
            m = function() {
                return s.vertical ? O.get.height(s.container) : O.get.width(s.container)
            },
            v = this._setScrollPos = function(e) {
                s.vertical ? f ? window.scrollTo(O.get.scrollLeft(), e) : s.container.scrollTop = e : f ? window.scrollTo(e, O.get.scrollTop()) : s.container.scrollLeft = e
            },
            y = function() {
                if (p && l) {
                    var e = O.type.Array(l) ? l : o.slice(0);
                    l = !1;
                    var t = c,
                        r = (c = a.scrollPos()) - t;
                    0 !== r && (u = 0 < r ? "FORWARD" : i), u === i && e.reverse(), e.forEach(function(e) {
                        e.update(!0)
                    })
                }
            },
            b = function() {
                r = O.rAF(y)
            },
            w = function(e) {
                "resize" == e.type && (d = m(), u = "PAUSED"), !0 !== l && (l = !0, b())
            },
            x = function() {
                if (!f && d != m()) {
                    var t;
                    try {
                        t = new Event("resize", {
                            bubbles: !1,
                            cancelable: !1
                        })
                    } catch (e) {
                        (t = document.createEvent("Event")).initEvent("resize", !1, !1)
                    }
                    s.container.dispatchEvent(t)
                }
                o.forEach(function(e) {
                    e.refresh()
                }), g()
            };
        this._options = s;
        var S = function(e) {
            if (e.length <= 1) return e;
            var t = e.slice(0);
            return t.sort(function(e, t) {
                return e.scrollOffset() > t.scrollOffset() ? 1 : -1
            }), t
        };
        return this.addScene = function(e) {
                if (O.type.Array(e)) e.forEach(function(e) {
                    a.addScene(e)
                });
                else if (e instanceof z.Scene)
                    if (e.controller() !== a) e.addTo(a);
                    else if (o.indexOf(e) < 0)
                    for (var t in o.push(e), o = S(o), e.on("shift.controller_sort", function() {
                            o = S(o)
                        }), s.globalSceneOptions) e[t] && e[t].call(e, s.globalSceneOptions[t]);
                return a
            }, this.removeScene = function(e) {
                if (O.type.Array(e)) e.forEach(function(e) {
                    a.removeScene(e)
                });
                else {
                    var t = o.indexOf(e); - 1 < t && (e.off("shift.controller_sort"), o.splice(t, 1), e.remove())
                }
                return a
            }, this.updateScene = function(e, t) {
                return O.type.Array(e) ? e.forEach(function(e) {
                    a.updateScene(e, t)
                }) : t ? e.update(!0) : !0 !== l && e instanceof z.Scene && (-1 == (l = l || []).indexOf(e) && l.push(e), l = S(l), b()), a
            }, this.update = function(e) {
                return w({
                    type: "resize"
                }), e && y(), a
            }, this.scrollTo = function(e, t) {
                if (O.type.Number(e)) v.call(s.container, e, t);
                else if (e instanceof z.Scene) e.controller() === a && a.scrollTo(e.scrollOffset(), t);
                else if (O.type.Function(e)) v = e;
                else {
                    var r = O.get.elements(e)[0];
                    if (r) {
                        for (; r.parentNode.hasAttribute(N);) r = r.parentNode;
                        var n = s.vertical ? "top" : "left",
                            i = O.get.offset(s.container),
                            o = O.get.offset(r);
                        f || (i[n] -= a.scrollPos()), a.scrollTo(o[n] - i[n], t)
                    }
                }
                return a
            }, this.scrollPos = function(e) {
                return arguments.length ? (O.type.Function(e) && (h = e), a) : h.call(a)
            }, this.info = function(e) {
                var t = {
                    size: d,
                    vertical: s.vertical,

                    scrollDirection: u,
                    container: s.container,
                    isDocument: f
                };
                return arguments.length ? void 0 !== t[e] ? t[e] : void 0 : t
            }, this.loglevel = function() {
                return a
            }, this.enabled = function(e) {
                return arguments.length ? (p != e && (p = !!e, a.updateScene(o, !0)), a) : p
            }, this.destroy = function(e) {
                window.clearTimeout(n);
                for (var t = o.length; t--;) o[t].destroy(e);
                return s.container.removeEventListener("resize", w), s.container.removeEventListener("scroll", w), O.cAF(r), null
            },
            function() {
                for (var e in s) t.hasOwnProperty(e) || delete s[e];
                if (s.container = O.get.elements(s.container)[0], !s.container) throw "ScrollMagic.Controller init failed.";
                (f = s.container === window || s.container === document.body || !document.body.contains(s.container)) && (s.container = window), d = m(), s.container.addEventListener("resize", w), s.container.addEventListener("scroll", w), s.refreshInterval = parseInt(s.refreshInterval) || t.refreshInterval, g()
            }(), a
    };
    var k = {
        defaults: {
            container: window,
            vertical: !0,
            globalSceneOptions: {},
            loglevel: 2,
            refreshInterval: 100
        }
    };
    z.Controller.addOption = function(e, t) {
        k.defaults[e] = t
    }, z.Controller.extend = function(e) {
        var t = this;
        z.Controller = function() {
            return t.apply(this, arguments), this.$super = O.extend({}, this), e.apply(this, arguments) || this
        }, O.extend(z.Controller, t), z.Controller.prototype = t.prototype, z.Controller.prototype.constructor = z.Controller
    }, z.Scene = function(e) {
        var r, l, c = "BEFORE",
            u = "DURING",
            f = "AFTER",
            n = L.defaults,
            d = this,
            p = O.extend({}, n, e),
            g = c,
            h = 0,
            s = {
                start: 0,
                end: 0
            },
            m = 0,
            i = !0,
            a = {};
        this.on = function(e, i) {
            return O.type.Function(i) && (e = e.trim().split(" ")).forEach(function(e) {
                var t = e.split("."),
                    r = t[0],
                    n = t[1];
                "*" != r && (a[r] || (a[r] = []), a[r].push({
                    namespace: n || "",
                    callback: i
                }))
            }), d
        }, this.off = function(e, o) {
            return e && (e = e.trim().split(" ")).forEach(function(e) {
                var t = e.split("."),
                    r = t[0],
                    i = t[1] || "";
                ("*" === r ? Object.keys(a) : [r]).forEach(function(e) {
                    for (var t = a[e] || [], r = t.length; r--;) {
                        var n = t[r];
                        !n || i !== n.namespace && "*" !== i || o && o != n.callback || t.splice(r, 1)
                    }
                    t.length || delete a[e]
                })
            }), d
        }, this.trigger = function(e, t) {
            if (e) {
                var r = e.trim().split("."),
                    n = r[0],
                    i = r[1],
                    o = a[n];
                o && o.forEach(function(e) {
                    i && i !== e.namespace || e.callback.call(d, new z.Event(n, e.namespace, d, t))
                })
            }
            return d
        }, d.on("change.internal", function(e) {
            "loglevel" !== e.what && "tweenChanges" !== e.what && ("triggerElement" === e.what ? b() : "reverse" === e.what && d.update())
        }).on("shift.internal", function() {
            t(), d.update()
        }), this.addTo = function(e) {
            return e instanceof z.Controller && l != e && (l && l.removeScene(d), l = e, S(), o(!0), b(!0), t(), l.info("container").addEventListener("resize", w), e.addScene(d), d.trigger("add", {
                controller: l
            }), d.update()), d
        }, this.enabled = function(e) {
            return arguments.length ? (i != e && (i = !!e, d.update(!0)), d) : i
        }, this.remove = function() {
            if (l) {
                l.info("container").removeEventListener("resize", w);
                var e = l;
                l = void 0, e.removeScene(d), d.trigger("remove")
            }
            return d
        }, this.destroy = function(e) {
            return d.trigger("destroy", {
                reset: e
            }), d.remove(), d.off("*.*"), null
        }, this.update = function(e) {
            if (l)
                if (e)
                    if (l.enabled() && i) {
                        var t, r = l.info("scrollPos");
                        t = 0 < p.duration ? (r - s.start) / (s.end - s.start) : r >= s.start ? 1 : 0, d.trigger("update", {
                            startPos: s.start,
                            endPos: s.end,
                            scrollPos: r
                        }), d.progress(t)
                    } else v && g === u && C(!0);
            else l.updateScene(d, !1);
            return d
        }, this.refresh = function() {
            return o(), b(), d
        }, this.progress = function(e) {
            if (arguments.length) {
                var t = !1,
                    r = g,
                    n = l ? l.info("scrollDirection") : "PAUSED",
                    i = p.reverse || h <= e;
                if (0 === p.duration ? (t = h != e, g = 0 === (h = e < 1 && i ? 0 : 1) ? c : u) : e < 0 && g !== c && i ? (g = c, t = !(h = 0)) : 0 <= e && e < 1 && i ? (h = e, g = u, t = !0) : 1 <= e && g !== f ? (h = 1, g = f, t = !0) : g !== u || i || C(), t) {
                    var o = {
                            progress: h,
                            state: g,
                            scrollDirection: n
                        },
                        a = g != r,
                        s = function(e) {
                            d.trigger(e, o)
                        };
                    a && r !== u && (s("enter"), s(r === c ? "start" : "end")), s("progress"), a && g !== u && (s(g === c ? "start" : "end"), s("leave"))
                }
                return d
            }
            return h
        };
        var v, y, t = function() {
                s = {
                    start: m + p.offset
                }, l && p.triggerElement && (s.start -= l.info("size") * p.triggerHook), s.end = s.start + p.duration
            },
            o = function(e) {
                if (r) {
                    var t = "duration";
                    k(t, r.call(d)) && !e && (d.trigger("change", {
                        what: t,
                        newval: p[t]
                    }), d.trigger("shift", {
                        reason: t
                    }))
                }
            },
            b = function(e) {
                var t = 0,
                    r = p.triggerElement;
                if (l && r) {
                    for (var n = l.info(), i = O.get.offset(n.container), o = n.vertical ? "top" : "left"; r.parentNode.hasAttribute(N);) r = r.parentNode;
                    var a = O.get.offset(r);
                    n.isDocument || (i[o] -= l.scrollPos()), t = a[o] - i[o]
                }
                var s = t != m;
                m = t, s && !e && d.trigger("shift", {
                    reason: "triggerElementPosition"
                })
            },
            w = function() {
                0 < p.triggerHook && d.trigger("shift", {
                    reason: "containerResize"
                })
            },
            x = O.extend(L.validate, {
                duration: function(e) {
                    if (O.type.String(e) && e.match(/^(\.|\d)*\d+%$/)) {
                        var t = parseFloat(e) / 100;
                        e = function() {
                            return l ? l.info("size") * t : 0
                        }
                    }
                    if (O.type.Function(e)) {
                        r = e;
                        try {
                            e = parseFloat(r())
                        } catch (t) {
                            e = -1
                        }
                    }
                    if (e = parseFloat(e), !O.type.Number(e) || e < 0) throw r && (r = void 0), 0;
                    return e
                }
            }),
            S = function(e) {
                (e = arguments.length ? [e] : Object.keys(x)).forEach(function(t) {
                    var r;
                    if (x[t]) try {
                        r = x[t](p[t])
                    } catch (e) {
                        r = n[t]
                    } finally {
                        p[t] = r
                    }
                })
            },
            k = function(e, t) {
                var r = !1,
                    n = p[e];
                return p[e] != t && (p[e] = t, S(e), r = n != p[e]), r
            },
            P = function(t) {
                d[t] || (d[t] = function(e) {
                    return arguments.length ? ("duration" === t && (r = void 0), k(t, e) && (d.trigger("change", {
                        what: t,
                        newval: p[t]
                    }), -1 < L.shifts.indexOf(t) && d.trigger("shift", {
                        reason: t
                    })), d) : p[t]
                })
            };
        this.controller = function() {
            return l
        }, this.state = function() {
            return g
        }, this.scrollOffset = function() {
            return s.start
        }, this.triggerPosition = function() {
            var e = p.offset;
            return l && (e += p.triggerElement ? m : l.info("size") * d.triggerHook()), e
        }, d.on("shift.internal", function(e) {
            var t = "duration" === e.reason;
            (g === f && t || g === u && 0 === p.duration) && C(), t && T()
        }).on("progress.internal", function() {
            C()
        }).on("add.internal", function() {
            T()
        }).on("destroy.internal", function(e) {
            d.removePin(e.reset)
        });
        var C = function(e) {
                if (v && l) {
                    var t = l.info(),
                        r = y.spacer.firstChild;
                    if (e || g !== u) {
                        var n = {
                                position: y.inFlow ? "relative" : "absolute",
                                top: 0,
                                left: 0
                            },
                            i = O.css(r, "position") != n.position;
                        y.pushFollowers ? 0 < p.duration && (g === f && 0 === parseFloat(O.css(y.spacer, "padding-top")) ? i = !0 : g === c && 0 === parseFloat(O.css(y.spacer, "padding-bottom")) && (i = !0)) : n[t.vertical ? "top" : "left"] = p.duration * h, O.css(r, n), i && T()
                    } else {
                        "fixed" != O.css(r, "position") && (O.css(r, {
                            position: "fixed"
                        }), T());
                        var o = O.get.offset(y.spacer, !0),
                            a = p.reverse || 0 === p.duration ? t.scrollPos - s.start : Math.round(h * p.duration * 10) / 10;
                        o[t.vertical ? "top" : "left"] += a, O.css(y.spacer.firstChild, {
                            top: o.top,
                            left: o.left
                        })
                    }
                }
            },
            T = function() {
                if (v && l && y.inFlow) {
                    var e = g === u,
                        t = l.info("vertical"),
                        r = y.spacer.firstChild,
                        n = O.isMarginCollapseType(O.css(y.spacer, "display")),
                        i = {};
                    y.relSize.width || y.relSize.autoFullWidth ? e ? O.css(v, {
                        width: O.get.width(y.spacer)
                    }) : O.css(v, {
                        width: "100%"
                    }) : (i["min-width"] = O.get.width(t ? v : r, !0, !0), i.width = e ? i["min-width"] : "auto"), y.relSize.height ? e ? O.css(v, {
                        height: O.get.height(y.spacer) - (y.pushFollowers ? p.duration : 0)
                    }) : O.css(v, {
                        height: "100%"
                    }) : (i["min-height"] = O.get.height(t ? r : v, !0, !n), i.height = e ? i["min-height"] : "auto"), y.pushFollowers && (i["padding" + (t ? "Top" : "Left")] = p.duration * h, i["padding" + (t ? "Bottom" : "Right")] = p.duration * (1 - h)), O.css(y.spacer, i)
                }
            },
            E = function() {
                l && v && g === u && !l.info("isDocument") && C()
            },
            V = function() {
                l && v && g === u && ((y.relSize.width || y.relSize.autoFullWidth) && O.get.width(window) != O.get.width(y.spacer.parentNode) || y.relSize.height && O.get.height(window) != O.get.height(y.spacer.parentNode)) && T()
            },
            F = function(e) {
                l && v && g === u && !l.info("isDocument") && (e.preventDefault(), l._setScrollPos(l.info("scrollPos") - ((e.wheelDelta || e[l.info("vertical") ? "wheelDeltaY" : "wheelDeltaX"]) / 3 || 30 * -e.detail)))
            };
        this.setPin = function(e, t) {
            if (t = O.extend({}, {
                    pushFollowers: !0,
                    spacerClass: "scrollmagic-pin-spacer"
                }, t), !(e = O.get.elements(e)[0])) return d;
            if ("fixed" === O.css(e, "position")) return d;
            if (v) {
                if (v === e) return d;
                d.removePin()
            }
            var r = (v = e).parentNode.style.display,
                n = ["top", "left", "bottom", "right", "margin", "marginLeft", "marginRight", "marginTop", "marginBottom"];
            v.parentNode.style.display = "none";
            var i = "absolute" != O.css(v, "position"),
                o = O.css(v, n.concat(["display"])),
                a = O.css(v, ["width", "height"]);
            v.parentNode.style.display = r, !i && t.pushFollowers && (t.pushFollowers = !1);
            var s = v.parentNode.insertBefore(document.createElement("div"), v),
                l = O.extend(o, {
                    position: i ? "relative" : "absolute",
                    boxSizing: "content-box",
                    mozBoxSizing: "content-box",
                    webkitBoxSizing: "content-box"
                });
            if (i || O.extend(l, O.css(v, ["width", "height"])), O.css(s, l), s.setAttribute(N, ""), O.addClass(s, t.spacerClass), y = {
                    spacer: s,
                    relSize: {
                        width: "%" === a.width.slice(-1),
                        height: "%" === a.height.slice(-1),
                        autoFullWidth: "auto" === a.width && i && O.isMarginCollapseType(o.display)
                    },
                    pushFollowers: t.pushFollowers,
                    inFlow: i
                }, !v.___origStyle) {
                v.___origStyle = {};
                var c = v.style;
                n.concat(["width", "height", "position", "boxSizing", "mozBoxSizing", "webkitBoxSizing"]).forEach(function(e) {
                    v.___origStyle[e] = c[e] || ""
                })
            }
            return y.relSize.width && O.css(s, {
                width: a.width
            }), y.relSize.height && O.css(s, {
                height: a.height
            }), s.appendChild(v), O.css(v, {
                position: i ? "relative" : "absolute",
                margin: "auto",
                top: "auto",
                left: "auto",
                bottom: "auto",
                right: "auto"
            }), (y.relSize.width || y.relSize.autoFullWidth) && O.css(v, {
                boxSizing: "border-box",
                mozBoxSizing: "border-box",
                webkitBoxSizing: "border-box"
            }), window.addEventListener("scroll", E), window.addEventListener("resize", E), window.addEventListener("resize", V), v.addEventListener("mousewheel", F), v.addEventListener("DOMMouseScroll", F), C(), d
        }, this.removePin = function(e) {
            if (v) {
                if (g === u && C(!0), e || !l) {
                    var t = y.spacer.firstChild;
                    if (t.hasAttribute(N)) {
                        var r = y.spacer.style;
                        margins = {}, ["margin", "marginLeft", "marginRight", "marginTop", "marginBottom"].forEach(function(e) {
                            margins[e] = r[e] || ""
                        }), O.css(t, margins)
                    }
                    y.spacer.parentNode.insertBefore(t, y.spacer), y.spacer.parentNode.removeChild(y.spacer), v.parentNode.hasAttribute(N) || (O.css(v, v.___origStyle), delete v.___origStyle)
                }
                window.removeEventListener("scroll", E), window.removeEventListener("resize", E), window.removeEventListener("resize", V), v.removeEventListener("mousewheel", F), v.removeEventListener("DOMMouseScroll", F), v = void 0
            }
            return d
        };
        var A, $ = [];
        return d.on("destroy.internal", function(e) {
                d.removeClassToggle(e.reset)
            }), this.setClassToggle = function(e, t) {
                var r = O.get.elements(e);
                return 0 !== r.length && O.type.String(t) && (0 < $.length && d.removeClassToggle(), A = t, $ = r, d.on("enter.internal_class leave.internal_class", function(e) {
                    var t = "enter" === e.type ? O.addClass : O.removeClass;
                    $.forEach(function(e) {
                        t(e, A)
                    })
                })), d
            }, this.removeClassToggle = function(e) {
                return e && $.forEach(function(e) {
                    O.removeClass(e, A)
                }), d.off("start.internal_class end.internal_class"), A = void 0, $ = [], d
            },
            function() {
                for (var e in p) n.hasOwnProperty(e) || delete p[e];
                for (var t in n) P(t);
                S()
            }(), d
    };
    var L = {
        defaults: {
            duration: 0,
            offset: 0,
            triggerElement: void 0,
            triggerHook: .5,
            reverse: !0,
            loglevel: 2
        },
        validate: {
            offset: function(e) {
                if (e = parseFloat(e), !O.type.Number(e)) throw 0;
                return e
            },
            triggerElement: function(e) {
                if (e = e || void 0) {
                    var t = O.get.elements(e)[0];
                    if (!t) throw 0;
                    e = t
                }
                return e
            },
            triggerHook: function(e) {
                var t = {
                    onCenter: .5,
                    onEnter: 1,
                    onLeave: 0
                };
                if (O.type.Number(e)) e = Math.max(0, Math.min(parseFloat(e), 1));
                else {
                    if (!(e in t)) throw 0;
                    e = t[e]
                }
                return e
            },
            reverse: function(e) {
                return !!e
            }
        },
        shifts: ["duration", "offset", "triggerHook"]
    };
    z.Scene.addOption = function(e, t, r, n) {
        e in L.defaults || (L.defaults[e] = t, L.validate[e] = r, n && L.shifts.push(e))
    }, z.Scene.extend = function(e) {
        var t = this;
        z.Scene = function() {
            return t.apply(this, arguments), this.$super = O.extend({}, this), e.apply(this, arguments) || this
        }, O.extend(z.Scene, t), z.Scene.prototype = t.prototype, z.Scene.prototype.constructor = z.Scene
    }, z.Event = function(e, t, r, n) {
        for (var i in n = n || {}) this[i] = n[i];
        return this.type = e, this.target = this.currentTarget = r, this.namespace = t || "", this.timeStamp = this.timestamp = Date.now(), this
    };
    var O = z._util = function(a) {
        var r, e = {},
            s = function(e) {
                return parseFloat(e) || 0
            },
            l = function(e) {
                return e.currentStyle ? e.currentStyle : a.getComputedStyle(e)
            },
            n = function(e, t, r, n) {
                if ((t = t === document ? a : t) === a) n = !1;
                else if (!f.DomElement(t)) return 0;
                e = e.charAt(0).toUpperCase() + e.substr(1).toLowerCase();
                var i = (r ? t["offset" + e] || t["outer" + e] : t["client" + e] || t["inner" + e]) || 0;
                if (r && n) {
                    var o = l(t);
                    i += "Height" === e ? s(o.marginTop) + s(o.marginBottom) : s(o.marginLeft) + s(o.marginRight)
                }
                return i
            },
            c = function(e) {
                return e.replace(/^[^a-z]+([a-z])/g, "$1").replace(/-([a-z])/g, function(e) {
                    return e[1].toUpperCase()
                })
            };
        e.extend = function(e) {
            for (e = e || {}, r = 1; r < arguments.length; r++)
                if (arguments[r])
                    for (var t in arguments[r]) arguments[r].hasOwnProperty(t) && (e[t] = arguments[r][t]);
            return e
        }, e.isMarginCollapseType = function(e) {
            return -1 < ["block", "flex", "list-item", "table", "-webkit-box"].indexOf(e)
        };
        var i = 0,
            t = ["ms", "moz", "webkit", "o"],
            o = a.requestAnimationFrame,
            u = a.cancelAnimationFrame;
        for (r = 0; !o && r < t.length; ++r) o = a[t[r] + "RequestAnimationFrame"], u = a[t[r] + "CancelAnimationFrame"] || a[t[r] + "CancelRequestAnimationFrame"];
        o || (o = function(e) {
            var t = (new Date).getTime(),
                r = Math.max(0, 16 - (t - i)),
                n = a.setTimeout(function() {
                    e(t + r)
                }, r);
            return i = t + r, n
        }), u || (u = function(e) {
            a.clearTimeout(e)
        }), e.rAF = o.bind(a), e.cAF = u.bind(a);
        var f = e.type = function(e) {
            return Object.prototype.toString.call(e).replace(/^\[object (.+)\]$/, "$1").toLowerCase()
        };
        f.String = function(e) {
            return "string" === f(e)
        }, f.Function = function(e) {
            return "function" === f(e)
        }, f.Array = function(e) {
            return Array.isArray(e)
        }, f.Number = function(e) {
            return !f.Array(e) && 0 <= e - parseFloat(e) + 1
        }, f.DomElement = function(e) {
            return "object" == typeof HTMLElement ? e instanceof HTMLElement : e && "object" == typeof e && null !== e && 1 === e.nodeType && "string" == typeof e.nodeName
        };
        var d = e.get = {};
        return d.elements = function(e) {
            var t = [];
            if (f.String(e)) try {
                e = document.querySelectorAll(e)
            } catch (e) {
                return t
            }
            if ("nodelist" === f(e) || f.Array(e))
                for (var r = 0, n = t.length = e.length; r < n; r++) {
                    var i = e[r];
                    t[r] = f.DomElement(i) ? i : d.elements(i)
                } else(f.DomElement(e) || e === document || e === a) && (t = [e]);
            return t
        }, d.scrollTop = function(e) {
            return e && "number" == typeof e.scrollTop ? e.scrollTop : a.pageYOffset || 0
        }, d.scrollLeft = function(e) {
            return e && "number" == typeof e.scrollLeft ? e.scrollLeft : a.pageXOffset || 0
        }, d.width = function(e, t, r) {
            return n("width", e, t, r)
        }, d.height = function(e, t, r) {
            return n("height", e, t, r)
        }, d.offset = function(e, t) {
            var r = {
                top: 0,
                left: 0
            };
            if (e && e.getBoundingClientRect) {
                var n = e.getBoundingClientRect();
                r.top = n.top, r.left = n.left, t || (r.top += d.scrollTop(), r.left += d.scrollLeft())
            }
            return r
        }, e.addClass = function(e, t) {
            t && (e.classList ? e.classList.add(t) : e.className += " " + t)
        }, e.removeClass = function(e, t) {
            t && (e.classList ? e.classList.remove(t) : e.className = e.className.replace(RegExp("(^|\\b)" + t.split(" ").join("|") + "(\\b|$)", "gi"), " "))
        }, e.css = function(e, t) {
            if (f.String(t)) return l(e)[c(t)];
            if (f.Array(t)) {
                var r = {},
                    n = l(e);
                return t.forEach(function(e) {
                    r[e] = n[c(e)]
                }), r
            }
            for (var i in t) {
                var o = t[i];
                o == parseFloat(o) && (o += "px"), e.style[c(i)] = o
            }
        }, e
    }(window || {});
    return z
}),
function() {
    var e, r;
    r = window.jQuery, window, r.fn.autogrow = function(u) {
        if (null == u && (u = {}), null == u.horizontal && (u.horizontal = !0), null == u.vertical && (u.vertical = !0), null == u.debugx && (u.debugx = -1e4), null == u.debugy && (u.debugy = -1e4), null == u.debugcolor && (u.debugcolor = "yellow"), null == u.flickering && (u.flickering = !0), null == u.postGrowCallback && (u.postGrowCallback = function() {}), null == u.verticalScrollbarWidth && (u.verticalScrollbarWidth = e()), !1 !== u.horizontal || !1 !== u.vertical) return this.filter("textarea").each(function() {
            var i, o, e, a, s, l, t, c;
            if (!(i = r(this)).data("autogrow-enabled")) return i.data("autogrow-enabled"), s = i.height(), l = i.width(), a = 1 * i.css("lineHeight") || 0, i.hasVerticalScrollBar = function() {
                return i[0].clientHeight < i[0].scrollHeight
            }, o = r('<div class="autogrow-shadow"></div>').css({
                position: "absolute",
                display: "inline-block",
                "background-color": u.debugcolor,
                top: u.debugy,
                left: u.debugx,
                "max-width": i.css("max-width"),
                padding: i.css("padding"),
                fontSize: i.css("fontSize"),
                fontFamily: i.css("fontFamily"),
                fontWeight: i.css("fontWeight"),
                lineHeight: i.css("lineHeight"),
                resize: "none",
                "word-wrap": "break-word"
            }).appendTo(document.body), !1 === u.horizontal ? o.css({
                width: i.width()
            }) : (e = i.css("font-size"), o.css("padding-right", "+=" + e), o.normalPaddingRight = o.css("padding-right")), c = this, t = function(e) {
                var t, r, n;
                return r = c.value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n /g, "<br/>&nbsp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/\n$/, "<br/>&nbsp;").replace(/\n/g, "<br/>").replace(/ {2,}/g, function(e) {
                    return Array(e.length - 1).join("&nbsp;") + " "
                }), /(\n|\r)/.test(c.value) && (r += "<br />", !1 === u.flickering && (r += "<br />")), o.html(r), !0 === u.vertical && (t = Math.max(o.height() + a, s), i.height(t)), !0 === u.horizontal && (o.css("padding-right", o.normalPaddingRight), !1 === u.vertical && i.hasVerticalScrollBar() && o.css("padding-right", "+=" + u.verticalScrollbarWidth + "px"), n = Math.max(o.outerWidth(), l), i.width(n)), u.postGrowCallback(i)
            }, i.change(t).keyup(t).keydown(t), t()
        })
    }, e = function() {
        var e, t, r, n;
        return (e = document.createElement("p")).style.width = "100%", e.style.height = "200px", (t = document.createElement("div")).style.position = "absolute", t.style.top = "0px", t.style.left = "0px", t.style.visibility = "hidden", t.style.width = "200px", t.style.height = "150px", t.style.overflow = "hidden", t.appendChild(e), document.body.appendChild(t), r = e.offsetWidth, t.style.overflow = "scroll", r === (n = e.offsetWidth) && (n = t.clientWidth), document.body.removeChild(t), r - n
    }
}.call(this), $(function() {
    $.fn.active = function() {
        var e = $(this);
        return e.addClass("active").siblings().removeClass("active"), e
    }, $.fn.fallback = function(e) {
        return this.length ? this : e || !1
    }, $.fn.gradient = function(e, t) {
        return $(this).css({
            "background-image": "linear-gradient(-123deg, #" + e + " 0%, #" + t + " 89%)"
        })
    }, $.fn.preload = function() {
        return $(this).addClass("lazypreload")
    }, ScrollMagic._util.get.elements = function(e) {
        return $(e).toArray()
    }, ScrollMagic._util.addClass = function(e, t) {
        $(e).addClass(t)
    }, ScrollMagic._util.removeClass = function(e, t) {
        $(e).removeClass(t)
    };
    var i, o, a, s, l, c, u, f, d, p = new ScrollMagic.Controller,
        e = $("main"),
        g = $(".slice"),
        h = [],
        m = [],
        v = {},
        t = $("#cc"),
        r = $(".cc-accept"),
        y = {
            home: function() {
                b(), $(".features-tabs").each(function() {
                    var a, s = $(this),
                        l = s.parents(".features"),
                        c = l.find(".features-loader"),
                        u = l.find(".features-progress"),
                        f = !1;
                    s.find("a").click(function(e) {
                        var t = $(this),
                            r = t.parent(),
                            n = t.data("page"),
                            i = l.find(".visual-" + n),
                            o = l.find(".features-visual").find(".image-wrap:visible");
                        i.find("img").preload(), r.hasClass("active") || f || (f = !0, r.active(), o.velocity("fadeOut"), c.gradient(t.data("start"), t.data("stop")), u.velocity({
                            width: 0
                        }, 500, function() {
                            u.velocity({
                                width: "100%"
                            }, 500, function() {
                                c.gradient("000", "000")
                            }), i.velocity("fadeIn"), f = !1
                        }), $(".logo-" + n + ", .description-" + n).active(), $(".name-" + n).active(), clearTimeout(a), a = setTimeout(function() {
                            var e = s.find(".active").next();
                            e.length || (e = s.find("li").first()), e.find("a").trigger("click")
                        }, 8e3)), e.preventDefault()
                    }).eq(0).trigger("click")
                });
                $(".previews-nav").each(function() {
                    var e = $(this),
                        a = !1;
                    e.find("a").click(function(e) {
                        var t = $(this),
                            r = t.parent(),
                            n = t.parents(".previews").find(".previews-loader"),
                            i = t.data("page"),
                            o = $(".visual-" + i).preload();
                        r.hasClass("active") || a || (a = !0, r.active(), $(".logo-" + i + ", .description-" + i).active(), n.gradient(t.data("start"), t.data("stop")).velocity({
                            width: "100%"
                        }, 500, function() {
                            o.active(), n.velocity({
                                width: 0
                            }, 500), a = !1
                        })), e.preventDefault()
                    }), new ScrollMagic.Scene({
                        triggerElement: e
                    }).on("enter", function() {
                        e.find(".active").length || e.find("a").eq(0).trigger("click")
                    }).addTo(p)
                });
                n()
            },
            work: function() {
                if ("work" == a) {
                    var e = $(document.createElement("div")).html(f);
                    $(".pages-list").html(e.find(".pages-list").html()), e.remove()
                } else b();
                s ? ($(".nav-filter-" + s).active(), $(".nav-filter-all").show()) : $(".nav-filter-all").active().hide(), w(d = n), d()
            },
            project: function() {
                $(".site-menu-work").active(), b(), $(".section-tabs").each(function() {
                    var i, o = $(this).find("ul"),
                        a = o.parents("section"),
                        s = !1;
                    o.find("a").click(function(e) {
                        var t = $(this),
                            r = t.parent(),
                            n = t.data("file"),
                            i = a.find(".picture-" + n),
                            o = a.find(".section-picture:visible");
                        r.hasClass("active") || s || (r.active(), x(), (s = 0 < o.length) && o.css({
                            "z-index": 3,
                            position: "absolute"
                        }).velocity("fadeOut", 500, function() {
                            o.css({
                                position: "relative",
                                "z-index": 1,
                                opacity: 1
                            }), s = !1
                        }), i.css({
                            "z-index": 2
                        }).show().next().find(".lazyload").preload(), $(".caption-" + n).active()), e.preventDefault()
                    }).eq(0).trigger("click"), a.find(".section-media-inner").on("touchstart", function(e) {
                        i = "touchstart" == e.type ? e.originalEvent.touches[0].clientX : e.pageX
                    }).on("touchmove", function(e) {
                        if (i && ("mousemove" == e.type || 1 == e.originalEvent.touches.length)) {
                            var t, r = "touchmove" == e.type ? e.originalEvent.touches[0].clientX : e.pageX,
                                n = o.find(".active");
                            r + 50 < i ? t = n.next().fallback(o.children().first()) : i < r - 50 && (t = n.prev().fallback(o.children().last())), t && (t.find("a").trigger("click"), i = null)
                        }
                    })
                }), (d = function() {
                    var t = $(".home"),
                        r = parseInt(t.css("top"), 10) + t.outerHeight();
                    $(".section-header").each(function() {
                        var e = $(this);
                        h.push(new ScrollMagic.Scene({
                            triggerElement: e,
                            triggerHook: "onLeave",
                            offset: -r,
                            duration: e.outerHeight() + e.offset().top + r
                        }).setClassToggle(t, "rotate").addTo(p))
                    })
                })()
            },
            feed: function() {
                b(), w(d = n), d()
            },
            contact: function() {
                b(), $(".contact-editable").focus(function() {
                    var r = $(this),
                        e = r.text(),
                        t = r.next("input").attr("placeholder");
                    r.addClass("active"), e && e != t || window.setTimeout(function() {
                        var e, t;
                        window.getSelection && document.createRange ? ((t = document.createRange()).selectNodeContents(r[0]), (e = window.getSelection()).removeAllRanges(), e.addRange(t)) : document.body.createTextRange && ((t = document.body.createTextRange()).moveToElementText(r[0]), t.select())
                    }, 1)
                }).blur(function() {
                    var e = $(this).removeClass("error"),
                        t = e.text(),
                        r = e.next("input"),
                        n = r.attr("placeholder");
                    r.val(t), t && t != n || e.html(n).removeClass("active")
                }), $("form").submit(function(e) {
                    var t = $(this),
                        r = !1,
                        n = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        i = "";
                    if (t.find(".contact-hidden").each(function() {
                            var e = $(this),
                                t = e.val();
                            !i && e.hasClass("contact-name") && (i = t), r || (!t || t == e.attr("placeholder") || e.hasClass("contact-email") && !n.test(t)) && (e.prev().focus().addClass("error").get(0).scrollIntoView(), r = !0)
                        }), !r) {
                        var o = $(".contact-sending").show();
                        window.scrollTo(0, 0), t.hide(), o.show(), $(".contact-name").html(i), $.post(t.attr("action"), t.serialize()).done(function() {
                            o.hide(), $(".contact-sent").show()
                        })
                    }
                    e.preventDefault()
                })
            },
            menu: function() {
                b();
                var e = $(".menu"),
                    t = $(".exit"),
                    r = t.css("right"),
                    n = a ? 200 : 0;
                "project" == a && $(".nav-page-" + l).active(), a && t.click(function(e) {
                    window.history.back(), e.preventDefault()
                }), t.css("right", -100), e.velocity({
                    right: -100
                }, n, function() {
                    t.velocity({
                        right: r
                    }, n)
                }), c = function() {
                    t.velocity({
                        right: -100
                    }, 200, function() {
                        e.velocity({
                            right: r
                        }, 200, function() {
                            u.resolve()
                        })
                    })
                }
            }
        };

    function b() {
        e.html(f), i && window.scrollTo(0, 0)
    }

    function w(t) {
        var r = !1,
            n = $(".pagination").find("a").click(function(e) {
                r || (S(), $.ajax({
                    url: n.attr("href"),
                    headers: {
                        "X-Ajax-Request": "route"
                    }
                }).done(function(e) {
                    n.parent().replaceWith(e), t && t(), w(t)
                }), r = !0), e.preventDefault()
            });
        k(), t && t()
    }

    function n() {
        var t = 1e3;
        $(".shadow").each(function() {
            var e = $(this);
            (e.hasClass("post") || "none" != e.css("box-shadow")) && $(this).css({
                "z-index": t--
            })
        })
    }

    function x(e) {
        if (m.length) {
            for (var t = 0; t < m.length; t++) m[t].pause();
            e && (m = [])
        }
    }

    function S() {
        if (h.length) {
            for (var e = 0; e < h.length; e++) h[e].destroy(!0);
            h = []
        }
    }

    function k() {
        var e = $(".pagination");
        h.push(new ScrollMagic.Scene({
            triggerElement: e
        }).on("enter", function() {
            e.find("a").trigger("click")
        }).addTo(p)), $(".title-vertical").each(function() {
            var e = $(this),
                t = e.parents("section");
            h.push(new ScrollMagic.Scene({
                triggerElement: t,
                duration: t.outerHeight()
            }).setClassToggle(e, "active").addTo(p))
        }), $(".animate").each(function() {
            var e = $(this),
                t = e.data("animation"),
                r = e.data("animation-delay"),
                n = e.data("animation-offset") || 0;
            e.hasClass("animated") || h.push(new ScrollMagic.Scene({
                triggerElement: e,
                triggerHook: 1,
                offset: n,
                duration: 0
            }).on("enter", function() {
                r && e.css("animation-delay", r), e.css("visibility", "visible").addClass("animated " + t), setTimeout(function() {
                    e.removeClass("animate " + t)
                }, 5e3)
            }).addTo(p))
        });
        var t = $(".footer-visual");
        new ScrollMagic.Scene({
            triggerElement: t,
            offset: 50,
            triggerHook: "onEnter"
        }).setClassToggle(t, "active").addTo(p)
    }
    route(function(e, t) {
        var r, n = window.location.pathname;
        o = e || "home", s = t, i != n && (i && (v[n] || (v[n] = $.ajax({
            url: n,
            headers: {
                "X-Ajax-Request": "route"
            }
        }).promise()), r = v[n].done(function(e) {
            f = e
        })), S(), x(!0), o != a && $(".site-menu").find("li").removeClass("active"), c && (u = $.Deferred(), c(o, s)), $.when.apply($, [u, r].filter(function(e) {
            return e
        })).done(function() {
            d = c = null, $(".site-menu-" + o).active(), "function" == typeof y[o] ? y[o].call(this, o, s) : b(), k(), $(".video-link").click(function(e) {
                var t = $(this),
                    r = t.siblings().toggle().siblings(".vimeo");
                r.length && (x(), m.push(new Vimeo.Player(r.attr("id"), {
                    url: t.attr("href"),
                    autoplay: !0
                })), t.parents(".post-border").css("background-color", "#303030")), e.preventDefault()
            }), g.each(function() {
                $(this).find("polygon").attr("fill", "url(" + window.location + "#gradient)")
            }), a = o, l = s
        }), ga("set", "page", window.location.pathname), ga("set", "title", document.title), ga("send", "pageview"), i = window.location.pathname)
    }), $.getScript("https://www.google-analytics.com/analytics.js"), window.ga = window.ga || function() {
        (ga.q = ga.q || []).push(arguments)
    }, ga.l = +new Date, ga("create", "UA-48766880-1", "auto"), ga("send", "pageview"), route.base("/"), route.start(!0), $(window).resize(function() {
        S(), k(), d && d()
    }), $(".footer-nav").find("a").click(function() {
        window.scrollTo(0, 0)
    }), t && t.length && (function() {
        for (var e = document.cookie ? document.cookie.split("; ") : [], t = 0; t < e.length; t++)
            if ("_cc" === e[t].split("=")[0]) return !0;
        return !1
    }() || (r.one("click", function() {
        var e;
        t.slideDown("fast", function() {
            t.removeClass("active")
        }), (e = new Date).setFullYear(e.getFullYear() + 1), document.cookie = "_cc=1; expires=" + e.toUTCString() + "; path=/"
    }), t.addClass("active")))
});