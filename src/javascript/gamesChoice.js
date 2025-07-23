import {Select} from './utility-functions.js';

const selectItem = new Select();

const selectGame = selectItem.Single('#selectGame');
const contentGames = selectItem.Single('#choiceGame');

const classHidden = 'hidden';

window.addEventListener('click', ({target}) => {
    
    if(!contentGames.contains(target)){
        contentGames.classList.add(classHidden);
    }
                
}); 

selectGame.addEventListener('click', (event) => {
    event.stopPropagation();
    contentGames.classList.remove(classHidden);
});