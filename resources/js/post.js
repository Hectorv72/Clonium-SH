const imgReload = document.getElementById('reload');
const inpSubmit = document.getElementById('enviar');
const inpText   = document.getElementById('response');
const divResult = document.getElementById('result');

const reiniciar = async () => {
    const response = await fetch('/random');
    const json     = await response.json();

    imgReload.src       = json.image;
    divResult.innerHTML = '';

}

const verificar = async () => {

    const response = await fetch('/respuesta', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            response: inpText.value
        })
    });

    const json = await response.json();
    return json.message;
}


const resultado = async () => {
    response = await verificar();

    divResult.innerHTML = `
        <h1>${response}</h1>
    `;
    setTimeout(reiniciar,1000);
}


inpSubmit.addEventListener('click', () => {
    resultado();
})


reiniciar();