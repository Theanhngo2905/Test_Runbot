from odoo import fields, models


class TypeBook(models.Model):

    _name = "type.book"
    _description = "Type Book"

    name = fields.Char(string='Type Book', translate=True, required=True)
    sequence = fields.Integer(string='Sequence')
