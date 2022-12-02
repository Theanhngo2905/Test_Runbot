odoo.define('viin_rental_stock.QtyAtDateWidget', function (require) {
"use strict";

var core = require('web.core');
var QWeb = core.qweb;

var utils = require('web.utils');

var _t = core._t;

const QtyAtDateWidget = require('sale_stock.QtyAtDateWidget')

QtyAtDateWidget.include({

    renderElement: function () {
        if (!this.data.is_rental){
            return this._super();
        }
        var $el;
        $el = $(core.qweb.render('viin_rental_stock.qtyRentAtDate', {widget: this}).trim());
        this._replaceElement($el);
    },

    _updateData: function() {
        if (!this.data.is_rental) {
            return this._super();
        }
        if (this.data.scheduled_date) {
            var qty_to_deliver = utils.round_decimals(this.data.qty_to_deliver, this.fields.qty_to_deliver.digits[1]);
            this.data.will_be_fulfilled = utils.round_decimals(this.data.qty_rental_available_during_period, this.fields.qty_rental_available_during_period.digits[1]) >= qty_to_deliver
        }
    },

    _getContent() {
        if (!this.data.is_rental) {
            return this._super();
        }
        const $content = $(QWeb.render('viin_rental_stock.QtyDetailPopOver', {
            data: this.data,
        }));
        return $content;
    },
    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------
    /**
     * Set a bootstrap popover on the current QtyAtDate widget that display rental available
     * quantity.
     */
    _setPopOver() {
        if (!this.data.is_rental) {
            return this._super();
        }
        const $content = this._getContent();
        if (!$content) {
            return;
        }
        const options = {
            content: $content,
            html: true,
            placement: 'left',
            title: _t('Rental Availability'),
            trigger: 'focus',
            delay: {'show': 0, 'hide': 100 },
        };
        this.$el.popover(options);
    },

});

return QtyAtDateWidget
});
