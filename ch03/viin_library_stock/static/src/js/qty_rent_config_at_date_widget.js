odoo.define('viin_rental_stock.QtyRentConfigAtDateWidget', function (require) {
"use strict";

var core = require('web.core');
var QWeb = core.qweb;

var Widget = require('web.Widget');
var widget_registry = require('web.widget_registry');
var utils = require('web.utils');

var _t = core._t;

var QtyRentConfigAtDateWidget = Widget.extend({
    template: 'viin_rental_stock.qtyRentConfigAtDate',
    events: _.extend({}, Widget.prototype.events, {
        'click .fa-area-chart': '_onClickButton',
    }),

    /**
     * @override
     * @param {Widget|null} parent
     * @param {Object} params
     */
    init: function (parent, params) {
        this.data = params.data;
        this.fields = params.fields;
        this._updateData();
        this._super(parent);
    },

    start: function () {
        var self = this;
        return this._super.apply(this, arguments).then(function () {
            self._setPopOver();
        });
    },

    _updateData: function() {
        // add some data to simplify the template
        if (this.data.quantity && this.data.qty_rental_available_during_period) {
            var quantity = utils.round_decimals(this.data.quantity, this.fields.quantity.digits[1]);
            this.data.will_be_fulfilled = utils.round_decimals(this.data.qty_rental_available_during_period, this.fields.qty_rental_available_during_period.digits[1]) >= quantity
        }
    },
    
    updateState: function (state) {
        this.$el.popover('dispose');
        if (state.data) {
            this.data = state.data;
            this._updateData();
            this.renderElement();
            this._setPopOver();
        }
    },

    _getContent() {
        const $content = $(QWeb.render('viin_rental_stock.QtyConfigDetailPopOver', {
            data: this.data,
        }));
        return $content;
    },
    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------
    /**
     * Set a bootstrap popover on the current QtyAtDate widget that display available
     * quantity.
     */
    _setPopOver() {
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

    //--------------------------------------------------------------------------
    // Handlers
    //--------------------------------------------------------------------------
    _onClickButton: function () {
        // We add the property special click on the widget link.
        // This hack allows us to trigger the popover (see _setPopOver) without
        // triggering the _onRowClicked.
        this.$el.find('.fa-area-chart').prop('special_click', true);
    },
});

widget_registry.add('qty_rent_config_at_date_widget', QtyRentConfigAtDateWidget);

return QtyRentConfigAtDateWidget;
});
