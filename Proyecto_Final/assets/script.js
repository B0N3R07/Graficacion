"use strict";
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];
let hue = 0;
const mouse = {
    x: 0,
    y: 0,
    radius: 120,
    click: false,
};
window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});
window.addEventListener("mousedown", () => {
    mouse.click = true;
});
window.addEventListener("mouseup", () => {
    mouse.click = false;
});
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});
// Clase que representa una partícula
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 2;
        this.baseSize = this.size;
        this.vx = (Math.random() - 0.5) * 3;
        this.vy = (Math.random() - 0.5) * 3;
        this.hueOffset = Math.random() * 360;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${(hue + this.hueOffset) % 360}, 100%, 60%)`;
        ctx.shadowColor = "white";
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.closePath();
    }
    update() {
        // Movimiento
        this.x += this.vx;
        this.y += this.vy;
        // Rebote en los bordes
        if (this.x < 0 || this.x > canvas.width)
            this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height)
            this.vy *= -1;
        // Detectar cercanía del mouse
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        // Agrandarse al acercarse al mouse
        if (distance < mouse.radius && this.size < 25) {
            this.size += 1;
        }
        else if (this.size > this.baseSize) {
            this.size -= 0.5;
            if (this.size < this.baseSize)
                this.size = this.baseSize;
        }
        // Si se hace clic cerca, "explota"
        if (mouse.click && distance < mouse.radius) {
            this.vx = (Math.random() - 0.5) * 10;
            this.vy = (Math.random() - 0.5) * 10;
        }
        this.draw();
    }
}
// Crear partículas
function initParticles() {
    particles = [];
    for (let i = 0; i < 150; i++) {
        particles.push(new Particle());
    }
}
// Animación
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hue += 1;
    for (const p of particles) {
        p.update();
    }
    requestAnimationFrame(animate);
}
initParticles();
animate();
