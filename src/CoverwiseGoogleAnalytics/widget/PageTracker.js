define("CoverwiseoogleAnalytics/widget/PageTracker", [
    "dojo/_base/declare",
    "CoverwiseGoogleAnalytics/widget/TrackerCore",
    "dojo/_base/lang"
], function (declare, _TrackerCore, lang) {
    "use strict";

    return declare("CoverwiseGoogleAnalytics.widget.PageTracker", [_TrackerCore], {

        postCreate: function () {
            logger.debug(this.id + ".postCreate");
            this._insertGoogleAnalytics();
            this.connect(this.mxform, "onNavigation", function () {
                // Track it or not?
                if (this.trackIt) {
                    this._addPage();
                }
            });
        },

        _addPage: function () {
            logger.debug(this.id + "._addPage");
            ga("send", {
                "hitType": "pageview",
                "page": this.trackUrl,
                "title": this.pageTitle
            });
        }

    });
});

require(["CoverwiseGoogleAnalytics/widget/PageTracker"]);
