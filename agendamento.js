const API_URL2 = 'http://localhost:3333/api';

$(document).ready(function () {
    async function carregarSaltos() {
        
        const resposta =  await fetch(`${API_URL2}/saltosDeParaquedas`);
        const saltos = await resposta.json();

        const select = $('#tipoSalto');

        select.html(`<option selected disabled>Escolha um salto:</option>`);

        saltos.forEach(salto => {
            select.append(`
            <option value ="${salto.idSalto}">
                ${salto.tipo}
            </option>
            `);
        });
    }
    carregarSaltos()
})