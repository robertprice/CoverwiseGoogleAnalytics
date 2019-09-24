define("CoverwiseGoogleAnalytics/widget/EventTracker", [
    "dojo/_base/declare",
    "CoverwiseGoogleAnalytics/widget/TrackerCore"
], function (declare, _TrackerCore) {
    "use strict";

    return declare("CoverwiseGoogleAnalytics.widget.EventTracker", [_TrackerCore], {

        update: function (obj, callback) {
            logger.debug(this.id + ".update");
            this._contextObj = obj;
            // Track it or not?
            if (this.addEvent) {
                this._addEvent();
            }
            callback();
        },

        _addEvent: function () {
            logger.debug(this.id + "._addEvent");
            ga("send",
               "event",
               this.category,
               this.action,
               (this._contextObj !== null) ? this._contextObj.get(this.label) : "",
               (this._contextObj !== null) ? this._contextObj.get(this.value) : "");
        }

    });
});

require(["CoverwiseGoogleAnalytics/widget/EventTracker"]);
