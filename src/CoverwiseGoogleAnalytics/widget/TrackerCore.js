define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "dojo/_base/lang"
], function (declare, _WidgetBase, lang) {
    "use strict";

    // Declare widget"s prototype.
    return declare("CoverwiseGoogleAnalytics.widget.TrackerCore", [_WidgetBase], {

        _contextObj: null,
        prefix: "",

        postCreate: function () {
            logger.debug(this.id + ".TrackerCore.postCreate");
            this._insertGoogleAnalytics();
        },

        update: function (obj, callback) {
            logger.debug(this.id + ".TrackerCore.update");
            this._contextObj = obj;
            callback();
        },

        _addGoogle: function (i, s, o, g, r, a, m) {
            logger.debug(this.id + ".TrackerCore._addGoogle");
            if (typeof ga === "undefined") {
                i.GoogleAnalyticsObject = r;
                i[r] = i[r] || function () {
                    (i[r].q = i[r].q || []).push(arguments);
                };
                i[r].l = 1 * new Date();
                a = s.createElement(o);
                m = s.getElementsByTagName(o)[0];
                a.async = 1;
                a.src = g;
                m.parentNode.insertBefore(a, m);
            }
        },

        _insertGoogleAnalytics: function () {
            logger.debug(this.id + ".TrackerCore._insertGoogleAnalytics");
            this._addGoogle(window, document, "script", "https://www.google-analytics.com/analytics.js", "ga");

            if (typeof window.mxGoogleAnalytics === "undefined") {
                ga("create", this.uaTrackCode, "auto");
            }

            ga("set", "checkProtocolTask", null);

            // added by Coverwise
            ga("require", "ecommerce");
        },

    });
});
