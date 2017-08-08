# generator-ig-fullstack [![NPM version][npm-image]][npm-url]
> 

## Instalación

Primero, instala [Yeoman](http://yeoman.io) y el generator-ig-fullstack usando [npm](https://www.npmjs.com/) (asumo que tienes pre-instalado [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-ig-fullstack
```

Luego generas tu nuevo proyecto:

```bash
yo ig-fullstack
```

A continuación, cree un archivo config.json para la generación crud. A continuación se muestra un ejemplo de como debe quedar la configuración del archivo.


```json
{
  "entities": [
    {
      "name": "Producto",
      "attributes": [
        {
          "name": "name",
          "type": "String",
          "validations": [
            {
              "type": "required",
              "value": true,
              "message": "El campo name debe ser obligatorio"
            },
            {
              "type": "min",
              "value": 8,
              "message": "El campo name debe tener como minimo una longitud de 8"
            },
            {
              "type": "max",
              "value": 30,
              "message": "El campo name debe tener como maxima una longitud de 30"
            }
          ]
        },
        {
          "name": "description",
          "type": "String"
        },
        {
          "name": "category",
          "type": "String"
        },
        {
          "name": "price",
          "type": "Number"
        }
      ],
      "relationships": [
        {
          "entity": "Proveedor",
          "attribute": "proveedor",
          "reference": "_id"
        }
      ]
    }
  ]
}
```
## Tipos de datos y validaciones
| MongoDB  |         Validaciones         |
|----------|------------------------------|
| String   | required, min, max, pattern  |
| Number   | required, min, max           |
| Date     | required                     |
| Boolean  | required                     |

## Convención de nombres a seguir en el proyecto:
Este es el formato correcto para el nombramiento de las entidades y sus atributos:

| Convención  |    Ejemplo    |            Donde usarlas           |
|-------------|---------------|------------------------------------|
| Camel Case  | tipoProducto  | Variables                          |
| Pascal Case | TipoProducto  | Clases                             |
| Kebab Case  | tipo-producto | Nombre de archivos, carpetas, URL  |
| Start Case  | Tipo Producto |  Títulos en la app                 |
## License

Apache-2.0 © [SMorales]()


[npm-image]: https://badge.fury.io/js/generator-ig-fullstack.svg
[npm-url]: https://npmjs.org/package/generator-ig-fullstack
