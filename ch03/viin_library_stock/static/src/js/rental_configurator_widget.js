odoo.define('viin_rental_stock.rental_stock_product_configurator', function (require) {

var ProductConfiguratorWidget = require('sale.product_configurator');

ProductConfiguratorWidget.include({

    _defaultRentalInfoData: function (data) {
            var infos = this._super.apply(this, arguments);
            if (this.recordData.warehouse_id) {
                data.default_warehouse_id = this.record.evalContext.warehouse_id;
            }
            if (this.recordData.lot_rental_reserved_ids) {
                data.default_lot_ids = this._convertFromMany2Many(
                    this.recordData.lot_rental_reserved_ids
                );
            }
            return infos;
        },
});

return ProductConfiguratorWidget;
});
