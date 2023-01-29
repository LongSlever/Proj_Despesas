
// Classe Cadastrar Usuarios
class Usuario {
    constructor(nome, email, senha, senhaconfirma, cpf, salario){
        this.nome = nome
        this.email = email
        this.senha = senha
        this.senhaconfirma = senhaconfirma
        this.cpf = cpf
        this.salario = salario
    }

// Verificando se o cadastro é válido
    validarCadastro() {
        for(let i in this) {
                if(this[i] === undefined || this[i] === null || this[i] === "") {
                    return false
            }
        }
        return true
      }
}


// Classe de Banco do usuario
class BDUsuario {
    constructor() {
        let id = localStorage.getItem('id_cadastro')

        if(id === null) {
            localStorage.setItem('id_cadastro', 0)
        }
    }

//Definindo o próximo ID do usuario
    getProximoId() {
        let proxId = localStorage.getItem('id_cadastro')
        return parseInt(proxId) + 1 
    }

    cadastrar(user) {
        let id = this.getProximoId()
        localStorage.setItem(id,JSON.stringify(user))
        localStorage.setItem('id_cadastro', id)
      }
// Recuperando todos os registros e retornando em um array
    recuperarTodosRegistro() {

        let usuarios = Array()
 
        let id  = localStorage.getItem('id_cadastro')
 
        for(let i = 1; i <= id; i++) {
         let user = JSON.parse(localStorage.getItem(i))
 
         if(user === null) {
             continue
         }
         user.id = i
         usuarios.push(user)
        }
 
        return usuarios
     }
}

// Instancia de classe
let bdNew = new BDUsuario()

// Mostrando os modals de sucesso/erro
function mostrar() {
    document.getElementById('minimo').className = "text-danger text-center" 
    let senha = document.getElementById('senha').value
    let senhaconfirma = document.getElementById('senhaconfirma').value
    
    if(senha.length >= 10) {
        document.getElementById('minimo').innerHTML = "Senha Forte"
        document.getElementById('minimo').className = "text-success text-center" 
    } else {
        document.getElementById('minimo').innerHTML = "A senha deve ter no minimo 10 caracteres"
    }

    if(senhaconfirma != "" && senhaconfirma == senha) {
        document.getElementById('igual').innerHTML = "As duas senhas são iguais"
        document.getElementById('igual').className = "text-success text-center" 
    }else {
        document.getElementById('igual').innerHTML = "As duas senhas DEVEM ser iguais"
        document.getElementById('igual').className = "text-danger text-center" 
    }
    
}

//Cadastrando um usuario com os inputs
function cadastrarUsuario() {
    let nome = document.getElementById('nome').value
    let email = document.getElementById('email').value
    let senha = document.getElementById('senha').value
    let senhaconfirma = document.getElementById('senhaconfirma').value
    let cpf = document.getElementById('cpf').value
    let salario = document.getElementById('salario').value

    let user = new Usuario(nome, email, senha, senhaconfirma,  cpf, salario)
    
   
// Verificação lógica para mostrar o modal de erro ou de sucesso
    if(user.validarCadastro()) {
        document.getElementById('exampleModalLabel').textContent = "Operação bem sucedida"
        document.getElementById('bodymodal').textContent = "Parabens, sua conta foi criada"
        document.getElementById('bodymodal').className ="modal-body text-success"
        document.getElementById('botaomodal').textContent = "Continuar"
        document.getElementById('botaomodal').className ="btn btn-primary bg-success"
        bdNew.cadastrar(user)
        $("#modal").modal('show')

    }
    else {
        document.getElementById('exampleModalLabel').textContent = "Operação mal sucedida"
        document.getElementById('bodymodal').textContent = "Preencha todos os campos de forma correta"
        document.getElementById('bodymodal').className ="modal-body text-danger"
        document.getElementById('botaomodal').textContent = "Corrigir"
        document.getElementById('botaomodal').className ="btn btn-primary bg-danger"
        $("#modal").modal('show')
      }
}


// Verificando se existe um registro cadastrado no LocalStorage, caso sim, liberar o acesso
function verificarRegistro(){
    let usuarios = Array() 
    usuarios = bdNew.recuperarTodosRegistro()
    let login = document.getElementById('login').value
    let senha = document.getElementById('senha').value

    usuarios.forEach(function(u) {  
        if(u.email === login && u.senha === senha) {
            window.location.href="perfil.html"
            
        } else {
            document.getElementById('erro').className = "text-danger text-center" 
        }}
       )
    
}
// Carregando os dados para a perfil.html, e mostrando nos h2
function carregarDados() {
  
    let usuarios = Array()
    usuarios = bdNew.recuperarTodosRegistro()
    


    usuarios.forEach(function(u) {  
        document.getElementById('nome').innerHTML = u.nome
        document.getElementById('email').innerHTML = u.email
        document.getElementById('cpf').innerHTML = u.cpf
        document.getElementById('salario').innerHTML = u.salario
    }
       )
    
}
