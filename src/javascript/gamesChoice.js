import {Select} from './utility-functions.js';

const selectItem = new Select();

const selectGame = selectItem.Single('#selectGame');
const contentGames = selectItem.Single('#choiceGame');

const classHidden = 'hidden';
const classFlex = 'flex';

const contentOptionGames = selectItem.Single('#optionGamesContent');
const contentListPages = selectItem.Single('#listPages');

let countPages = 1;
let indexGames = 0;
let games = [];

function showGames(indexGamesPage){
    indexGamesPage ??= 1;
    
    let countGames = 0;
    const height = window.innerHeight;

    if(height < 768){
        countGames = indexGamesPage * 3;
        indexGames = countGames - 3;
    } else {
        countGames = indexGamesPage * 5;
        indexGames = countGames - 5;
    }

    contentOptionGames.innerHTML = '';
    for(indexGames; indexGames < countGames; indexGames++){            
        contentOptionGames.innerHTML += `
            <li data-value="${games[indexGames]}" onclick="selectGameInput(event);">${games[indexGames]}</li>
        `;
    }

    if(countPages === 1){
        contentListPages.innerHTML += `
            <li onclick="togglePage(event);" class="flex items-center justify-center gap-1 text-center">${countPages}</li>
            <li onclick="togglePage(event);" class="flex items-center justify-center gap-1 text-center">${++countPages}</li>
            <li onclick="togglePage(event);" class="flex items-center justify-center gap-1 text-center">${++countPages}</li>
        `;

        contentListPages.innerHTML += `
            <li onclick="togglePage(event);" id="morePages" class="flex items-center justify-center gap-1 text-center">
                <div class="w-1 h-1 rounded-full bg-gray-text"></div>
                <div class="w-1 h-1 rounded-full bg-gray-text"></div>
                <div class="w-1 h-1 rounded-full bg-gray-text"></div>
            </li>
        `;
    }
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
    textLoading.classList.remove(classHidden);

    try {

        games = [
            'Counter', 'Overcooked', 'Fortnite', 'Remnant from the ashes', 'Remnant II', 'God of War', 'Counter', 'Overcooked', 'Fortnite', 'GTA',
            'Counter', 'Overcooked', 'Fortnite', 'Remnant from the ashes', 'Remnant II', 'God of War', 'Counter', 'Overcooked', 'Fortnite', 'GTA',
            'Counter', 'Overcooked', 'Fortnite', 'Remnant from the ashes', 'Remnant II', 'God of War', 'Counter', 'Overcooked', 'Fortnite', 'GTA',
            'Counter', 'Overcooked', 'Fortnite', 'Remnant from the ashes', 'Remnant II', 'God of War', 'Counter', 'Overcooked', 'Fortnite', 'GTA',
            'Counter', 'Overcooked', 'Fortnite', 'Remnant from the ashes', 'Remnant II', 'God of War', 'Counter', 'Overcooked', 'Fortnite', 'GTA',
            'Counter', 'Overcooked', 'Fortnite', 'Remnant from the ashes', 'Remnant II', 'God of War', 'Counter', 'Overcooked', 'Fortnite', 'GTA',
        ];
        // const response = await fetch('https://nlw-20-iniciante-three.vercel.app/api/requestGames');
        // const gamesResponse = await response.json();
        
        // games = gamesResponse.map(game => game.name);
    
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
    if((!contentGames.contains(target) && (target.parentElement && !target.parentElement.id)) || target.hasAttribute('data-value')){
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
    contentOptionGames.innerHTML = '';

    if(currentTarget.id === 'morePages'){
        selectItem.Single('#morePages').remove();

        contentListPages.innerHTML += `
            <li onclick="togglePage(event);" class="flex items-center justify-center gap-1 text-center">${++countPages}</li>
            <li onclick="togglePage(event);" class="flex items-center justify-center gap-1 text-center">${++countPages}</li>
        `;
        contentListPages.innerHTML += `
            <li onclick="togglePage(event);" id="morePages" class="flex items-center justify-center gap-1 text-center">
                <div class="w-1 h-1 rounded-full bg-gray-text"></div>
                <div class="w-1 h-1 rounded-full bg-gray-text"></div>
                <div class="w-1 h-1 rounded-full bg-gray-text"></div>
            </li>
        `;
        
        showGames(contentListPages.children.length - 2);
    } else {        
        showGames(Number(target.textContent));
    }
}

const inputFilter = selectItem.Single('#filterGames');
const infoSearch = selectItem.Single('#infoSearch');
const fuse = new Fuse(games, { threshold: 0 });

function filterGamesInfo(){
    infoSearch.classList.remove(classHidden);

    if(inputFilter.value === ''){
        infoSearch.classList.add(classHidden);
    }
}

function addGameSearch(inputTextFilter){

    const resultsSearch = fuse.search(inputTextFilter);
    const gamesFind = resultsSearch.map(result => result.item);

    gamesFind.forEach((gameFind) =>{
        const indexRemove = games.indexOf(gameFind);

        games.splice(indexRemove, 1);
    });
    
    gamesFind.forEach((gameFind) => {
        if(contentOptionGames.children[contentOptionGames.children.length - 1].children.length === 5){
            contentOptionGames.innerHTML += `
                <div id="page${contentOptionGames.children.length + 1}" class="list-games animation-fadeIn hidden">
                    <li data-value="${gameFind}" onclick="selectGameInput(event);">${gameFind}</li>
                </div>  
            `;

            contentListPages.innerHTML += `<li onclick="togglePage(event);">${countPages}</li>`;
        } else {
            contentOptionGames.children[contentOptionGames.children.length - 1].innerHTML += `
                <li data-value="${gameFind}" onclick="selectGameInput(event);">${gameFind}</li>
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