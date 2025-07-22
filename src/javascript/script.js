import {Select} from './utility-functions.js';

const selectItem = new Select();

const inputQuestion = selectItem.Single('#input-question');
const selectGame = selectItem.Single('#selectGame');

const form = selectItem.Single('#form');
const submitButton = selectItem.Single('#submit-button');

const apiResponseContent = selectItem.Single('#aiResponse');

async function responseGimini(response){
    const dataGimini = await response.json();
    const messageIA = dataGimini.message;

    apiResponseContent.querySelector('.response-content').innerHTML = messageIA;
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if(inputQuestion.value == '' || selectGame.value == ''){
        alert('Preencha todos os campos!');  
        return;
    } 

    submitButton.disabled = true;
    submitButton.textContent = 'Perguntando...'
    submitButton.classList.add('animate-loading');
    
    try {

        const response = await fetch("https://nlw-20-iniciante-three.vercel.app/api/requestGimini.js", {
            method: 'POST',
            body: JSON.stringify({
                input: inputQuestion.value,
                contextGame: selectGame.value,
            }),
        });

        responseGimini(response);
        
    } catch {
        // houve um erro, tente novamente mais tarde.
        apiResponseContent.querySelector('.response-content').innerHTML = '<p class="text-gray-text text-[16px] -tracking-[0.18px]">Houve um <b>erro</b>, tente novamente mais tarde!</p>';
        
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Perguntar'
        submitButton.classList.remove('animate-loading');
    }

});