from odoo import api, fields, models, _


class ResCompany(models.Model):
    _inherit = 'res.company'

    rental_location_id = fields.Many2one('stock.location', string='Rental Location', domain=[('rental_location', '=', True)])

    @api.model
    def create_missing_rental_location(self):
        company_without_rent_loc = self.env['res.company'].search(
            [('rental_location_id', '=', False)])
        company_without_rent_loc._create_rental_location()

    def _create_per_company_locations(self):
        super(ResCompany, self)._create_per_company_locations()
        self._create_rental_location()

    def _create_rental_location(self):
        for company in self:
            rental_location = self.env['stock.location'].create({
                'name': _('Rental'),
                'usage': 'internal',
                'rental_location': True,
                'company_id': company.id,
            })
            company.rental_location_id = rental_location
