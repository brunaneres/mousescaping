const MouseScaping = {
    isMobile: /Mobi|Android/i.test(navigator.userAgent),

    iniciar() {
        this.verificarTamanhoTela();

        if (this.isMobile){
            this.ativarModoToqueAleatorio();
        } else {
            this.ativarModoFugaMouse();
        }

    this.registrarEventos();
 },

verificarTamanhoTela() {
    const aviso = document.getElementById("aviso-tela");
    const jogo = document.getElementById("area-jogo");
  
    const largura = window.innerWidth;
    const altura = window.innerHeight;
  
    if (largura < 150 || altura < 150) {
      aviso.style.display = "flex";
      jogo.style.display = "none";
    //   console.log("Largura:", largura, "Altura:", altura);
    } else {
      aviso.style.display = "none";
      jogo.style.display = "block";
    }
 },

 ativarModoFugaMouse() {
    document.addEventListener("mousemove", this.fugirDoMouse.bind(this));
 },

 fugirDoMouse(event) {
    document.addEventListener("mousemove", function(event) {
        const container = document.getElementById("area-jogo");
        const containerRect = container.getBoundingClientRect();
        const mousex = event.clientX - containerRect.left;
        const mousey = event.clientY - containerRect.top;
        // console.log("Mouse em:", mousex, mousey);
    
    
        const bola = document.getElementById("bola");
        if (bola) {
        
            const bolaRect = bola.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            
            const bolax = bolaRect.left - containerRect.left;
            const bolay = bolaRect.top - containerRect.top;
            
            // console.log("Bola em:", bolax, bolay);
            
            // distancia vetorial da bola até o mouse 
            const distX = bolax - mousex; 
            const distY = bolay - mousey;
            const distancia = Math.sqrt(distX * distX + distY * distY);
            // console.log("Distância:", distancia);
    
            // se a bola estiver longe do mouse, não faz nada
            if (distancia < 40 && distancia !== 0) {
    
                // normalizar a posição
                const dirX = distX / distancia;
                const dirY = distY / distancia;
                // console.log("Direção:", dirX, dirY);
    
                // distancia aleatória da bola com o mouse
                // const deslocamento = 30 + Math.random() * 20; 
                const deslocamento = 15 + Math.random() * 10; 
                // console.log("Deslocamento:", deslocamento);
    
                const rect = bola.getBoundingClientRect();
                const larguraBola = rect.width;
                const alturaBola = rect.height;
                
                const larguraJanela = window.innerWidth;
                const alturaJanela = window.innerHeight * 0.85;
                
                const novox = Math.min(Math.max(0, bolax + dirX * deslocamento), larguraJanela - larguraBola);
                const novoy = Math.min(Math.max(0, bolay + dirY * deslocamento), alturaJanela - alturaBola);
                
                // verifica se a nova posição está dentro dos limites da janela
                const margem = 10;
                const pegounaborda = (
                    novox <= margem || 
                    novoy <= margem || 
                    novox >= larguraJanela - larguraBola - margem || 
                    novoy >= alturaJanela - alturaBola - margem
                );
    
                // console.log("Nova posição:", novox, novoy);
    
                if (pegounaborda) {
                    // console.log("Pegou na borda da janela, atravessando a tela");
                    // atravessa a tela
                    bola.style.left = (larguraJanela - novox - larguraBola) + "px";
                    bola.style.top = (alturaJanela - novoy - alturaBola) + "px";
                } else {
                    // mover a bola
                    bola.style.left = (novox) + "px";
                    bola.style.top = (novoy) + "px";
                }
            }
        }
      });
 },

 ativarModoToqueAleatorio() {
    const bola = document.getElementById("bola");
    const container = document.getElementById("area-jogo");

    const movimentoAleatorio = () => {
        const larguraMax = container.clientWidth - bola.offsetWidth;
        const alturaMax = container.clientHeight - bola.offsetHeight;
    
        const x = Math.random() * larguraMax;
        const y = Math.random() * alturaMax;
    
        bola.style.left = `${x}px`;
        bola.style.top = `${y}px`;

        bola.style.opacity = 0;
        setTimeout(() => {
            bola.style.opacity = 1;
        }, 50); // ou o tempo que quiser pra "piscar"
    };
    movimentoAleatorio();  
    setInterval(movimentoAleatorio, 550);
},


registrarEventos() {
    window.addEventListener("resize", this.verificarTamanhoTela.bind(this));

    const bola = document.getElementById("bola");
    if (bola) {
    bola.addEventListener("click", () => {
        this.exibirParabens();
    });
    bola.addEventListener("touchstart", () => {
        this.exibirParabens();
    });
    bola.addEventListener("mousedown", () => {
        bola.style.pointerEvents = "none";
        setTimeout(() => {
            bola.style.pointerEvents = "auto";
        }, 150);
    });
    }

    const link = document.getElementById("recomecar");
    if (link) {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            location.reload();
        });
    }
 },
 
 exibirParabens() {
    const mensagem = document.getElementById("parabens");
    mensagem.style.display = "flex";
 },

};


document.addEventListener("DOMContentLoaded", () => {
    MouseScaping.iniciar();
  });
  
