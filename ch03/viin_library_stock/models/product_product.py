from odoo import models, fields


class Product(models.Model):
    _inherit = 'product.product'

    lots_rented_ids = fields.One2many('stock.production.lot', string='Lots/Serial Current Rented', compute='_compute_lots_rented_ids')

    def _compute_lots_rented_ids(self):
        for r in self:
            if r.detailed_type == 'product' and r.can_be_rent and r.tracking =='serial':
                lots_rent_loc = r.env.company.rental_location_id._get_lots_serial_product(r)
                r.lots_rented_ids = lots_rent_loc
            else:
                r.lots_rented_ids = False
