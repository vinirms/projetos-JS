//Verificaçao e organização do tamanho da janela
    
    var altura = 0
    var largura = 0
    var vidas = 1
    var tempo = 60

    var baseTempo = 2000

    var nivel = window.location.search
    
    nivel = nivel.replace('?', '')
    
   if(nivel === 'normal'){
        baseTempo = 2000
    } else if(nivel === 'medio'){
        baseTempo = 1500
    } else if (nivel ==='dificil'){
        baseTempo = 750
    }

    function tamanhoJogo(){
    altura = window.innerHeight
    largura = window.innerWidth
    
 }
    tamanhoJogo()

 //Criaçao do cronometro do game
    var cronometro = setInterval(function(){
        
        tempo -= 1

        if(tempo < 0){
            clearInterval(cronometro)
            clearInterval(criarMosca)
            window.location.href = 'victory.html'
            
        } else{
            document.getElementById('cronometro').innerHTML = tempo
        }
       
    }, 1000)

//Criaçao de posições randomicas
    
    function posiçoesRandom(){

       //remoçao da mosca anterior
        if(document.getElementById('mosquito')){
            document.getElementById('mosquito').remove()
            
            //Selecionando as vidas do game
            if(vidas > 3){
                window.location.href = 'fim_jogo.html'
            } else{
                document.getElementById('v' + vidas).src="imagens/coracao_vazio.png"
                
                vidas++
            }
             
        } 

    // (-90) relativo ao tamanho da imagem (mosca) apra nao criar barra da rolagem
    var posicaoX =  Math.floor(Math.random() * largura) - 90
    var posicaoY =  Math.floor(Math.random() * altura) - 90

        posicaoX = posicaoX < 0 ? 0 : posicaoX
        posicaoY = posicaoY < 0 ? 0 : posicaoY

//Elemento HTML

    var mosca = document.createElement('img')
    mosca.src = 'imagens/mosca.png'
    mosca.className = tamanhoRandom() +' '+ ladoAleatorio()//chamada da funçao do tamanho/lado aleatorio das moscas
    mosca.style.left = posicaoX + 'px'
    mosca.style.top = posicaoY + 'px'
    mosca.style.position = 'absolute'
    mosca.id = 'mosquito'
    mosca.onclick = function(){
        this.remove()
    }

    document.body.appendChild(mosca)
}
    

//Função para a criaçao de tamanhos aleatorios das mmoscas
    function tamanhoRandom(){
        var classe = Math.floor(Math.random() * 3)
        switch(classe){
            case 0:
                return 'mosca'
            case 1:
                return 'mosca1'
            case 2:
                return 'mosca2'
        }
        
    }

//Inversao do direcionamento de lados da mosca
    function ladoAleatorio(){
        var classe = Math.floor(Math.random() * 2)
        switch(classe){
            case 0:
                return 'ladoA'
            case 1:
                return 'ladoB'
            
        }
          
    }

    function togglePlay() {
        var audio = document.getElementById("audio");
        return audio.paused ? audio.play() : audio.pause();
      };
