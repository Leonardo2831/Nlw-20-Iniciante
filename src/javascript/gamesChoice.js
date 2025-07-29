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
let indexGames = 0;
let games = [];

function showGames(){
    const height = window.innerHeight;
    
    const morePages = selectItem.Single('#morePages') || null;

    if(morePages) morePages.remove();

    indexGames = indexGames + 20;        

    for(countGames; countGames < indexGames; countGames++){

        if(games[countGames] && height < 768){
            if(countPages === 0 || countGames % 3 === 0){
                countPages++;

                contentOptionGames.innerHTML += `
                    <div id="page${countPages}" class="list-games animation-fadeIn hidden">
                        <li data-value="${games[countGames]}" onclick="selectGameInput(event);">${games[countGames]}</li>
                    </div>  
                `;

                contentListPages.innerHTML += `<li>${countPages}</li>`;
            } else {
                contentOptionGames.children[countPages - 1].innerHTML += `
                    <li data-value="${games[countGames]}" onclick="selectGameInput(event);">${games[countGames]}</li>
                `;
            }
        } else if(games[countGames]) {
            if(countPages === 0 || countGames % 5 === 0){
                countPages++;

                contentOptionGames.innerHTML += `
                    <div id="page${countPages}" class="list-games animation-fadeIn hidden">
                        <li data-value="${games[countGames]}" onclick="selectGameInput(event);">${games[countGames]}</li>
                    </div>  
                `;

                contentListPages.innerHTML += `<li onclick="togglePage(event);">${countPages}</li>`;
            } else {
                contentOptionGames.children[countPages - 1].innerHTML += `
                    <li data-value="${games[countGames]}" onclick="selectGameInput(event);">${games[countGames]}</li>
                `;
            }
        }

    }

    contentOptionGames.children[0].classList.remove(classHidden);

    contentListPages.innerHTML += `
        <li onclick="togglePage(event);" id="morePages" class="flex items-center justify-center gap-1 text-center">
            <div class="w-1 h-1 rounded-full bg-gray-text"></div>
            <div class="w-1 h-1 rounded-full bg-gray-text"></div>
            <div class="w-1 h-1 rounded-full bg-gray-text"></div>
        </li>
    `;
}

window.selectGameInput = ({currentTarget}) => {
    const selectedValue = currentTarget.dataset.value;
    
    selectGame.textContent = selectedValue;
    selectGame.value = selectedValue;
}

const contentItemsSteam = selectItem.Single('#contentItemsSteam');
const textLoading = selectItem.Single('#textLoading');

// [
//     'Counter', 'Overcooked', 'Fortnite', 'Remnant from the ashes', 'Remnant II', 'God of War', 'Counter', 'Overcooked', 'Fortnite', 'GTA',
//     'Counter', 'Overcooked', 'Fortnite', 'Remnant from the ashes', 'Remnant II', 'God of War', 'Counter', 'Overcooked', 'Fortnite', 'GTA'
// ];

// window para definir globalmente e usar no html
window.requestGames = async () => {
    textLoading.classList.remove(classHidden);

    try {
        const response = await fetch('https://nlw-20-iniciante-three.vercel.app/api/requestGames');
        const gamesResponse = await response.json();
        
        games = gamesResponse.map(game => game.name);

        console.log(games);
    
        showGames();
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
        contentOptionGames.children[0].classList.add(classHidden);

        showGames();
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

function filterGamesInfo(){
    infoSearch.classList.remove(classHidden);

    if(inputFilter.value === ''){
        infoSearch.classList.add(classHidden);
    }
}

function addGameSearch(inputTextFilter){
    const termsNameGame = inputTextFilter.toLowerCase().split(' ');

    const gamesFind = games.filter((gameFind) => {
        gameFind.name.toLowerCase().includes(termsNameGame);
    });

    const gamesRemaining = games.filter((gameRemaining) => {
        // pegar os jogos que não batem com a pesquisa
        !gameRemaining.name.toLowerCase().includes(termsNameGame);
    });

    console.log(gamesRemaining);

    games.length = 0;
    games.push(...gamesRemaining);
    console.log(games);
    
    gamesFind.forEach((gameFind) => {
        if(contentOptionGames.children[contentOptionGames.children.length - 1].children.length === 5){
            contentOptionGames.innerHTML += `
                <div id="page${contentOptionGames.children.length + 1}" class="list-games animation-fadeIn hidden">
                    <li data-value="${gameFind.name}" onclick="selectGameInput(event);">${gameFind.name}</li>
                </div>  
            `;

            contentListPages.innerHTML += `<li onclick="togglePage(event);">${countPages}</li>`;
        } else {
            contentOptionGames.children[contentOptionGames.children.length - 1].innerHTML += `
                <li data-value="${gameFind.name}" onclick="selectGameInput(event);">${gameFind.name}</li>
            `;
        }
    });

    indexGames = indexGames + gamesFind;
}

function searchGame(inputTextFilter){
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
            addGameSearch(inputTextFilter);
        }
    });
    
}

inputFilter.addEventListener('input', filterGamesInfo);

inputFilter.addEventListener('keydown', (event) => {
    if(event.key == 'Enter'){
        event.preventDefault();
        searchGame(inputFilter.value);
    }
});