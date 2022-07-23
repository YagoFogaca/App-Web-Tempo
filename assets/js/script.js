const cidade = document.querySelector("#cidade");

const uf = document.querySelector("#uf");

const busca = document.querySelector("#buscar");

async function buscaGeocodeAPI(dados) {
    let geoCode = "";

    const nome = dados[0];

    const uf = dados[1];

    const respGc = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/distritos`);

    const dataGc = await respGc.json();

    dataGc.forEach((item) => {
        if (item.nome === nome) {
            console.log(item.nome);

            geoCode = item.municipio.id;
        }
    });

    return geoCode;
}

async function buscaClimaAPI(geoCode) {
    console.log(geoCode);

    const resp = await fetch(`https://apiprevmet3.inmet.gov.br/previsao/${geoCode}`);

    const data = await resp.json();

    console.log(data);
}

function elementos() {
    const cidade = document.querySelector("#cidade");

    const uf = document.querySelector("#uf");

    let dados = [cidade.value, uf.value];

    return dados;
}

busca.addEventListener("click", async function () {
    let dados = elementos();

    const geoCode = buscaGeocodeAPI(dados);

    buscaClimaAPI(await geoCode);
});
