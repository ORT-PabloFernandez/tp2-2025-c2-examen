# TALLER DE PROGRAMACION 2

## Instrucciones de resolución de examen

Es tu primer día en [tecnoshare.com](http://tecnoshare.com) luego de un intenso entrenamiento de 10 semanas por fin tenes la oportunidad de mostrar lo que aprendiste, y tu potencial como desarrollador backend en nodejs con express y mongodb.

Luego de abrir el correo encuentras un mail de tu Líder Técnico con tu primera asignación!! 💪

> Bienvenid@! estuvimos esperando por horas que llegares, tenemos varias tareas criticas y prioritarias en nuestro backlog. Por favor presta mucha atención a las instrucciones. No dudes en preguntarme cualquier cosa, aunque generalmente estoy muy ocupado resolviendo problemas heredados de las rotaciones de los desarrolladores.

> En el presente repositorío encontrarás un proyecto de nodejs que ya tiene codigo base del backend con el que vamos a trabajar. Te aconsejo que sigas los siguientes pasos para armar tu entorno de trabajo.

> 1. Realizar un Fork del presente repositorio
> 2. Realizar un clone del presente repositorio
> 3. Instalar las dependencias
> 4. Solicitar las variables de entorno que contiene la conexion string a mongodb (antes de preguntar, revisa el chat, seguro estan ahí)
> 5. Ejecutar el servidor web de la api REST con el script de npm start-dev si queres trabajar con nodemon (tendrías que instalarlo) con start solo, tambien funciona.
>    El backend se conecta con una base de datos Mongodb en la cual se encuentra la base de datos **sample_airbnb** con una collection llamada **listingsAndReviews**, ahí se encuentran aprox. 5.600 publicaciones de propiedades.
> 6. Proba el endpoint que ya se encuentra desarrollado: /api/listingsAndReviews debería retornar un json con 5.600 publicaciones. Sin embargo te aconsejo que uses el paginado que tiene para probar (mira la definición del end-point). Sí por algun motivo no llegase a funcionar, solicita asistencia.

> ### TUS TAREAS SON LAS SIGUIENTES POR ORDEN DE PRIORIDAD
>
> 1. Desarrollar el endpoint para obtener propiedades por tipo de alojamiento
Crear un endpoint que permita filtrar las propiedades por tipo de alojamiento (property_type) utilizando el formato /api/listings/property-type/:type. Este endpoint debe retornar todas las propiedades que coincidan con el tipo especificado (ej: "Apartment", "House", "Condominium").
> 2. Desarrollar el endpoint para obtener todas las propiedades con precio total calculado
Crear un endpoint /api/listings/with-total-price que retorne todas las propiedades con una nueva propiedad llamada **totalPrice** que sume el precio base (price) más las tarifas adicionales como cleaning_fee, security_deposit y extra_people si existen. Si alguna tarifa no está disponible, debe considerarse como 0.
> 3. Desarrollar el endpoint para obtener propiedades por host específico
Implementar un endpoint que permita obtener todas las propiedades de un host particular utilizando el formato /api/listings/host/:host_id. Debe retornar un listado completo de todas las propiedades que pertenecen al host especificado.
> 4. Desarrollar el endpoint para actualizar la disponibilidad de una propiedad
Crear un endpoint PUT/PATCH que permita actualizar el estado de disponibilidad de una propiedad específica. El endpoint debe permitir cambiar campos como availability.available_30, availability.available_60, availability.available_90 y availability.available_365.
> 5. Desarrollar el endpoint para obtener un ranking de hosts con más propiedades
Implementar un endpoint /api/listings/top-hosts?limit=10 que retorne un ranking de los hosts que tienen más propiedades listadas. Debe incluir información del host (nombre, id) y la cantidad total de propiedades que maneja, ordenado de mayor a menor. 

> Características importantes a considerar:

    - Todos los endpoints deben estar protegidos con el middleware de autenticación existente
    - Implementar paginación donde sea apropiado
    - Manejar errores correctamente con códigos de estado HTTP apropiados
    - Seguir las convenciones REST establecidas en el proyecto
    - Incluir validación de parámetros de entrada
    - Documentar los endpoints en el README.md con sus parámetros correspondientes

> Desde ya muchas gracias por la colaboración! 😉 como te comente en la entrevista soy muy detallista en la prolijidad del codigo y la performance cada detalle cuenta, no me gusta mucho las cosas fuera del estandar de APIREST, sin embargo si no estas seguro, es mejor que lo resuelvas como puedas y me dejes notas en el readme.md del repo, para que yo pueda probar.

> Y una ultima cosa importante, todos los endpoints que desarrolles tienen que estar asegurados con un middleware de autenticacion, que valide que el token sea valido y que el usuario tenga permiso para acceder a la ruta.

## Intrucciones para la entrega

Si ya terminaste o son las 10:00 asegurate de seguir los siguientes pasos para la entrega:

1. Completar el listado de endpoints, especificando parametros si los hubiera, mas abajo en este mismo archivo.
2. Realizar un commit a tu repo con un mensaje con tu nombre completo
3. Realizar un push a tu repositorio
4. Realizar un pull request a mi repositorio

## Listado de endpoints implementados

### Endpoints de autenticación y usuarios:
- POST /api/users/register - Registro de nuevos usuarios
- POST /api/users/login - Login de usuarios existentes
- GET /api/users - Obtener todos los usuarios (requiere autenticación)
- GET /api/users/:id - Obtener un usuario específico por ID (requiere autenticación)

### Endpoints de listings/propiedades:
- GET /api/listings?pageSize=[pageSize]&page=[page] - Obtener todas las propiedades con paginación opcional (requiere autenticación)
- GET /api/listings/:id - Obtener una propiedad específica por ID (requiere autenticación)
- GET /api/listings/property-type/:type?pageSize=[pageSize]&page=[page] (requiere autenticación)
- GET /api/listings/with-total-price?pageSize=[pageSize]&page=[page] (requiere autenticación)
- GET /api/listings/host/:host_id?pageSize=[pageSize]&page=[page] (requiere autenticación)
- PATCH /api/listings/:id/availability (requiere autenticación) 
    - Body: {
        "availability_30": 1,
        "availability_60": 2,
        "availability_90": 3,
        "availability_365": 4
    }
- GET /api/listings/top-hosts?limit=[limit] (requiere autenticación)
- GET /api/listings/:id

### Endpoint base:
- GET / - Mensaje de bienvenida de la API