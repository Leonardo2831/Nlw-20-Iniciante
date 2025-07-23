import {Select} from './utility-functions.js';

const selectItem = new Select();

const selectGame = selectItem.Single('#selectGame');
const contentGames = selectItem.Single('#choiceGame');

const classHidden = 'hidden';
const classFlex = 'flex';

window.addEventListener('click', ({target}) => {
    
    if(!contentGames.contains(target)){
        contentGames.classList.add(classHidden);
        contentGames.classList.remove(classFlex);
    }
                
}); 

selectGame.addEventListener('click', (event) => {
    event.stopPropagation();
    contentGames.classList.remove(classHidden);
    contentGames.classList.add(classFlex);
});