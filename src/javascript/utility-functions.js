export class Select {

    /**
     * Seleciona o primeiro elemento que casa com o seletor.
     * @param {string} value seletor CSS para selecionar o elemento
     * @returns {HTMLElement | null}
    */
    Single(className){
        return document.querySelector(className);
    }
    
    /**
     * Seleciona todos os elementos que casam com o seletor.
     * @param {string} value seletor CSS para selecionar o elemento
     * @returns {NodeListOf<HTMLElement>}
    */
    All(className){
        return document.querySelectorAll(className);
    }

}