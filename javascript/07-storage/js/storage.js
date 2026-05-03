'use strict';

/* =========================
   SERVICIO DE STORAGE - TAREAS
========================= */

const TareaStorage = {
  CLAVE: 'tareas_lista',

  /**
   * Obtener todas las tareas desde localStorage
   * @returns {Array} Array de tareas
   */
  getAll() {
    try {
      const datos = localStorage.getItem(this.CLAVE);
      if (!datos) {
        return [];
      }
      return JSON.parse(datos);
    } catch (error) {
      console.error('Error al leer tareas:', error);
      return [];
    }
  },

  /**
   * Guardar todas las tareas en localStorage
   * @param {Array} tareas - Array de tareas
   */
  guardar(tareas) {
    try {
      localStorage.setItem(this.CLAVE, JSON.stringify(tareas));
    } catch (error) {
      console.error('Error al guardar tareas:', error);
    }
  },

  /**
   * Crear una nueva tarea
   * @param {string} texto - Texto de la tarea
   * @returns {Object} Tarea creada
   */
  crear(texto) {
    const tareas = this.getAll();
    const nueva = {
      id: Date.now(),
      texto: texto.trim(),
      completada: false,
      fechaCreacion: new Date().toISOString()
    };
    tareas.push(nueva);
    this.guardar(tareas);
    return nueva;
  },

  /**
   * Alternar estado completada/pendiente
   * @param {number} id - ID de la tarea
   */
  toggleCompletada(id) {
    const tareas = this.getAll();
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
      tarea.completada = !tarea.completada;
      this.guardar(tareas);
    }
  },

  /**
   * Eliminar una tarea
   * @param {number} id - ID de la tarea
   */
  eliminar(id) {
    const tareas = this.getAll();
    const filtradas = tareas.filter(t => t.id !== id);
    this.guardar(filtradas);
  },

  /**
   * Eliminar todas las tareas
   */
  limpiarTodo() {
    try {
      localStorage.removeItem(this.CLAVE);
    } catch (error) {
      console.error('Error al limpiar tareas:', error);
    }
  }
};

/* =========================
   SERVICIO DE STORAGE - TEMA
========================= */

const TemaStorage = {
  CLAVE: 'tema_app',

  getTema() {
    try {
      return localStorage.getItem(this.CLAVE) || 'claro';
    } catch (error) {
      console.error('Error al leer tema:', error);
      return 'claro';
    }
  },

  setTema(tema) {
    try {
      localStorage.setItem(this.CLAVE, tema);
    } catch (error) {
      console.error('Error al guardar tema:', error);
    }
  }
};