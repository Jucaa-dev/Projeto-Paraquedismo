const API_URL2 = 'http://localhost:3333/api';

$(document).ready(function () {
    async function carregarSaltos() {

        const resposta = await fetch(`${API_URL2}/saltosDeParaquedas`);
        const saltos = await resposta.json();

        const select = $('#tipoSalto');

        select.html(`<option selected disabled>Escolha um salto:</option>`);

        saltos.forEach(salto => {
            select.append(`
            <option value ="${salto.idSalto}">${salto.tipo}</option>
            `);
        });
    }

    $('#agendar').click(function () {

        const saltoSelecionado = $('#tipoSalto').find(':selected').text();
        const dataSelecionada = $('#dataSalto').val();

        if (!saltoSelecionado || !dataSelecionada) {
            alert('Preencha todos os campos!');
            return;
        }

        let [ano,mes,dia] = dataSelecionada.split('-');

        ano = 2026

        const novaData = `${dia}/${mes}/${ano}`;

        const numeroWpp = '5516997491150';
        const mensagem = `Olá, gostaria de agendar um salto de paraquedas do tipo ${saltoSelecionado} para ${novaData}.`;

        const urlWpp = `https://wa.me/${numeroWpp}?text=${encodeURIComponent(mensagem)}`;

        window.open(urlWpp, '_blank');
    });
    carregarSaltos()
})