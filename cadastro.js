const API_URL = 'http://localhost:3333/api';

$('#cadastro').click(function (e) {
    e.preventDefault();

    const dados = {
        nome: $('#nome').val(),
        email: $('#email').val(),
        cpf: $('#cpf').val(),
        telefone: $('#telefone').val(),
        dataNascimento: $('#nasc').val(),
        senha: $('#senha').val()
    };

    $.ajax({
        url: `${API_URL}/cliente`,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(dados),
        success: function (res) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('cliente',res.cliente);
            alert('Login efetuado com sucesso!')
            window.location.href = `${API_URL}/index.html`
        },
        error: function (err) {
            alert('Usuário ou senha incorretos')
            console.log(err)
        }
    })
})

