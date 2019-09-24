define("CoverwiseGoogleAnalytics/widget/EcommerceTracker", [
    "dojo/_base/declare",
    "CoverwiseGoogleAnalytics/widget/TrackerCore"
], function (declare, _TrackerCore) {
    "use strict";

    return declare("CoverwiseGoogleAnalytics.widget.EcommerceTracker", [_TrackerCore], {

        update: function (obj, callback) {
            logger.debug(this.id + ".update");
            this._contextObj = obj;
            // Track it or not?
            if (this.addEcommerce) {
                this._addEcommerce();
            }
            callback();
        },

        _addEcommerce: function () {
            logger.debug(this.id + "._addEcommerce");
            ga("ecommerce:addTransaction", {
              "id": (this._contextObj !== null) ? this._contextObj.get(this.id) : "",
              "affiliation": (this._contextObj !== null) ? this._contextObj.get(this.affiliation) : null,
              "revenue": (this._contextObj !== null) ? this._contextObj.get(this.revenue) : null,
              "shipping": (this._contextObj !== null) ? this._contextObj.get(this.shipping) : null,
              "tax": (this._contextObj !== null) ? this._contextObj.get(this.tax) : null,
            });
            ga("ecommerce:addItem", {
              "id": (this._contextObj !== null) ? this._contextObj.get(this.id) : "",
              "name": (this._contextObj !== null) ? this._contextObj.get(this.name) : null,
              "sku": (this._contextObj !== null) ? this._contextObj.get(this.sku) : null,
              "category": (this._contextObj !== null) ? this._contextObj.get(this.category) : null,
              "price": (this._contextObj !== null) ? this._contextObj.get(this.price) : null,
              "quantity": (this._contextObj !== null) ? this._contextObj.get(this.quantity) : null,
            });
            ga("ecommerce:send");
        }

    });
});

require(["CoverwiseGoogleAnalytics/widget/EcommerceTracker"]);
