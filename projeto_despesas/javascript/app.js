
// Classe de despesas
class Despesa {
  constructor(ano, mes, dia, tipo, descricao, valor) {
    this.ano = ano
    this.mes = mes
    this.dia = dia
    this.tipo = tipo
    this.descricao = descricao
    this.valor = valor
  }

  validarDespesas() {
    for(let i in this) {
        if(this[i] === undefined || this[i] === null || this[i] === "") {
            return false
        }
    }
    return true
  }
}
// Classe Banco de Dados
class BD {

    constructor() {
        let id = localStorage.getItem('id')

        if(id === null) {
            localStorage.setItem('id', 0)
        }
    }

// Pegando o proximo ID da despesa
    getProximoId() {
        let proxId = localStorage.getItem('id')
        return parseInt(proxId) + 1
    }
// Gravando dados no LocalStorage
    gravar(d) {
        let id = this.getProximoId()
        localStorage.setItem(id, JSON.stringify(d))
        localStorage.setItem('id', id)
      }
// Recuperando todos os dados cadastrados no LocalStorage
    recuperarTodosRegistro() {

       let despesas = Array()

       let id  = localStorage.getItem('id')

       for(let i = 1; i <= id; i++) {
        let des = JSON.parse(localStorage.getItem(i))

        if(des === null) {
            continue
        }
        des.id = i
        despesas.push(des)
       }

       return despesas
    }
// Pesquisando uma despesa no consulta.html
    pesquisar(despesa) {
        // Definindo um filtro
        let despesasFiltradas = Array()
        despesasFiltradas = this.recuperarTodosRegistro()
        if(despesa.ano != "") {
            despesasFiltradas = despesasFiltradas.filter(f => f.ano == despesa.ano)
        }
        if(despesa.mes != "") {
            despesasFiltradas = despesasFiltradas.filter(f => f.mes == despesa.mes)
        }
        if(despesa.dia != "") {
            despesasFiltradas = despesasFiltradas.filter(f => f.dia == despesa.dia)
        }
        if(despesa.tipo != "") {
            despesasFiltradas = despesasFiltradas.filter(f => f.tipo == despesa.tipo)
        }
        
        if(despesa.descricao != "") {
            despesasFiltradas = despesasFiltradas.filter(f => f.descricao == despesa.descricao)
        }
        
        if(despesa.valor != "") {
            despesasFiltradas = despesasFiltradas.filter(f => f.valor == despesa.valor)
        }
        
        return despesasFiltradas
        
    }
// Excluindo uma despesa
    excluir(id) {
        localStorage.removeItem(id)
    }
    

}

let bd = new BD()
// Cadastrando as despesas no LocalStorage
function cadastrarDespesas() {

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

  if(despesa.validarDespesas()) {
    document.getElementById('exampleModalLabel').textContent = "Operação be, sucedida"
    document.getElementById('bodymodal').textContent = "Parabens, sua demanda foi enviada"
    document.getElementById('bodymodal').className ="modal-body text-success"
    document.getElementById('botaomodal').textContent = "Continuar"
    document.getElementById('botaomodal').className ="btn btn-primary bg-success"
    bd.gravar(despesa)
    $("#modal").modal('show')

    ano.value = ""
    mes.value = "" 
    dia.value = "" 
    tipo.value= "" 
    descricao.value = "" 
    valor.value = ""

  }else {
    document.getElementById('exampleModalLabel').textContent = "Operação mal sucedida"
    document.getElementById('bodymodal').textContent = "Preencha todos os campos de forma correta"
    document.getElementById('bodymodal').className ="modal-body text-danger"
    document.getElementById('botaomodal').textContent = "Corrigir"
    document.getElementById('botaomodal').className ="btn btn-primary bg-danger"
    $("#modal").modal('show')
  }
}


// Mostrando uma lista de todas as despesas em consulta.html
function carregarListaDespesas(despesas = Array(), filtro = false) {

if(despesas.length == 0 && filtro == false) {
    despesas = bd.recuperarTodosRegistro()
}
     var listaTable = document.getElementById('listaDespesas')
     listaTable.innerHTML = ""

   despesas.forEach(function(d) {
    let linha = listaTable.insertRow()
    linha.insertCell(0).innerHTML = d.dia + '/' + d.mes + '/' + d.ano
    linha.insertCell(1).innerHTML = d.tipo
    linha.insertCell(2).innerHTML = d.descricao
    linha.insertCell(3).innerHTML = d.valor
    let bnt = document.createElement("button")
    bnt.innerHTML = "Excluir"
    bnt.className ="btn btn-danger text-light"
    bnt.id = d.id
    bnt.onclick = function() {
        bd.excluir(bnt.id)
        window.location.reload()
    }
    linha.insertCell(4).append(bnt)
   })
}


// Pesquisando uma despesa via inputs, e passando os valores da despesa para o bd
function pesquisarDespesa() {
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)
    let despesas = bd.pesquisar(despesa)
    
    carregarListaDespesas(despesas, true)

    
}


