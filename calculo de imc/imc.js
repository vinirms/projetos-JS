function calcular(){
    let altura = document.getElementById('altura')
    let peso = document.getElementById('peso')
    let resultado = document.getElementById('resultado')
    let classe = document.getElementById('classe')

    var height = Number(altura.value)
    var weight = Number(peso.value)
    var imc = Number(weight / (height * height)).toFixed(2)

    resultado.innerHTML= `Seu IMC é: <strong>${imc}! </strong>`

    if(imc <= 18.5){
        classe.innerHTML = 'Você está <span style="color: black;background: red;"><strong>A baixo do peso!</strong></span>'
    } else{
        if(imc <= 29.9){
            classe.innerHTML = 'Você está com peso <span style="color: black;background: green;"><strong>Normal!</strong></span>'
        } else{
            if (imc <= 34.9){
                classe.innerHTML = 'Você está com <span style="color: yellow; background: black;"><strong>Obesidade grau I!</strong></span>'
            } else {
                if (imc <= 39.9){
                    classe.innerHTML = 'Você está com <span style="background: orange;"><strong>Obesidade grau II!</strong></span>'
                } else {
                    if (imc >= 40){
                        classe.innerHTML = ('Você está com <span style="background: red;"><strong>Obesidade Morbida!</strong></span> ')
                    }
                }
            }
        }
    }

}