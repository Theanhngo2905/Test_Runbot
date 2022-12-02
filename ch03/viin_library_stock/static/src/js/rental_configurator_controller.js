odoo.define('viin_rental_stock.RentalConfiguratorFormController', function (require) {
"use strict";

var RentalConfiguratorFormController = require('viin_rental_management.RentalConfiguratorFormController');

RentalConfiguratorFormController.include({

    _getRentalInfoData: function (state) {
        var data = this._super.apply(this, arguments);
        var ids = _.map(state.lot_ids.res_ids, function(id) {
            return {id: id};
        })
        data['lot_rental_reserved_ids'] = {
            operation: 'MULTI',
            commands: [
                {operation: 'DELETE_ALL'},
                {operation: 'ADD_M2M', ids: ids}
            ]
        };
        data['qty_rental_available_during_period'] = state.qty_rental_available_during_period;
        return data;
    },

});

return RentalConfiguratorFormController;

});
