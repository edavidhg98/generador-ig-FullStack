# generator-ig-fullstack [![NPM version][npm-image]][npm-url]
> 

## Requisitos previos
* Node.js y npm - Descargar e instalar [node.js](https://nodejs.org/)
* MongoDB - Descargar e instalar [MongoDB](https://www.mongodb.com/download-center?jmp=nav#community). Luego de haber instalado MongoDB debe ejecutar el proceso mongod.

## Tipos de aplicaciones que se pueden generar
| Tipo          |         Tecnologías         |
|---------------------|-------------------------------------------------------------------------------|
| RESTful API         | Node.js, Express, Mongo (Mongoose)                                            |
| Angular FullStack   | Node.js, Express, Mongo (Mongoose), Angular 4, Angular-CLI, Bootstrap v4  |


## Instalación

Primero, instala [Yeoman](http://yeoman.io) y el generator-ig-fullstack usando [npm](https://www.npmjs.com/)

```bash
npm install -g yo
npm install -g generator-ig-fullstack
```

Cree un archivo config.json para la generación crud. A continuación se muestra un ejemplo de como debe quedar la configuración del archivo.


```json
{
  "entities": [
    {
      "name": "Producto",
      "attributes": [
        {
          "name": "name",
          "type": "String",
          "required": true,
          "validations": [
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
          "type": "String",
          "required": true,
          "control": "textarea"
        },
        {
          "name": "category",
          "type": "String",
          "required": true
        },
        {
          "name": "price",
          "type": "Number",
          "required": true
        }
      ],
      "relationships": [
        {
          "entityRef": "Proveedor",
          "typeRelationship": "many-to-one",
          "fieldName": "proveedor"
        }
      ]
    },
    {
      "name": "Proveedor",
      "attributes": [
        {
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
      "relationships":[
        {
          "entityRef": "Producto",
          "typeRelationship": "one-to-many",
          "fieldName": "productos",
          "localField": "_id",
          "foreignField": "proveedor"
        }
      ]
    }
  ]
}
```
Luego generas tu nuevo proyecto:

```bash
yo ig-fullstack
```

## Tipos de datos y validaciones
| MongoDB  |         Validaciones         |
|----------|------------------------------|
| String   | required, min, max, pattern  |
| Number   | required, min, max           |
| Date     | required                     |
| Boolean  | required                     |

## Especificacón de tipos de control a usar

A un atributo de una entidad se le puede especificar un tipo de control (input) a usar. Tipos de controles válidos:

* date, datetime-local, email, month, number, password, time, url, week, text

Si no se le especifica un control, por defecto se usará un control según su tipo de dato.

## Relaciones
### One-To-Many
| Key         |         Explicación          |
|-------------|-------------------------------------------------------------|
| entityRef      | Nombre de la entidad con la que se quiere hacer la relación |
| fieldName   | Nombre del campo para usar en la definición del modelo      |

### Many-To-One
| Key         |         Explicación          |
|-------------|-------------------------------------------------------------|
| entityRef      | Nombre de la entidad con la que se quiere hacer la relación |
| fieldName   | Nombre del campo para usar en la definición del modelo      |
| localField   | Primary Key      |
| foreignField   | Foreign Key      |

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
