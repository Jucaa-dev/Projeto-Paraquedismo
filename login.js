const API_URL = 'http://localhost:3333/api';

$(document).ready(function () {

    function estarLogado(){
        const token = localStorage.getItem('token')

        if (token) {
            $('.logo-login').addClass('logado')
            $('#img-login').attr("href", "perfil.html")
            $('#btn-login').addClass('logadobotao')
            $('#btn-cadastro').addClass('logadobotao')
        }
    }
    estarLogado()


    $('#login').click(function () {
        const dados = {
            email: $('#email').val(),
            senha: $('#senha').val()
        };
        console.log(dados)
        $.ajax({
            url: `${API_URL}/login`,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(dados),
            success: function (res) {
                localStorage.setItem('token', res.token);
                localStorage.setItem('cliente', res.cliente);
                alert('Login efetuado com sucesso!')
                window.location.href = `http://127.0.0.1:5500/index.html`
            },
            error: function (err) {
                alert('Usuário ou senha incorretos')
                console.log(err)
            }
        })
    })


    $('#btn-logout').click(function () {
        localStorage.removeItem('token');
        localStorage.removeItem('cliente');
        location.reload();
        alert('Você saiu da sua conta!')
        window.location.href = `http://127.0.0.1:5500/index.html`;
    })
})
