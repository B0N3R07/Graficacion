export class CanvasLocal {
  // Kontexto del canvas y propiedads
  private ctx: CanvasRenderingContext2D;
  private anchoTotal: number = 12;  // Ancho en unidads lójikas
  private altoTotal: number = 8;    // Alto en unidads lójikas
  private tamanoPixel: number;
  private centroX: number;
  private centroY: number;
  private maxX: number;
  private maxY: number;

  constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.ctx = ctx;
    this.maxX = canvas.width - 1;
    this.maxY = canvas.height - 1;
    // alculo del tamaño de pixel y entro
    this.tamanoPixel = Math.max(this.anchoTotal / this.maxX, this.altoTotal / this.maxY);
    this.centroX = this.maxX / 12;
    this.centroY = (this.maxY / 8) * 7;  // Posisión del "suelo" del grafico
  }
  //=========Notas para mi mismo==========
  // - El centroX y centroY se calculan para que el origen (0,0) esté en la esquina inferior izquierda del canvas.
  // - El método aX y aY convierten las coordenadas lógicas a coordenadas del canvas.
  // - El método dibujarLinea se usa para dibujar líneas en el canvas.
  // - El método dibujarBarra3D crea una barra con un efecto 3D.
  // - El método dibujarBarra dibuja una barra con un porcentaje dado y un color específico.
 //Para dibujar la babarra  al 100% tome el maxi

  // ========== Metodo para obtener X y Y ========== //
  private aX(x: number): number {
    return Math.round(this.centroX + x / this.tamanoPixel);
  }
  private aY(y: number): number {
    return Math.round(this.centroY - y / this.tamanoPixel);
  }

  // Método para dibujar lineas para armar el grafico
  private dibujarLinea(x1: number, y1: number, x2: number, y2: number): void {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  // ========== MÉTODO PRINCIPAL PARA BARRAS ========== //
 dibujarBarra(x: number, porzentaje: number, color: string, etiketa?: string): void {
    //otenemos el porcentajee debe ser un número entre 0 y 100
    const porzentajeAjustado = Math.max(0, Math.min(100, porzentaje));
    // Calculamos la altura total de la barra
    const alturaTotal = 6;
  
    const alturaRelleno = (porzentajeAjustado / 100) * alturaTotal;

    // Validamos el  color (si no es válido, usamos un default)
    this.ctx.fillStyle = "rgba(231, 226, 226, 0.3)";
    // Dubujando tablan base
    this.dibujarBarra3D(x, alturaTotal, this.ctx.fillStyle);

    // Dibujo el relleno
    this.ctx.fillStyle = color;
    this.dibujarBarra3D(x, alturaRelleno, this.ctx.fillStyle);

    //========Etiqueta de porcen
      this.ctx.fillStyle = "black";
      this.ctx.font = "bold 16px Arial";
      this.ctx.textAlign = "center";
      // Mostramos "Etiketa (XX%)" arriba de la barra
      this.ctx.fillText(`(${porzentajeAjustado}%)`, this.aX(x), this.aY(alturaTotal + 0.4));
    //===========================================//
  }

  // ========== Edecto  3D ========== //
  private dibujarBarra3D(x: number, altura: number, color: string): void {
    // Parte frontal de la barra
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.moveTo(this.aX(x), this.aY(0));
    this.ctx.lineTo(this.aX(x - 0.5), this.aY(0.5));
    this.ctx.lineTo(this.aX(x - 0.5), this.aY(altura));
    this.ctx.lineTo(this.aX(x), this.aY(altura - 0.5));
    this.ctx.lineTo(this.aX(x + 0.5), this.aY(altura));
    this.ctx.lineTo(this.aX(x + 0.5), this.aY(0.5));
    this.ctx.closePath();
    this.ctx.fill();
    
    //Si la barra tiene altura, dibujamos los efectos 3D
    if (altura > 0.5) {
      //Sombras lados
      this.ctx.strokeStyle = 'gray';
      this.dibujarLinea(this.aX(x - 0.5), this.aY(altura), this.aX(x - 0.5), this.aY(this.altoTotal - 2));
      this.dibujarLinea(this.aX(x), this.aY(altura - 0.5), this.aX(x), this.aY(this.altoTotal - 2.5));
      this.dibujarLinea(this.aX(x + 0.5), this.aY(altura), this.aX(x + 0.5), this.aY(this.altoTotal - 2));

      

      // Efectos de sombra (lado derecho)
      this.ctx.fillStyle = "#D5DBDB";
      this.ctx.beginPath();
      this.ctx.moveTo(this.aX(x), this.aY(altura - 0.5));
      this.ctx.lineTo(this.aX(x), this.aY(this.altoTotal - 2.5));
      this.ctx.lineTo(this.aX(x + 0.5), this.aY(this.altoTotal - 2));
      this.ctx.lineTo(this.aX(x + 0.5), this.aY(altura));
      this.ctx.closePath();
      this.ctx.fill();

      // EFECTOS DE SOMBRA (lado izquierdo)
      this.ctx.fillStyle = "#91918F";
      this.ctx.beginPath();
      this.ctx.moveTo(this.aX(x - 0.5), this.aY(altura));
      this.ctx.lineTo(this.aX(x - 0.5), this.aY(this.altoTotal - 2));
      this.ctx.lineTo(this.aX(x), this.aY(this.altoTotal - 2.5));
      this.ctx.lineTo(this.aX(x), this.aY(altura - 0.5));
      this.ctx.closePath();
      this.ctx.fill();
    }
  }

  // ========== PREPARAR CANVAS ========== //
  public prepararCanvas(): void {
    // lLImpiar el canvas
    this.ctx.clearRect(0, 0, this.maxX, this.maxY);
    
    // Eje X (horizontal)
    this.ctx.strokeStyle = 'red';
    this.dibujarLinea(this.aX(0), this.aY(0), this.aX(12), this.aY(0));
    
    // Eje Y (vertical)
    this.ctx.strokeStyle = 'blue';
    this.dibujarLinea(this.aX(0), this.aY(0), this.aX(0), this.aY(6));
    
    // Etiquetas de los ejes X
    this.ctx.fillStyle = "red";
    this.ctx.font = "bold 16px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText("X", this.aX(6), this.aY(-0.5));
    
    // etiqueta del eje Y
    this.ctx.save();
    this.ctx.translate(this.aX(-0.5), this.aY(3));
    this.ctx.rotate(-Math.PI / 2);
    this.ctx.fillText("Y", 0, 0);
    this.ctx.restore();
  }
}