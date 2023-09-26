
        function Conversao(){
            fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL').then(resposta => {
                return resposta.json()
            }).then(economia => {
                
                for(i = 1; i <= 9; i++){
                    valor = parseInt(document.getElementById(`dolar${i}`).innerHTML)
                    console.log(valor)
                    converter = economia.USDBRL.bid*valor;
            
                    const total = parseFloat(converter.toFixed(2));
            
                    document.getElementById(`real${i}`).innerHTML= total
                }
               
            })
        }
    