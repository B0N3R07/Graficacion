import { canvasLocal } from './canvasLocal.js';
// Inicialización del QR
const canvas = document.getElementById('trazadoqr') as HTMLCanvasElement;
new canvasLocal(canvas);