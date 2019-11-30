// STARTAR VALIDERING
// går igenom alla input-fält
const inputs = document.getElementsByTagName("input");
const radio = document.getElementsByName("gender");

// EVENTS
for (var i = 0; i < inputs.length; i++) {
    // FOCUS = När man väljer ett fält sätts en function som tar bort alerts för det fältet
    inputs[i].onfocus = deleteAlerts; //tar bort meddelanden för inputs

    if (inputs[i].name === "gender"){  //tar bort meddelanden för radio //Ska radio användas istället för gender??????
        inputs[i].onfocus = deleteGenderAlerts;}

    document.getElementById('customerGroup').onfocus = deleteCustomerAlerts; //tar bort meddelanden för customerGroup
    document.getElementById('terms').onfocus = deleteTermsAlerts; //tar bort meddelanden för terms
    
    // BLUR = När man lämnar ett fält sätts doThisOnBlur igång på det fältet
    if (inputs[i].name !== "gender" && inputs[i].id !== "terms") {
        inputs[i].onblur = doThisOnBlur;
    }
    function doThisOnBlur() {
        let id = this.id;
        let value = this.value;
        let validReturn = validate(id, value);
        alert(validReturn, id);}
}

// SUBMIT = När man klickar på submit startar en validering av alla input-fält
document.getElementById("btnSubmit").onclick = submit;

function submit(event) {
  event.preventDefault();

    var errors = 0

  // Tar varje inputs id (förutom radio och terms) och testar det i validate
  for (var e = 0; e < inputs.length; e++) {
    if (inputs[e].name !== "gender" && inputs[e].id !== "terms") {
        let id = inputs[e].id;
        let value = inputs[e].value;
        let validReturn = validate(id, value);
        alert(validReturn, e);     // Meddelar om fel har hittats eller inte

        if (validReturn !== true) { errors++}
    }}

    // Meddelar om någon radiobutton är checked eller inte
    genderAlerts(checkRadio);

    if (checkRadio() !== true) { errors++}

    // Meddelar om någon select har blivit vald
    customerAlerts(checkSelect);

    if (checkSelect() !== true) { errors++}

    // Meddelar om någon select har blivit vald
    termsAlerts(checkTerms);

    if (checkTerms() !== true) { errors++}

    if (errors === 0) {
        document.getElementById("regForm").remove();
        addInput();
        // window.location.href = "someOtherFile.html";
    }

    console.log(`There is something wrong in ${errors} input fields`)
}

// TESTAR VILLKOR
    // Kollar om nån radiobutton är checked
    function checkRadio() {
        for (var e = 0; e < radio.length; e++) {
        if (radio[e].checked) 
            return true;
        }}

    // Testar om customerGroup har blivit selected 
    function checkSelect() {
        let customerForm = document.getElementById('customerGroup');
        if (customerForm.value >= 1)
            return true;
        }

    function checkTerms() {
        let termsCheck = document.getElementById('terms');
        if (termsCheck.checked === true)
            return true;
        }

    function validateEmail(email) {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
        }

    function validatePassword(password) {
        let re2 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{8,}$/;
        return re2.test(password);
        }

function validate(id, value) {

    function length(i) {
        return value.length < i;
        }

  switch (id) {
    case "firstName":
      if (length(2)) {
        return "Please enter your first name.";
      } else return true;

    case "lastName":
      if (length(2)) {
        return "Please enter your last name.";
      } else return true;

    case "email":
      if (length(5)) {
        return "Please insert an email.";
      } else {
        if (validateEmail(value)) {
          return true;
        } else {
          return "It seems this is not a valid email. Please make sure it is correct.";
        }
      }

    case "password":
      if (length(8)) {
        return "Please choose a password at least 8 letters long.";
      } else {
        if (validatePassword(value)) {
          return true;
        } else {
          return "The password must include at least one letter and one number";
        }
      }

    case "message":
      if (length(3)) {
        return "Please enter a message";
      } else return true;
    default:
  }
}

// SKICKA UT OCH TA BORT FELMEDDELANDEN
// Raderar tidigare felmeddelanden
function deleteAlerts() {
    let elements = this.parentNode.getElementsByClassName("invalid-tooltip");
    
    while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
    }
}
function deleteGenderAlerts() {
    if (document.contains(document.getElementById("genderAlert"))) {
        document.getElementById('genderAlert').remove();
    }  
        for (var e = 0; e < radio.length; e++) {
            radio[e].classList.remove("is-invalid");
    }
}

function deleteCustomerAlerts() {
    if (document.contains(document.getElementById('customerAlert'))) {
        document.getElementById('customerAlert').remove();
    }  
        document.getElementById('customerGroup').classList.remove("is-invalid");
}

function deleteTermsAlerts() {
    if (document.contains(document.getElementById('termsAlert'))) {
        document.getElementById('termsAlert').remove();
    }  
        document.getElementById('terms').classList.remove("is-invalid");
}



// Lägger till felmeddelanden och ändrar färger på fält
function alert(validReturn, i) {
  if (validReturn !== true) {
    newDiv = document.createElement("div");
    newDiv.className = "invalid-tooltip";
    newDiv.innerHTML = validReturn;

    inputs[i].classList.remove("is-valid");
    inputs[i].classList.add("is-invalid");
    inputs[i].parentNode.insertBefore(newDiv, inputs[i].nextSibling);
  } else {
    inputs[i].classList.remove("is-invalid");
    inputs[i].classList.add("is-valid");
  }
}

function genderAlerts(x) {
    //   Om ingen radio-button är checked
    if (x() !== true) {
        for (var e = 0; e < radio.length; e++) {
        radio[e].classList.add("is-invalid");}
        
        newDiv = document.createElement("div");
        newDiv.className = "invalid-tooltip";
        newDiv.id = "genderAlert";
        newDiv.classList.add("d-block");
        newDiv.innerHTML = "Please choose an option";
        radio[2].parentNode.parentNode.insertBefore(newDiv,radio[2].parentNode.nextSibling);
        }
        // Om någon radiobutton är checked
        else {
            for (var e = 0; e < radio.length; e++) {
            radio[e].classList.add("is-valid");    
            }
        }
}

function customerAlerts(x) {
    //   Om ingen alternativ är valt
    if (x() !== true) {
        document.getElementById('customerGroup').classList.add("is-invalid");    
        newDiv = document.createElement("div");
        newDiv.className = "invalid-tooltip";
        newDiv.id = "customerAlert";
        newDiv.classList.add("d-block");
        newDiv.innerHTML = "Please select an option in the dropdown list";
        document.getElementById('customerGroup').parentNode.insertBefore(newDiv,document.getElementById('customerGroup').nextSibling);
        }
        // Om någon alternativ är valt
        else {
            for (var e = 0; e < radio.length; e++) {
                document.getElementById('customerGroup').classList.add("is-valid");    
            }
        }
}

function termsAlerts(x) {
    //   Om ingen alternativ är valt
    if (x() !== true) {
        document.getElementById('terms').classList.add("is-invalid");    
        newDiv = document.createElement("div");
        newDiv.className = "invalid-tooltip";
        newDiv.id = "termsAlert";
        newDiv.classList.add("d-block");
        newDiv.innerHTML = "You need to confirm Terms and Conditions to register";
        document.getElementById('terms').parentNode.insertBefore(newDiv,document.getElementById('terms').nextSibling);
        }
        // Om någon alternativ är valt
        else {
            for (var e = 0; e < radio.length; e++) {
                document.getElementById('terms').classList.add("is-valid");    
            }
        }
}




function addInput() {
    const div = document.createElement('div');
  
    div.className = 'input';
  
    div.innerHTML = `
    <form autocomplete="off" id="logInForm">
    <!-- EMAIL & PASSWORD -->
    <div class="form-group col-md-6">
            <input id="logInEmail" type="text" class="form-control" placeholder="Email">
        </div>
        <div class="form-group col-md-6">
            <input id="logInPassword" type="password" class="form-control" placeholder="Password">
        </div>
    </form>
    `;
  
    document.getElementById('containerId').appendChild(div);
  }
