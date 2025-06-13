//====== Esta es la clase principal que hace todo el chisme del QR
export class canvasLocal {
    //=== Constructor que se ejecuta al crear el QR
    constructor(canvas) {
        this.canvas = canvas;
        //=== Aqui agarramos el contexto 2D del canvas
        this.ctx = canvas.getContext('2d');
        //=== Ajustamos el tamaño pa que quede cuadradito
        const tamaño = Math.min(canvas.width, canvas.height);
        canvas.width = tamaño;
        canvas.height = tamaño;
        this.tamanoPixel = tamaño / 25; // 25x25 cuadritos
        //=== Pedimos la URL apenas carga la página
        const url = prompt('Pega tu URL aquí:', 'https://hola.com');
        if (url) {
            this.crearQR(url); //=== Si puso algo, hacemos el QR
        }
    }
    //====== Esto dibuja un solo cuadrito del QR
    dibujarCuadrito(x, y, color) {
        //=== Primero ponemos el colorcito
        this.ctx.fillStyle = color;
        //=== Luego dibujamos el cuadrito
        this.ctx.fillRect(x * this.tamanoPixel, //=== Posición X
        y * this.tamanoPixel, //=== Posición Y
        this.tamanoPixel, //=== Ancho
        this.tamanoPixel //=== Alto
        );
    }
    //====== Esto dibuja los cuadros grandes de las esquinas
    dibujarEsquinas(x, y) {
        //=== Cuadro negro grandote (7x7)
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 7; j++) {
                this.dibujarCuadrito(x + i, y + j, 'black');
            }
        }
        //=== Cuadro blanco mediano (5x5)
        for (let i = 1; i < 6; i++) {
            for (let j = 1; j < 6; j++) {
                this.dibujarCuadrito(x + i, y + j, 'red');
            }
        }
        //=== Cuadrito negro chiquito (3x3)
        for (let i = 2; i < 5; i++) {
            for (let j = 2; j < 5; j++) {
                this.dibujarCuadrito(x + i, y + j, 'black');
            }
        }
    }
    //====== Esto dibuja las rayitas de en medio
    dibujarRayitas() {
        for (let i = 8; i < 17; i++) {
            //=== Rayita horizontal (alterna colores)
            this.dibujarCuadrito(i, 6, i % 2 === 0 ? 'black' : 'white');
            //=== Rayita vertical (alterna colores)
            this.dibujarCuadrito(6, i, i % 2 === 0 ? 'black' : 'white');
        }
    }
    //====== Aqui ocurre la magia de crear el QR completo
    crearQR(texto) {
        //=== Limpiamos todo por si acaso
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //=== Dibujamos las 3 esquinitas
        this.dibujarEsquinas(0, 0); // Arriba izquierda
        this.dibujarEsquinas(0, 18); // Abajo izquierda
        this.dibujarEsquinas(18, 0); // Arriba derecha
        //=== Dibujamos las rayitas del medio
        this.dibujarRayitas();
        //=== Convertimos el texto a bits (1s y 0s)
        let bits = '';
        for (let i = 0; i < texto.length; i++) {
            //=== Cada letra se convierte en 8 bits
            bits += texto[i].charCodeAt(0).toString(2).padStart(8, '0');
        }
        //=== Rellenamos el QR con los bits
        let indiceBit = 0;
        for (let x = 0; x < 25; x++) {
            for (let y = 0; y < 25; y++) {
                //=== No dibujar donde ya hay cosas
                const esAreaEspecial = (x < 8 && y < 8) || (x < 8 && y > 16) ||
                    (x > 16 && y < 8) || (x === 6 || y === 6);
                if (!esAreaEspecial) {
                    //=== Si hay bits, usarlos, sino poner random
                    const bit = indiceBit < bits.length ? bits[indiceBit] : Math.random() > 0.5 ? '1' : '0';
                    this.dibujarCuadrito(x, y, bit === '1' ? 'black' : 'white');
                    indiceBit++;
                }
            }
        }
    }
}
//=== Esto se ejecuta cuando carga la página
const canvas = document.getElementById('trazadoqr');
//=== Creamos el QR con el canvas
new canvasLocal(canvas);
