## Paso 8: Pruebas y Verificación

### 8.1 Pruebas funcionales

**Agregar tareas**

- **Agregar** entre 3 y 5 tareas usando el formulario.
- **Verificar** que cada tarea aparece inmediatamente en la lista.

**Recarga de la página**

- **Recargar** la página con `F5`.
- **Verificar** que las tareas siguen ahí (confirma que `localStorage` funciona).

**Marcar completadas**

- **Marcar** algunas tareas como completadas con el checkbox.
- **Recargar** la página.
- **Verificar** que el estado *completada* persiste correctamente.

**Cambiar tema**

- **Cambiar** al tema oscuro con el selector.
- **Recargar** la página.
- **Verificar** que el tema oscuro se mantiene aplicado.

**Eliminar tareas**

- **Eliminar** algunas tareas con el botón 🗑️.
- **Verificar** que desaparecen de la lista y del `localStorage`.

**Limpiar todo**

- **Click** en *Limpiar Todo*.
- **Confirmar** la acción.
- **Verificar** que la lista queda vacía y aparece el estado vacío.

---

### 8.2 Pruebas técnicas (DevTools)

**Inspección de Local Storage**

- **Abrir** *DevTools > Application > Local Storage > tu dominio*.
- **Verificar** que existe la clave `tareas_lista` con el array JSON de tareas.
- **Verificar** que existe la clave `tema_app` con el valor `claro` u `oscuro`.

---

## 8. Resultados y Evidencias

### Capturas requeridas

- **Lista con datos** — Tareas creadas visibles.
- **Persistencia** — Recargar página y verificar que los datos persisten.
- **Tema oscuro** — Cambio de tema aplicado.
- **DevTools Application** — Local Storage mostrando datos guardados.
- **Código** — Capturas de `storage.js` y `app.js`.

---

### Formato del Archivo de Evidencias

### 1. Lista con datos persistentes

![Lista](assets/01-lista.png)

**Descripción:** Se crearon 5 tareas y al recargar persisten...

---

### 2. DevTools - Local Storage

![DevTools](assets/02-devtools.png)

**Descripción:** En Application > Local Storage se ve `tareas_lista` con el JSON...