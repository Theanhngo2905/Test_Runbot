{
    "name": "Library Management",
    "summary": "Manage library catalog and book lending.",
    "author": "Daniel Reis",
    "license": "AGPL-3",
    "website": "https://github.com/PacktPublishing"
               "/Odoo-15-Development-Essentials",
    "version": "15.0.1.0.0",
    "category": "Services/Library",
    "depends": ["product"],
    
    "data": [
        "security/library_security.xml",
        "security/ir.model.access.csv",
        "views/root_menu.xml",
        "views/product_template_view.xml",
        "views/type_book_view.xml",
        # "views/book_list_template.xml",
        ],

    "demo": [
        "data/book_product_demo.xml",
    ],
    'images' : [
        "static/img/dacnhantamdacnhantam.jpg",
        ],
    'installable': True,
    'application': True,
    'auto_install': True,
    'price': 99.9,
    'currency': 'EUR',
    'license': 'OPL-1',
}
