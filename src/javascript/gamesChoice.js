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

function filterGames(){

}

const contentOptionGames = selectItem.Single('#optionGamesContent');

function showGames(games){
    const contentListPages = selectItem.Single('#listPages');

    for(const game of games){
        let countPages = 1;
        let countItems = 0;
        const height = window.innerHeight;
        console.log(height, games, game);

        if(height < 768){

            if(countPages % 3 === 0 || countPages === 1){
                contentOptionGames.innerHTML += `
                      <div id="${countPages}" class="list-games animation-fadeIn">
                            <li>${game.name}</li>
                      </div>  
                `;

                contentListPages.innerHTML += `<li>${countPages}</li>`;

                countPages++;
            } else {
                contentOptionGames.innerHTML += `
                    <li>${game.name}</li>
                `;
            }
            
        } else {

            if(countPages % 5 === 0 || countPages === 1){
                contentOptionGames.innerHTML += `
                      <div id="${countPages}" class="list-games animation-fadeIn">
                            <li>${game.name}</li>
                      </div>  
                `;

                contentListPages.innerHTML += `<li>${countPages}</li>`;

                countPages++;
            } else {
                contentOptionGames.innerHTML += `
                    <li>${game.name}</li>
                `;
            }

        }

        countItems++;
    }
}

async function requestGames(){
    const contentItemsSteam = selectItem.Single('#contentItemsSteam');
    const textLoading = selectItem.Single('#textLoading');
    textLoading.classList.remove(classHidden);

    try {
        // const response = await fetch('https://nlw-20-iniciante-three.vercel.app/api/requestGames');
        // const games = await response.json();
        let games = ['Counter', 'Overcooked', 'Fortnite', 'Remnant from the ashes', 'Remnant II'];
        
        showGames(games);
    } catch {
        contentOptionGames.innerHTML = `
            <div class="list-games animation-fadeIn">
                <li>Houve um <b>erro</b>, tente novamente mais tarde!</li>
            </div>
        `;
    } finally {
        textLoading.classList.add(classHidden);
        contentItemsSteam.classList.remove(classHidden);
    }
}

requestGames();

selectGame.addEventListener('click', (event) => {
    event.stopPropagation();
    contentGames.classList.remove(classHidden);
    contentGames.classList.add(classFlex);
});