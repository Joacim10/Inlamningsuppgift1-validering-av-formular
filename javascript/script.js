// Skapar en lista av alla inputs
let inputs = document.getElementsByTagName("input");
let selects = document.getElementsByTagName("select");

// Lägger till en onblur på varje input
for (var i = 0; i < inputs.length; i++) inputs[i].onblur = doThisOnBlur;
for (var i = 0; i < selects.length; i++) selects[i].onblur = doThisOnBlur;

// sätter igång en funktion vid blur
function doThisOnBlur() {
  this.value = alert();
  let id = this.id;
  validate(id);
}

// Mall-funktioner
// En mall-funktion med alert
function alert() {
  //   console.log("Alert funkar");
  return "Focus has been lost";
}

// Testar alla fält
document.getElementById("btnSubmit").onclick = submit;

function submit(event) {
  for (var i = 0; i < inputs.length; i++) {
    // tar id och testar det
    let id = inputs[i].id;
    validate(id);

    inputs[i].value = alert();
  }

  for (var i = 0; i < selects.length; i++) selects[i].value = alert();

  event.preventDefault();
}

// En funktion som testar villkor för varje fält
function validate(id) {

  switch (id) {
    case "firstName":
      console.log("lastname funkar");
      console.log("lastname2 funkar");
      break;
    case "lastName":
      break;

    default:
    //   console.log("switchen funkar");
  }
}

// Sätter ihop en text med value vid id:after
