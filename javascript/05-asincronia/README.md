# Práctica 05 - Programación Asíncrona en JavaScript

## Descripción

En esta práctica se desarrolló una aplicación web interactiva para comprender el funcionamiento de la **programación asíncrona en JavaScript**.

Se implementaron tres módulos principales:

- Simulación de peticiones (secuencial vs paralelo)
- Temporizador regresivo interactivo
- Manejo de errores con reintentos automáticos

El objetivo fue aplicar conceptos como `Promises`, `async/await`, `Promise.all`, `setTimeout`, `setInterval` y manejo de errores con `try/catch`.

---

## Funcionalidades

### 1. Simulador de carga de recursos
- Simulación de peticiones con tiempo aleatorio
- Comparación entre ejecución secuencial y paralela
- Medición de tiempo con `performance.now()`
- Visualización en tiempo real mediante logs
- Cálculo de diferencia de rendimiento

### 2. Temporizador regresivo
- Ingreso de tiempo en segundos
- Visualización en formato MM:SS
- Barra de progreso animada
- Alerta visual cuando quedan ≤ 10 segundos
- Controles de iniciar, detener y reiniciar

### 3. Manejo de errores
- Simulación de errores controlados
- Captura de errores con `try/catch`
- Sistema de reintentos automáticos
- Backoff exponencial (espera progresiva)
- Registro de eventos en consola visual

---



## Código destacado

### Simulación de petición con Promesas

```
javascript
function simularPeticion(nombre, tiempoMin = 500, tiempoMax = 2000, fallar = false) {
  return new Promise((resolve, reject) => {
    const tiempoDelay = Math.floor(Math.random() * (tiempoMax - tiempoMin + 1)) + tiempoMin;

    setTimeout(() => {
      if (fallar) {
        reject(new Error(`Error al cargar ${nombre}`));
      } else {
        resolve({ nombre, tiempo: tiempoDelay });
      }
    }, tiempoDelay);
  });
}
```
Carga secuencial (await)
```
async function cargarSecuencial() {
  const usuario = await simularPeticion('Usuario');
  const posts = await simularPeticion('Posts');
  const comentarios = await simularPeticion('Comentarios');
}
```
Carga paralela (Promise.all)
```
async function cargarParalelo() {
  const resultados = await Promise.all([
    simularPeticion('Usuario'),
    simularPeticion('Posts'),
    simularPeticion('Comentarios')
  ]);
}
```
Temporizador con setInterval
```
intervaloId = setInterval(() => {
  tiempoRestante--;
  actualizarDisplay();

  if (tiempoRestante <= 0) {
    detener();
  }
}, 1000);
```
Manejo de errores con try/catch
```
async function simularError() {
  try {
    await simularPeticion('API', 500, 1000, true);
  } catch (error) {
    console.error(error.message);
  }
}
```
Reintentos automáticos
```
async function fetchConReintentos(nombre, intentos = 3) {
  for (let i = 0; i < intentos; i++) {
    try {
      return await simularPeticion(nombre, 500, 1000, Math.random() > 0.5);
    } catch (error) {
      if (i < intentos - 1) {
        const espera = Math.pow(2, i) * 500;
        await new Promise(r => setTimeout(r, espera));
      }
    }
  }
}
```
Capturas
## Capturas

### Comparación secuencial vs paralelo
![Comparativa](assents/Comparativa.png)

### Temporizador en funcionamiento
![Temporizador](assents/Tempo.png)

### Manejo de errores
![Errores](assents/Error.png)

Resultados
La ejecución paralela es significativamente más rápida que la secuencial.
El temporizador responde correctamente a eventos y cambios de estado.
Los errores son controlados sin romper la aplicación.
El sistema de reintentos mejora la robustez del programa.
Conclusión

Esta práctica permitió entender cómo JavaScript maneja tareas asíncronas sin bloquear la ejecución principal. Se aplicaron herramientas modernas como async/await y Promise.all, además de técnicas para mejorar la experiencia del usuario y la resiliencia del sistema ante errores.