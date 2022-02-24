class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }
    validarDados(){
        for(let i  in this){
            if(this[i] == undefined || this[i] == '' || this[i] == null){
                return false
            }
        }
        return true
    }
}

class Bd {

    constructor() {
        let id = localStorage.getItem('id')
        
        if(id === null){
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() {

        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    armazenar(d){
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))
        
        localStorage.setItem('id', id)
    }

    recuperarRegistros(){
    //array despesas
        let despesas = Array()

        let id = localStorage.getItem('id')

        for(let i = 1; i <= id; i++){
            let despesa = JSON.parse(localStorage.getItem(i)) 
            
            if(despesa === null){
                continue
            }

            despesa.id = i
            despesas.push(despesa)

           
        }
        return despesas
    } 

    pesquisar(despesa){

        let despesasFiltradas =Array()

        despesasFiltradas = this.recuperarRegistros()

        console.log(despesa)
        console.log(despesasFiltradas)
       

        //filtro ano
        if(despesa.ano != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano )
        }
        //filtro mes
        if(despesa.mes != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes )
        }
        //filtro dia
        if(despesa.dia != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia )
        }
        //filtro tipo
        if(despesa.tipo != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo )
        }
        //filtro descricao
        if(despesa.descricao != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao )
        }

        // filtro valor
        if(despesa.valor != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor )
        }

        return despesasFiltradas
    }

    remover(id){
        localStorage.removeItem(id)
    }

}

    let bd = new Bd()


function cadastrar(){

   let ano = document.getElementById('ano')
   let mes = document.getElementById('mes')
   let dia = document.getElementById('dia')
   let tipo = document.getElementById('tipo')
   let descricao = document.getElementById('descricao')
   let valor = document.getElementById('valor')

   let despesa = new Despesa(
    ano.value,
    mes.value,
    dia.value,
    tipo.value,
    descricao.value,
    valor.value
 )

    if(despesa.validarDados()){
        bd.armazenar(despesa)

        if($('#registroDespesa').modal('show')){
            let h5 = document.getElementById('exampleModalLabel')
            h5.innerHTML= '<span style="color: green;">Dados validados com  sucesso!</span>'
            let corpo = document.getElementById('corpo')
            corpo.innerHTML = 'Despesas cadastradas com sucesso!'
            let btn = document.getElementById('btn')
                btn.innerHTML = '<span>Voltar</span>'
                btn.className ='btn btn-success'
        
        ano.value =''
        mes.value =''
        dia.value =''
        tipo.value =''
        descricao.value =''
        valor.value =''
        }
    
    } else { //dados invalidos
        
        if($('#registroDespesa').modal('show')){
            let h5 = document.getElementById('exampleModalLabel')
              h5.innerHTML= '<span style="color: red;"><strong>Dados inválidos!</strong></span>'

            let corpo = document.getElementById('corpo')
                corpo.innerHTML = 'Preencha os campos obrigatorios!'
            
           }
    
    }
  
}
 
function carregarDespesas(despesas = Array(), filtro = false){

    if(despesas.length == 0 && filtro == false){
        despesas =  bd.recuperarRegistros()
    }
    //despesas = bd.recuperarRegistros()

    let lista = document.getElementById('lista')
    lista.innerHTML= ''

    despesas.forEach(function(d){
        let linha = lista.insertRow()
        linha.insertCell(0).innerHTML = `${d.dia} / ${d.mes} / ${d.ano}`
       
        switch(d.tipo){
            case '1': d.tipo = 'Alimentação'
            break
            case '2': d.tipo = 'Educação'
            break
            case '3': d.tipo = 'Lazer'
            break
            case '4': d.tipo = 'Saúde'
            break
            case '5': d.tipo = 'Transporte'
            break
        }
        linha.insertCell(1).innerHTML = d.tipo

        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

        //botao de exclusao
        let btn = document.createElement("button")
        btn.className ='btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = d.id
        btn.onclick = function(){
        bd.remover(this.id)
        window.location.reload()
       
        }
        linha.insertCell(4).append(btn)
    })

        
}

function filtroDespesa(){

    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia , tipo, descricao, valor)
    
    let despesas = bd.pesquisar(despesa)
    
    carregarDespesas(despesas, true)

}



