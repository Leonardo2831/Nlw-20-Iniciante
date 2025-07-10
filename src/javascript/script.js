import {Select} from './utility-functions.js';

const selectItem = new Select();

const inputQuestion = selectItem.Single('#input-question');
const submitButton = selectItem.Single('#submit-button');
const apiResponseContent = selectItem.Single('#aiResponse');
const form = selectItem.Single('#form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
});