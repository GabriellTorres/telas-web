
$(document).ready(function(){
    
    let dados =  obterDados();
    
    if(dados != null){
        gerarCards(dados);
    }else{
        console.log("Dados nulos");
    }

    $(document).on('click', '.detalhes', apresentarDetalhes);
    $(document).on('click', '.btn-sair', fecharPopUp);


});

function fecharPopUp(){
    $(this).closest('.bg-dark.bg-opacity-50.position-fixed').remove();
}

function  gerarCards(dados){

    let cardsContainer = $('.cards');

    dados.then(data => {
        data.forEach(pokemon => {

            let card = `
            <div class="col "> 
            <div class="card card_individual border-light rounded-3">
            
            <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="${pokemon.name}">
                <div class="card-body">
                    <h5 class="card-title">${pokemon.name}</h5>
                    <p class="card-txt">Peso: ${pokemon.weight} <br>
                     Altura: ${pokemon.height}</p>
                    <button class="detalhes btn btn-primary" value="${pokemon.name}">Detalhes</button>
                </div>

            </div>
            </div>`;

            cardsContainer.append(card);

        });
    })
    

}

async function apresentarDetalhes(){

    let name = $(this).val().trim(); 
        

    let dados = await obterDadosIndividual(name);
    console.log(dados);

    let dadosEspecies = await obterDadosEspecificos(dados.species.url);

    console.log(dadosEspecies);

    if(dados == null || dadosEspecies == null){
        throw new Error("Ocorreu um problema com o servidor!");
    }

    let tipo1 = dados.types[0].type.name;
    let tipo2 = (dados.types[1]) ? dados.types[1].type.name : 'Não possui tipagem secundária';

    console.log(tipo1);
    console.log(tipo2);

    let body = $(".body-html");
    let popUp = `
    
        <div class="bg-dark bg-opacity-50 position-fixed w-100 h-100 top-0 start-0 d-flex justify-content-center align-items-center">
            <div class="w-50 bg-light d-flex flex-column rounded-3 p-3">
                <button class="btn-sair btn btn-secondary align-self-end rounded"> Sair </button>
                <div class="imagens d-flex justify-content-evenly">
                    <img src="${dados.sprites.front_default}" alt="${dados.name}">
                    <img src="${dados.sprites.back_default}" alt="${dados.name}">
                </div>    

                <div class="dados">
                    <h3> ${dados.name} </h3>
                    <p> <strong>Geração: </strong>${dadosEspecies.generation.name}</p>
                    <p> <strong>Habitat: </strong>${dadosEspecies.habitat.name} | <strong> Cor: </strong> ${dadosEspecies.color.name} </p>
                    <p> <strong>Tipo 1: </strong> ${tipo1} | <strong>Tipo 2: </strong> ${tipo2}</p>
                    <p> <strong>Altura: </strong> ${dados.height} | <strong>Largura: </strong> ${dados.weight} </p>

                    <br>

                    <p> ${dadosEspecies.flavor_text_entries[0].flavor_text} <br> <br>
                        ${dadosEspecies.flavor_text_entries[2].flavor_text} <br> <br>
                        ${dadosEspecies.flavor_text_entries[3].flavor_text}
                    </p>
                    
                </div>
            </div
        </div>

    `

    body.append(popUp);

}

async function obterDadosEspecificos(url) {

    let urlFinal = url.trim();
    
    let dados = await fetch(urlFinal)
    .then(response => response.json())
    .catch(error => console.error('Error: ', error));

    return dados;
}

async function obterDadosIndividual(name) {
    
    let dados = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(response => response.json())
    .catch(error => console.error('Error: ', error));

    return dados;
}


async function obterDados(){
    let i = 1;
    let data = [];
    while( i != 10){

        let dados = await fetch('https://pokeapi.co/api/v2/pokemon/'+i)
        .then(response => response.json())
        .catch(error => console.error('Error: ', error));
        data.push(dados);
        i++;
    }

    console.log(data);
    return data;
}