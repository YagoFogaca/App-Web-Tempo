const cidade = document.querySelector("#cidade");

const uf = document.querySelector("#uf");

const busca = document.querySelector("#buscar");

async function buscaAPI(dados) {
    const nome = dados[0];

    const uf = dados[1];

    const resp = await fetch(`https://api.hgbrasil.com/weather?format=json-cors&key=00011215&city_name=${nome},${uf}`);

    const data = await resp.json();

    return data;
}

function dadosInput() {
    let dados = [cidade.value, uf.value];

    return dados;
}

async function criarElementos(resultsAPI) {
    const data = await resultsAPI;

    const results = await data.results;

    console.log(data.results);

    let date = "";

    let max = "";

    let min = "";

    let dia = "";

    for (let i = 0; i < 5; i++) {
        date += results.date[i];
    }

    results.forecast.forEach(function (item) {
        if (item.date === date) {
            max = item.max;

            min = item.min;

            dia = item.weekday;
        }
    });

    document.querySelector("#secao_principal").insertAdjacentHTML(
        "beforeend",
        `<div id="container">
        <div>
            <h2 id="container_titulo-texto">${results.city}</h2>
        </div>
        <div id="container_card-cima">
            <div id="container_card-clima">
                <i class="bi bi-brightness-high"></i>
                <p>${results.temp}º</p>
            </div>
            <div id="container_card-temperatura">
                <p>${max}º</p>
                <p>${min}º</p>
            </div>
        </div>
        <div id="container_card-baixo">
            <div class="container_card-descricao">
                <p>${results.description}</p>
                <p>Humidade : ${results.humidity}%</p>
            </div>
            <div class="container_card-descricao">
                <p>Nascer do sol: ${results.sunrise}</p>
                <p>Por do sol: ${results.sunset}</p>
            </div>
        </div>
    </div>`
    );

    if (results.description === "Tempo limpo") {
        document.querySelector("i").classList.add("bi-brightness-high");
    } else if (results.description === "Chuva") {
        document.querySelector("i").classList.add("bi-cloud-rain");
    } else if (results.description === "Tempo nublado") {
        document.querySelector("i").classList.add("bi-cloud-sun");
    }
}

busca.addEventListener("click", async function () {
    let dados = dadosInput();

    const resultsAPI = await buscaAPI(dados);

    if (!(document.querySelector("#container") === null)) {
        document.querySelector("#container").remove();
    }

    document.querySelector("#secao_principal").style.display = "flex";

    criarElementos(await resultsAPI);
});
