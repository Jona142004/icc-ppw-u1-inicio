'use strict';

/* =========================
   SELECCIÓN DE ELEMENTOS DOM
========================= */
const formTarea = document.getElementById('form-tarea');
const inputTarea = document.getElementById('input-tarea');
const listaTareas = document.getElementById('lista-tareas');
const mensajeEstado = document.getElementById('mensaje-estado');
const btnLimpiar = document.getElementById('btn-limpiar');
const themeBtns = document.querySelectorAll('[data-theme]');
const totalTareas = document.getElementById('total-tareas');
const totalCompletadas = document.getElementById('total-completadas');

/* =========================
   ESTADO GLOBAL (arreglo local)
========================= */
let tareas = [];

/* =========================
   UTILIDADES DOM (sin innerHTML para datos dinámicos)
========================= */
function vaciarContenedor(contenedor) {
  while (contenedor.firstChild) {
    contenedor.removeChild(contenedor.firstChild);
  }
}

/* =========================
   COMPONENTES
========================= */
function crearElementoTarea(tarea) {
  const li = document.createElement('li');
  li.className = 'task-item';
  li.dataset.id = tarea.id;
  if (tarea.completada) {
    li.classList.add('task-item--completed');
  }

  // Checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'task-item__checkbox';
  checkbox.checked = tarea.completada;

  // Texto
  const span = document.createElement('span');
  span.className = 'task-item__text';
  span.textContent = tarea.texto;

  // Botón eliminar
  const btnEliminar = document.createElement('button');
  btnEliminar.className = 'btn btn--danger btn--small';
  btnEliminar.textContent = '🗑️';
  btnEliminar.title = 'Eliminar tarea';

  // Contenedor de acciones
  const divAcciones = document.createElement('div');
  divAcciones.className = 'task-item__actions';
  divAcciones.appendChild(btnEliminar);

  // Ensamblar
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(divAcciones);

  // Event listeners
  checkbox.addEventListener('change', () => toggleTarea(tarea.id));
  btnEliminar.addEventListener('click', () => eliminarTarea(tarea.id));

  return li;
}

function crearEstadoVacio() {
  const divVacio = document.createElement('div');
  divVacio.className = 'empty-state';
  const p = document.createElement('p');
  p.textContent = '🎉 No hay tareas. ¡Agrega una para comenzar!';
  divVacio.appendChild(p);
  return divVacio;
}

function renderizarTareas() {
  vaciarContenedor(listaTareas);

  if (tareas.length === 0) {
    listaTareas.appendChild(crearEstadoVacio());
    actualizarEstadisticas();
    return;
  }

  tareas.forEach(tarea => {
    const elemento = crearElementoTarea(tarea);
    listaTareas.appendChild(elemento);
  });

  actualizarEstadisticas();
}

function actualizarEstadisticas() {
  totalTareas.textContent = tareas.length;
  totalCompletadas.textContent = tareas.filter(t => t.completada).length;
}

function mostrarMensaje(texto, tipo = 'success') {
  mensajeEstado.textContent = texto;
  mensajeEstado.className = `mensaje mensaje--${tipo}`;
  mensajeEstado.classList.remove('oculto');

  setTimeout(() => {
    mensajeEstado.classList.add('oculto');
  }, 3000);
}

/* =========================
   LÓGICA DE TAREAS
========================= */
function cargarTareas() {
  tareas = TareaStorage.getAll();
  renderizarTareas();
}

function agregarTarea(texto) {
  if (!texto.trim()) {
    mostrarMensaje('El texto no puede estar vacío', 'error');
    return;
  }

  const nueva = TareaStorage.crear(texto);
  // Refrescar el arreglo local desde localStorage para mantener consistencia
  tareas = TareaStorage.getAll();
  renderizarTareas();
  mostrarMensaje(`✓ Tarea "${nueva.texto}" agregada`);
}

function toggleTarea(id) {
  TareaStorage.toggleCompletada(id);
  tareas = TareaStorage.getAll();
  renderizarTareas();
}

function eliminarTarea(id) {
  const tarea = tareas.find(t => t.id === id);
  if (!tarea) return;

  if (!confirm(`¿Eliminar "${tarea.texto}"?`)) return;

  TareaStorage.eliminar(id);
  tareas = TareaStorage.getAll();
  renderizarTareas();
  mostrarMensaje(`✓ Tarea eliminada`);
}

function limpiarTodo() {
  if (tareas.length === 0) {
    mostrarMensaje('No hay tareas para eliminar', 'error');
    return;
  }

  if (!confirm(`¿Eliminar las ${tareas.length} tareas? Esta acción no se puede deshacer.`)) return;

  TareaStorage.limpiarTodo();
  tareas = [];
  renderizarTareas();
  mostrarMensaje('✓ Todas las tareas fueron eliminadas');
}

/* =========================
   TEMA
========================= */
function aplicarTema(nombreTema) {
  const root = document.documentElement;

  if (nombreTema === 'oscuro') {
    root.style.setProperty('--bg-primary', '#0f172a');
    root.style.setProperty('--card-bg', '#1e293b');
    root.style.setProperty('--text-primary', '#f1f5f9');
    root.style.setProperty('--text-secondary', '#94a3b8');
    root.style.setProperty('--border-color', '#334155');
  } else {
    // Tema claro: restaurar valores por defecto
    root.style.setProperty('--bg-primary', '#f1f5f9');
    root.style.setProperty('--card-bg', '#ffffff');
    root.style.setProperty('--text-primary', '#1e293b');
    root.style.setProperty('--text-secondary', '#64748b');
    root.style.setProperty('--border-color', '#e2e8f0');
  }

  // Actualizar botones activos
  themeBtns.forEach(btn => {
    btn.classList.toggle('theme-btn--active', btn.dataset.theme === nombreTema);
  });

  // Persistir
  TemaStorage.setTema(nombreTema);
}

/* =========================
   EVENTOS
========================= */
formTarea.addEventListener('submit', (e) => {
  e.preventDefault();
  const texto = inputTarea.value.trim();
  agregarTarea(texto);
  inputTarea.value = '';
  inputTarea.focus();
});

btnLimpiar.addEventListener('click', limpiarTodo);

themeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    aplicarTema(btn.dataset.theme);
  });
});

/* =========================
   INICIALIZACIÓN
========================= */
const temaGuardado = TemaStorage.getTema();
aplicarTema(temaGuardado);
cargarTareas();

if (tareas.length === 0) {
  mostrarMensaje('👋 Bienvenido! Agrega tu primera tarea', 'success');
}