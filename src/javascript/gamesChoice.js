import {Select} from './utility-functions.js';

const selectItem = new Select();

const selectGame = selectItem.Single('#selectGame');
const contentGames = selectItem.Single('#choiceGame');

const classHidden = 'hidden';
const classFlex = 'flex';

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
                    <div id="page${countPages}" class="list-games animation-fadeIn hidden">
                        <li data-value="${game}" onclick="selectGameInput(event);">${game}</li>
                    </div>  
                `;

                contentListPages.innerHTML += `<li>${countPages}</li>`;
            } else {
                contentOptionGames.children[countPages - 1].innerHTML += `
                    <li data-value="${game}" onclick="selectGameInput(event);">${game}</li>
                `;
            }
        } else {
            if(countPages === 0 || countGames % 5 === 0){
                countPages++;

                contentOptionGames.innerHTML += `
                    <div id="page${countPages}" class="list-games animation-fadeIn hidden">
                        <li data-value="${game}" onclick="selectGameInput(event);">${game}</li>
                    </div>  
                `;

                contentListPages.innerHTML += `<li onclick="togglePage(event);">${countPages}</li>`;
            } else {
                contentOptionGames.children[countPages - 1].innerHTML += `
                    <li data-value="${game}" onclick="selectGameInput(event);">${game}</li>
                `;
            }
        }

        if(games.length - 1 === index){
            contentListPages.innerHTML += `
                <li onclick="togglePage(event);" id="morePages" class="flex items-center justify-center gap-1 text-center">
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

window.selectGameInput = ({currentTarget}) => {
    const selectedValue = currentTarget.dataset.value;
    
    selectGame.textContent = selectedValue;
    selectGame.value = selectedValue;
}

const contentItemsSteam = selectItem.Single('#contentItemsSteam');
const textLoading = selectItem.Single('#textLoading');

// window para definir globalmente e usar no html
window.requestGames = async () => {
    const morePages = selectItem.Single('#morePages') || null;

    if(morePages){
        morePages.textContent = '';
        morePages.classList.add('loadingPages');
    }

    textLoading.classList.remove(classHidden);

    try {
        // const response = await fetch('https://nlw-20-iniciante-three.vercel.app/api/requestGames');
        // const gamesTest = await response.json();
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
    if((!contentGames.contains(target) && !target.id) || target.hasAttribute('data-value')){
        contentGames.classList.add(classHidden);
        contentGames.classList.remove(classFlex);
    }         
}); 

selectGame.addEventListener('click', (event) => {
    event.stopPropagation();
    contentGames.classList.remove(classHidden);
    contentGames.classList.add(classFlex);
});

window.togglePage = ({target, currentTarget}) => {

    if(currentTarget.id == 'morePages'){
        requestGames();
    } else {
        const pages = Array.from(target.parentElement.previousElementSibling.children);       

        pages.forEach((page) => {        
            if(!page.classList.contains(classHidden)){
                page.classList.add(classHidden);
            }
        });

        const pageToggle = selectItem.Single(`#page${target.textContent ? target.textContent : null}`);

        if(target.id !== 'morePages' && pageToggle){
            pageToggle.classList.remove(classHidden);
        }
    }

}

const inputFilter = selectItem.Single('#filterGames');
const infoSearch = selectItem.Single('#infoSearch');

function filterGames(){
    infoSearch.classList.remove(classHidden);

    if(inputFilter.value === ''){
        infoSearch.classList.add(classHidden);
    }
}

function fetchGameSearch(arrayTags){
    textLoading.classList.remove(classHidden);
    contentItemsSteam.classList.add(classHidden);

    try {
        
    } catch(error) {
        contentOptionGames.innerHTML += `
            <div id="ErrorFetch"class="list-games animation-fadeIn">
                <li>Seu jogo não foi encontrado ou houve um erro, tente novamente!</li>
            </div>
        `; 

        setTimeout(() => {
            const errorFetch = selectItem.Single('#ErrorFetch') || null;

            if(errorFetch) errorFetch.remove();
        }, 3000);
    } finally {
        textLoading.classList.add(classHidden);
        contentItemsSteam.classList.remove(classHidden);

        arrayTags.forEach((tag) => {
            tag.classList.remove(classHidden);
        });
    }
}

function searchGame(){
    const pagesNumber = contentListPages.children.length - 1;
    let gamesTag = [];
    
    for(let i = 1; i <= pagesNumber; i++){
        const listGamesContent = selectItem.Single(`#page${i}`);   
        const listGames = Array.from(listGamesContent.children);       

        gamesTag = [...gamesTag, ...listGames];
    }

    let countHidden = 0;

    gamesTag.forEach((gameTag, index) => {

        if(gameTag.dataset.value.toLowerCase() !== inputFilter.value.trim().toLowerCase()){
            gameTag.classList.add(classHidden);
            countHidden++;
        }

        if(gamesTag.length === (index + 1) && countHidden === (index + 1)){
            fetchGameSearch(gamesTag);
        }
    });
    
}

inputFilter.addEventListener('input', filterGames);

inputFilter.addEventListener('keydown', (event) => {
    if(event.key == 'Enter'){
        event.preventDefault();
        searchGame();
    }
});