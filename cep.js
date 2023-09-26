function consultarCEP() {
    const cepInput = document.getElementById('cepInput');
    const resultado = document.getElementById('resultado');

    resultado.innerHTML = '';

    const cep = cepInput.value.replace(/\D/g, '');

    if (cep.length !== 8) {
        resultado.innerHTML = '<p>CEP não encontrado. Digite 8 dígitos.</p>';
        return;
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                resultado.innerHTML = '<p>CEP não encontrado, tente novamente.</p>';
            } else {
                resultado.innerHTML = `
                    <p>CEP: ${data.cep}</p>
                    <p>Logradouro: ${data.logradouro}</p>
                    <p>Bairro: ${data.bairro}</p>
                    <p>Cidade: ${data.localidade}</p>
                    <p>Estado: ${data.uf}</p>
                `;

                calcularFrete(data.uf);
            }
        })
        .catch(error => {
            resultado.innerHTML = '<p>Ocorreu um erro ao buscar o CEP. Tente novamente mais tarde.</p>';
            console.error(error);
        });

    function calcularFrete(estado) {
        var frete;
        var freteInfo = document.getElementById("freteInfo");

        // Frete para região SUDESTE if e else
        if (estado === 'SP' || estado === 'RJ' || estado === 'ES' || estado === 'MG') {
            frete = 5.00;
        }
        // Frete para região NORTE if e else
        else if ((estado === 'AC' || estado === 'AP' || estado === 'AM' || estado === 'PA') ||
            (estado === 'RO' || estado === 'RR' || estado === 'TO')) {
            frete = 20.00;
        }
        // Frete NORDESTE
        else if ((estado === 'MA' || estado === 'PI' || estado === 'CE' || estado === 'RN') ||
            (estado === 'PB' || estado === 'PE' || estado === 'AL' || estado === 'SE' || estado === 'BA')) {
            frete = 18.00;
        }
        // Frete CENTRO-OESTE
        else if ((estado === 'DF' || estado === 'GO' || estado === 'MT' || estado === 'MS')) {
            frete = 15.00;
        }
        // Frete SUL
        else if ((estado === 'PR' || estado === 'SC' || estado === 'RS')) {
            frete = 20.00;
        } else {
            freteInfo.innerHTML = "O frete não está disponível para este estado.";
            return;
        }

        freteInfo.innerHTML = "O frete será de: R$" + frete.toFixed(2);
    }
}
