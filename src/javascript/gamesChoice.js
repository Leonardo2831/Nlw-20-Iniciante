import {Select} from './utility-functions.js';

const selectItem = new Select();

const selectGame = selectItem.Single('#selectGame');
const contentGames = selectItem.Single('#choiceGame');

const classHidden = 'hidden';
const classFlex = 'flex';

function filterGames(){

}

const contentOptionGames = selectItem.Single('#optionGamesContent');
const contentListPages = selectItem.Single('#listPages');

let countPages = 0;
let countGames = 0;

function showGames(games){
    const height = window.innerHeight;

    games.forEach((game, index) => {
        if(height < 768){
            if(countPages === 0 || countGames % 3 === 0){
                countPages++;

                contentOptionGames.innerHTML += `
                    <div id="${countPages}" class="list-games animation-fadeIn hidden">
                        <li>${game}</li>
                    </div>  
                `;

                contentListPages.innerHTML += `<li>${countPages}</li>`;
            } else {
                contentOptionGames.children[countPages - 1].innerHTML += `
                    <li>${game}</li>
                `;
            }
        } else {
            if(countPages === 0 || countGames % 5 === 0){
                countPages++;

                contentOptionGames.innerHTML += `
                    <div id="${countPages}" class="list-games animation-fadeIn hidden">
                        <li value="${game}">${game}</li>
                    </div>  
                `;

                contentListPages.innerHTML += `<li>${countPages}</li>`;
            } else {
                contentOptionGames.children[countPages - 1].innerHTML += `
                    <li value="${game}">${game}</li>
                `;
            }
        }

        if(games.length - 1 === index){
            contentListPages.innerHTML += `
                <li onclick="requestGames()" id="morePages" class="flex items-center justify-center gap-1 text-center">
                    <div class="w-1 h-1 rounded-full bg-gray-text"></div>
                    <div class="w-1 h-1 rounded-full bg-gray-text"></div>
                    <div class="w-1 h-1 rounded-full bg-gray-text"></div>
                </li>
            `;
        }
            
        countGames++;
    });

    contentOptionGames.children[0].classList.remove(classHidden);
}

// window para definir globalmente e usar no html
window.requestGames = () => {
    const morePages = selectItem.Single('#morePages') || null;

    if(morePages){
        morePages.textContent = '';
        morePages.classList.add('loadingPages');
    }

    const contentItemsSteam = selectItem.Single('#contentItemsSteam');
    const textLoading = selectItem.Single('#textLoading');
    textLoading.classList.remove(classHidden);

    try {
        // const response = await fetch('https://nlw-20-iniciante-three.vercel.app/api/requestGames');
        // const games = await response.json();
        let games = ['Counter', 'Overcooked', 'Fortnite', 'Remnant from the ashes', 'Remnant II', 'God of War', 'Counter', 'Overcooked', 'Fortnite'];
        
        if(morePages) morePages.remove();
        showGames(games);
    } catch(error) {
        contentOptionGames.innerHTML = `
            <div class="list-games animation-fadeIn">
                <li>Houve um <b>erro</b>, tente novamente mais tarde!</li>
            </div>
        `;   

        console.error(error);
    } finally {
        textLoading.classList.add(classHidden);
        contentItemsSteam.classList.remove(classHidden);
        if(morePages) morePages.remove();
    }
}

requestGames();

window.addEventListener('click', ({target}) => {

    if(!contentGames.contains(target) || contentListPages.contains(target)){
        contentGames.classList.add(classHidden);
        contentGames.classList.remove(classFlex);
    }
                
}); 

selectGame.addEventListener('click', (event) => {
    event.stopPropagation();
    contentGames.classList.remove(classHidden);
    contentGames.classList.add(classFlex);
});