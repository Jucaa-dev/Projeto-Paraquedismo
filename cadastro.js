const API_URL = 'http://localhost:3333/api';


$('#form-cadastro').on("submit", function (e) {
    e.preventDefault();

    const novoCliente = {

        nome: $('#nome').val(),
        email: $('#email').val(),
        cpf: $('#cpf').val(),
        telefone: $('#telefone').val(),
        dataNascimento: $('#nasc').val(),
        senha: $('#senha').val(),
        tipo: "cliente"
    }

    $.ajax({
        url: `${API_URL}/cliente`,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(novoCliente),
        success: function () {
            alert("Cadastro realizado com sucesso")
            $('#form-cadastro')[0].reset()
            window.location.href = `http://127.0.0.1:5500/index.html`
        },
        error: function (err) {
            alert('Não foi possível realizar o cadastro')
            console.log(err)
        }

    })

})
