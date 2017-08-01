/* globals $ */

let myIndex = 0;
let lastIndex = 0;
const slideElements = $('.my-slides');
carousel();


function carousel() {
    slideElements[lastIndex].style.display = 'none';
    lastIndex = myIndex;
    slideElements[myIndex++].style.display = 'block';
    myIndex %= slideElements.length;
    setTimeout(carousel, 2000);
}
