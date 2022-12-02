from odoo import models, fields, api, _
from odoo.exceptions import ValidationError


class ProductTemplate(models.Model):
    _inherit = 'product.template'


    detailed_type = fields.Selection(selection_add=[
        ('book', 'Book')
        ], tracking=True, ondelete={'book': 'set consu'})
    type = fields.Selection(selection_add=[
        ('book', 'Book')
    ], ondelete={'book': 'set consu'})
    isbn = fields.Char("ISBN")
    date_published = fields.Date(string='Date Published')
    publisher_id = fields.Many2one("res.partner", string="Publisher")
    author_ids = fields.Many2many("res.partner", string="Authors")
    type_book_ids = fields.Many2many("type.book", string="Type Book")
    description = fields.Text(string='Description')

    def _check_isbn(self):
        self.ensure_one()
        digits = [int(x) for x in self.isbn if x.isdigit()]
        if len(digits) == 13:
            ponderations = [1, 3] * 6
            terms = [a * b for a, b in zip(digits[:12], ponderations)]
            remain = sum(terms) % 10
            check = 10 - remain if remain != 0 else 0
            return digits[-1] == check

    def button_check_isbn(self):
        for book in self:
            if not book.isbn:
                raise ValidationError("Please provide an ISBN for %s" % book.name)
            if book.isbn and not book._check_isbn():
                raise ValidationError("%s ISBN is invalid" % book.isbn)
        return True