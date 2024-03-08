class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  }
  
  class Flower {
    constructor(petalCount, center, petalColor, centerColor, maxRadius, speed) {
      this.petalCount = petalCount;
      this.center = center;
      this.petalColor = petalColor;
      this.centerColor = centerColor;
      this.maxRadius = maxRadius;
      this.speed = speed;
      this.currentRadius = 0;
      this.stopChanging = false;
    }
  
    increasePetalRadiusWithLimit() {
      if (this.currentRadius >= this.maxRadius) {
        this.stopChanging = true;
      } else {
        this.currentRadius += this.speed;
      }
    }
  
    draw(context) {
        for (let i = 0; i < this.petalCount; i++) {
            const angle = (Math.PI * 2 * i) / this.petalCount;
            const x = this.center.x + Math.cos(angle) * this.currentRadius;
            const y = this.center.y + Math.sin(angle) * this.currentRadius;
           
            context.beginPath();
            context.arc(x+2, y+2, this.currentRadius / 2, 0, Math.PI * 2);
            context.fillStyle = this.petalColor;
            context.fill();
          }
      context.beginPath();
      context.arc(this.center.x, this.center.y, this.currentRadius / 3, 0, Math.PI * 2);
      context.fillStyle = this.centerColor;
      context.fill();
      
    }
  }
  
  class FlowerRandomizationService {
    getFlowerAt(position) {
      const petalCount = Math.floor(Math.random() * 2) + 5;
      const maxRadius = Math.floor(Math.random() * 30) + 20;
      const speed = Math.random() * 0.5 + 0.5;
      const petalColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`;
      const centerColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`;
      return new Flower(petalCount, position, petalColor, centerColor, maxRadius, speed);
    }
  }
  
  class InteractiveFlowers {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight        
        this.flowers = [];
        this.randomizationService = new FlowerRandomizationService();
        this.ctrlIsPressed = false;
        this.mousePosition = new Point(-100, -100);
        this.context = this.canvas.getContext('2d');
        
        this.addInteractions();
    }
  
    clearCanvas() {
      this.flowers = [];
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  
    animateFlowers() {
      if (this.flowers.every(f => f.stopChanging)) {
        return;
      }
      this.context.clearRect(0, 0, this.canvasW, this.canvasH);
      this.flowers.forEach(flower => {
        flower.increasePetalRadiusWithLimit();
        flower.draw(this.context);
      });
      window.requestAnimationFrame(() => this.animateFlowers());
    }
  
    addInteractions() {
        
      this.canvas.addEventListener('click', e => {
        if (this.flowers.length > 6){
            this.clearCanvas();
            return 
        }
        // if (this.ctrlIsPressed) {
        //   this.clearCanvas();
        //   return;
        // }
        this.calculateMouseRelativePositionInCanvas(e);
        const flower = this.randomizationService.getFlowerAt(this.mousePosition);
        this.flowers.push(flower);
        this.animateFlowers();
      });
      
      window.addEventListener('keydown', e => {
        if (e.which === 17 || e.keyCode === 17) {
            this.clearCanvas();
        }
      });
      window.addEventListener('keyup', () => {
        this.ctrlIsPressed = false;
      });
    }
  
    calculateMouseRelativePositionInCanvas(e) {
      this.mousePosition = new Point(
        e.clientX +
          (document.documentElement.scrollLeft ||
            document.body.scrollLeft) -
          this.canvas.offsetLeft,
        e.clientY +
          (document.documentElement.scrollTop ||
            document.body.scrollTop) -
          this.canvas.offsetTop
      );
    }
  }
  