//importing the named export
import { generateOptions } from './utils.js';
import { handleInput } from './handlers.js';
import { fromSelect, toSelect } from './elements.js';
//importing the default export we do not need curly braces anymore.
import currencies from './currencies.js';


export function init() {
    const form = document.querySelector('.app form');
    const optionsHtml = generateOptions(currencies);
    fromSelect.innerHTML = optionsHtml;
    toSelect.innerHTML = optionsHtml;

    form.addEventListener('input', handleInput);
}