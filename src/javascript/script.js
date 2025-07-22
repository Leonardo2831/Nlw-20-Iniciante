import Showdown from 'showdown';
import {Select} from './utility-functions.js';

const selectItem = new Select();

const inputQuestion = selectItem.Single('#input-question');
const selectGame = selectItem.Single('#selectGame');

const form = selectItem.Single('#form');
const submitButton = selectItem.Single('#submit-button');

const apiResponseContent = selectItem.Single('#aiResponse');

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
        
        const dataGimini = await response.json();
        const messageIA = dataGimini.message;

        // para converter texto
        const convertText = new Showdown.Converter();
        const convertToHtml = convertText.makeHtml(messageIA);

        apiResponseContent.querySelector('.response-content').innerHTML = convertToHtml;
        
    } catch {
        // houve um erro, tente novamente mais tarde.
        
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Perguntar'
        submitButton.classList.remove('animate-loading');
    }

});