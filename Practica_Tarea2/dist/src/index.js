import { CanvasLocal } from './canvasLocal.js';
let canvas = document.getElementById('circlechart');
let graphics = canvas.getContext("2d");
const ctx = canvas.getContext('2d');
const grafico = new CanvasLocal(ctx, canvas);
grafico.prepararCanvas();
// Parámetros: posiciónX, altura, color, etiqueta(opcional)
grafico.dibujarBarra(2, 20, '#3498db');
grafico.dibujarBarra(4, 20, '#e74c3c');
grafico.dibujarBarra(6, 20, '#2ecc71');
grafico.dibujarBarra(8, 20, '#f39c12');
