

// sätter igång en funktion


// let input = document.getElementsByTagName('input');
// console.log(input);



function doThisOnBlur(){
    console.log('den funktionen som sätter igång en funktion funkar')
    this.value = 'Focus has been lost';
}
    
    var inputs = document.getElementsByTagName('input');
    var selects = document.getElementsByTagName('select');
    
    for (var i = 0; i < inputs.length; i++)
        inputs[i].onblur = doThisOnBlur;
    for (var i = 0; i < selects.length; i++)
        selects[i].onblur = doThisOnBlur;









// document.getElementsByTagName('input').addEventListener('blur', test());

// function test() {
//     console.log('den funktionen som sätter igång en funktion funkar')
// } 



// this.










// Sätter igång alla funktioner


// let inputs = document.getElementsByTagName('input');
// for (index = 0; index < inputs.length; ++index) {

//     console.log('input')

// }




// Switch med alla cases





// Mall-funktioner




// Sätter ihop en text med value vid id:after


