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

// async function requestGames(){
//     const contentOptionGames = selectItem.Single('#optionGamesContent');

//     let url = `https://api.rawg.io/api/games?key=${API_KEY_GAMES}&page_size=5`;

//     try {
//         const resposta = await fetch(url);

//         if (!resposta.ok) {
//             throw new Error(`Erro na página ${pagina}: ${resposta.status}`);
//         }

//         const data = await resposta.json();
//         console.log(data);
//         contentOptionGames.innerHTML = '';
        
//         for(const game of data.results){
//             console.log(game);
            
//             const imageGame = game.background_image;
//             const nameGame = game.name;
//             console.log(imageGame, nameGame);
            

//             contentOptionGames.innerHTML += `
//                 <img src="${imageGame}" alt="${nameGame}" class="w-[230px] object-cover rounded-lg box-shadow[0_1px_2px_rgba(0_0_0_0.3)]"></img>
//             `;

//             console.log(contentOptionGames);
            
//         }

//     } catch (error) {
//         console.log('Ocorreu um erro ' + error);        
//     }
// }

// requestGames();

async function requestGames(){
    const response = await fetch('https://nlw-20-iniciante-three.vercel.app/api/requestGames');
    const games = await response.json();

    console.log(games);
    
}

requestGames();

selectGame.addEventListener('click', (event) => {
    event.stopPropagation();
    contentGames.classList.remove(classHidden);
    contentGames.classList.add(classFlex);
});