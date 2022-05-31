# Modelos de Proyeccion JS

Proyecto dedicado a los modelos de proyeccion basico basado en tiempo.

---

## Estatus

### COMPLETO

## Informacion General

El proyecto se basara en 4 modelos de proyeccion basados en tiempo, las cuales seran:

- Promedio Simple
- Promedio Movil Simple
- Promedio Movil Ponderado
- Promedio Suavizado Exponencial

---

## Explicacion tecnica

### Promedio Simple

Un promedio simple es el promedio de datos mas sencillo. Este determina que todos los datos del pasado tienen el mismo peso.

Se calcula de la siguiente forma: `(Suma de todos los datos)/(cantidad de datos)`

### Promedio Movil Simple

Un promedio movil simple le toma importancia a los datos mas cercanos al presente o futuro esperado. Es decir toma de referencia los ultimos datos recolectados para proyectar conrrespecto a ese comportamiento. Se debe elegir cual debe ser ese numero de periodos el cual se enfocara el promedio.

Se calcula de la siguiente forma: `(Suma de los periodos establecidos)/(cantidad de peridos)`

### Promedio Movil Ponderado

El promedio movil ponderado le pone importancia a los periodos establecidos en el movil simple. Es decir que ciertos datos pesaran mas en el promedio y no todos los datos de ese periodo tendran el mismo porcentaje de importancia. Por lo tanto se le introduce ponderaciones a cada dato, que son porcentajes que se multiplicaran con esos datos para tratar de predecir en el tiempo estipulado.

Se calcula de la siguiente forma: `sumatoria[ponderacion(n)*dato(n)]`

### Suavizado Exponencial Simple

El suavizado exponencial resalta por como le da peso a las demandas anteriores, dependiendo de un coeficinete establecido. En pocas palabras el peso de las demandas anteriores llega a ser exponencial, mientras que cada vez la demanda mas cercana va tomando mas peso hasta llegar a una respuesta final.

Para este modelo cabe resaltar es necesario de un pronostico para empezar, de no tener se puede poner por default la demanda real para tener un error 0, junto a este se le debe incorporar el coeficiente que trabajara con la relacion demanda-pronostico, donde la llamaremos alfa.

Se calcula de la siguiente forma: `alfa(demanda mas reciente) + (1 - alfa)(Pronostico mas reciente) `

---
