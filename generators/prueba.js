var datos = {
    "globalMessages":{
        "required": "campo requerido",
        "email": "correo mal formado",
        "minlength": "la longitud minima es de {0} caracteres",
        "maxlength": "La longitud máxima es de {0} caracteres"
    },
    "entities": [{
            "name": "Products",
            "attributes": [{
                    "name": "ProductoName",
                    "type": "String",
                    "control": "email",
                    "required": "true",
                    "messages": {
                        "minlength": "la longitud minima es de 3 caracteres",
                        "maxlength": "La longitud máxima es de 20 caracteres"
                    },
                    "validations": [{
                            "type": "minlength",
                            "value": 3
                        },
                        {
                            "type": "maxlength",
                            "value": 20
                        }
                    ]
                },
                {
                    "name": "QuantityPerUnit",
                    "type": "String",
                    "validations": [{
                        "type": "pattern",
                        "value": "[A-Z]*",
                        "message": "Valor debe ser en mayúsculas"
                    }]
                },
                {
                    "name": "UnitPrice",
                    "type": "Number"
                },
                {
                    "name": "UnitsInStock",
                    "type": "Number"
                },
                {
                    "name": "UnitsOnOrder",
                    "type": "Number"
                },
                {
                    "name": "ReorderLevel",
                    "type": "Number"
                },
                {
                    "name": "Discontinued",
                    "type": "Boolean"
                }
            ],
            "relationships": [{
                "entityRef": "Proveedor",
                "typeRelationship": "many-to-one",
                "fieldName": "proveedor"
            }]
        },
        {
            "name": "OrderDetails",
            "attributes": [{
                    "name": "UnitPrice",
                    "type": "Number"
                },
                {
                    "name": "Quantity",
                    "type": "Number"
                },
                {
                    "name": "Discount",
                    "type": "Number"
                }
            ]
        },
        {
            "name": "Categories",
            "attributes": [{
                    "name": "CategoryName",
                    "type": "String"
                },
                {
                    "name": "Description",
                    "type": "String"
                }
            ]
        },
        {
            "name": "Suppliers",
            "attributes": [{
                    "name": "CompanyName",
                    "type": "String"
                },
                {
                    "name": "ContactName",
                    "type": "String"
                },
                {
                    "name": "ContactTitle",
                    "type": "String"
                },
                {
                    "name": "Address",
                    "type": "String"
                },
                {
                    "name": "City",
                    "type": "String"
                },
                {
                    "name": "Region",
                    "type": "String"
                },
                {
                    "name": "PostalCode",
                    "type": "String"
                },
                {
                    "name": "Coutry",
                    "type": "String"
                },
                {
                    "name": "Phone",
                    "type": "String"
                },
                {
                    "name": "Fax",
                    "type": "String"
                },
                {
                    "name": "HomePage",
                    "type": "String"
                }
            ]
        },
        {
            "name": "Territories",
            "attributes": [{
                "name": "TerritoryDescription",
                "type": "String"
            }]
        },
        {
            "name": "Employees",
            "attributes": [{
                    "name": "LastName",
                    "type": "String"
                },
                {
                    "name": "FirstName",
                    "type": "String"
                },
                {
                    "name": "Title",
                    "type": "String"
                },
                {
                    "name": "TitleOfCourtesy",
                    "type": "Number"
                },
                {
                    "name": "BirthDate",
                    "type": "Date"
                },
                {
                    "name": "HireDate",
                    "type": "Date"
                },
                {
                    "name": "Address",
                    "type": "String"
                },
                {
                    "name": "City",
                    "type": "String"
                },
                {
                    "name": "Region",
                    "type": "String"
                },
                {
                    "name": "PostalCode",
                    "type": "String"
                },
                {
                    "name": "Coutry",
                    "type": "String"
                },
                {
                    "name": "HomePhone",
                    "type": "String"
                },
                {
                    "name": "Extension",
                    "type": "String"
                }
            ]
        },
        {
            "name": "Orders",
            "attributes": [{
                    "name": "OrderData",
                    "type": "Date"
                },
                {
                    "name": "RequiredData",
                    "type": "Date"
                },
                {
                    "name": "ShippedDate",
                    "type": "Date"
                },
                {
                    "name": "ShipVia",
                    "type": "Number"
                },
                {
                    "name": "Freight",
                    "type": "Number"
                },
                {
                    "name": "ShipName",
                    "type": "String"
                },
                {
                    "name": "ShipAddress",
                    "type": "String"
                },
                {
                    "name": "ShipCity",
                    "type": "String"
                },
                {
                    "name": "ShipRegion",
                    "type": "String"
                },
                {
                    "name": "ShipPostalCode",
                    "type": "String"
                },
                {
                    "name": "ShipCountry",
                    "type": "String"
                }
            ]
        },
        {
            "name": "Customers",
            "attributes": [{
                    "name": "CompanyName",
                    "type": "String"
                },
                {
                    "name": "ContactName",
                    "type": "String"
                },
                {
                    "name": "ContactTitle",
                    "type": "String"
                },
                {
                    "name": "Address",
                    "type": "String"
                },
                {
                    "name": "City",
                    "type": "String"
                },
                {
                    "name": "Region",
                    "type": "String"
                },
                {
                    "name": "PostalCode",
                    "type": "String"
                },
                {
                    "name": "Coutry",
                    "type": "String"
                },
                {
                    "name": "Phone",
                    "type": "String"
                },
                {
                    "name": "Fax",
                    "type": "String"
                }
            ]
        },
        {
            "name": "Region",
            "attributes": [{
                "name": "RegionDescription",
                "type": "String"
            }]
        },
        {
            "name": "Shippers",
            "attributes": [{
                    "name": "CompanyName",
                    "type": "String"
                },
                {
                    "name": "Phone",
                    "type": "String"
                }
            ]
        },
        {
            "name": "CustomerDemographics",
            "attributes": [{
                "name": "CustomerDesc",
                "type": "String"
            }]
        },
        {
            "name": "Proveedor",
            "attributes": [{
                    "name": "name",
                    "type": "String"
                },
                {
                    "name": "email",
                    "type": "String",
                    "control": "email"
                },
                {
                    "name": "address",
                    "type": "String"
                },
                {
                    "name": "telefono",
                    "type": "String",
                    "control": "number"
                }
            ],
            "relationships": [{
                "entityRef": "Producto",
                "typeRelationship": "one-to-many",
                "fieldName": "productos",
                "localField": "_id",
                "foreignField": "proveedor"
            }]
        }
    ]
}


console.log(datos.globalMessages["required"])
