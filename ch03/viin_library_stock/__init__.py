from odoo import api, SUPERUSER_ID

from . import models
from . import wizard
from . import report

def _update_xmlid_for_rental_picking_type(env):
    # create xml ids for demo data that are widely used in tests or in other codes, for more convenience
    env['ir.model.data']._update_xmlids([
        {
            'xml_id': 'viin_rental_stock.picking_type_rent',
            'record': env.ref('stock.warehouse0').rental_type_id,
            'noupdate': True,
        }
    ])

def post_init_hook(cr, registry):
    env = api.Environment(cr, SUPERUSER_ID, {})
    warehouses = env['stock.warehouse'].search([('rental_type_id', '=', False)])
    for warehouse in warehouses:
        vals_1 = warehouse._create_or_update_sequences_and_picking_types()
        warehouse.write(vals_1)
        vals_2 = warehouse._create_or_update_route()
        warehouse.write(vals_2)

    _update_xmlid_for_rental_picking_type(env)
