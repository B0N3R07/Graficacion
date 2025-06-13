export class CanvasLocal {
  graphics: CanvasRenderingContext2D;
  rWidth: number;
  rHeight: number;
  maxX: number;
  maxY: number;
  pixelSize: number;
  centerX: number;
  centerY: number;

  constructor(g: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
      this.graphics = g;//Grafico
      this.rWidth = 6;//
      this.rHeight = 6;
      this.maxX = canvas.width - 1;
      this.maxY = canvas.height - 1;
      this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
      this.centerX = this.maxX / 2;
      this.centerY = this.maxY / 2;
  }

  iX(x: number): number { return Math.round(this.centerX + x / this.pixelSize); }//Covertimos a pixeles x
  iY(y: number): number { return Math.round(this.centerY - y / this.pixelSize); }//convertimos a pixeles Y

  //Dibujado
  drawLine(x1: number, y1: number, x2: number, y2: number): void {
      this.graphics.beginPath();
      this.graphics.moveTo(x1, y1);
      this.graphics.lineTo(x2, y2);
      this.graphics.closePath();
      this.graphics.stroke();
  }
  //===============Dibujado==========================//

  paint(): void 
  {
      const sizeofsquare = 400;//tamaño del cuadrado que dibujo
      // Dnde lo ponemos pa' que quede en medio
      const inicioX = (this.maxX - sizeofsquare) / 2;//tanño del cuadrado /2 para X
      const inicioY = (this.maxY - sizeofsquare) / 2;;//tanño del cuadrado /2 para Y

      //===========eSquinas de mi cuadrado================================//
      let esquina1 = {x: inicioX, y: inicioY}; // A. IZQ
      let esquina2 = {x: inicioX + sizeofsquare, y: inicioY}; // A.DER
      let esquina3 = {x: esquina2.x, y: inicioY + sizeofsquare}; // ABAJO.DER
      let esquina4 = {x: esquina1.x, y: esquina3.y}; // ABAJO,IZQ

      // Tamaño del cuadrado dentro del primero
      const rtanano = 0.03;

      //===============Ciclo para dibujar los cuadrados=====================//
      for (let i = 0; i < 80; i++) {
          // Dibujamos el cuadro actual
      
          this.drawLine(esquina1.x, esquina1.y, esquina2.x, esquina2.y);//L.D.ARRIBA
          this.drawLine(esquina2.x, esquina2.y, esquina3.x, esquina3.y);//L.DER
          this.drawLine(esquina3.x, esquina3.y, esquina4.x, esquina4.y);//LADO DE BAJP
          this.drawLine(esquina4.x, esquina4.y, esquina1.x, esquina1.y);//LADO IZQUIERDO
          //Reduzco el tamaño del cuadrado=========//
          //Esquina uno se mueve hace esquina 2
          esquina1.x += (esquina2.x - esquina1.x) * rtanano;
          esquina1.y += (esquina2.y - esquina1.y) * rtanano;
          
      //esqyina 2 se mueve a 3
          esquina2.x += (esquina3.x - esquina2.x) * rtanano;
          esquina2.y += (esquina3.y - esquina2.y) * rtanano;
          
          // Esquina 3 se mv a 4
          esquina3.x += (esquina4.x - esquina3.x) * rtanano;
          esquina3.y += (esquina4.y - esquina3.y) * rtanano;
          
          // Esquina cuadtro se mueve a
          esquina4.x += (esquina1.x - esquina4.x) * rtanano;
          esquina4.y += (esquina1.y - esquina4.y) * rtanano;
      }
  }
}