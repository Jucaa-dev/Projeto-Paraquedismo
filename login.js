const API_URL = 'http://localhost:3333/api';

$('#login').click(function () {
    const dados = {
        email: $('#email'),
        senha: $('#senha')
    };

    $.ajax({
        url: API_URL,
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

