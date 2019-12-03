var inputs = document.getElementsByTagName("input"); //en lista av alla inputs som används i flera funktioner
const radio = document.getElementsByName("gender"); //en lista av alla radio-inputs som används i flera funktioner
var page = 'registration'; //börjar med sidan regitration

// Events som startar automatisk validering på varje fält. Blur och focus.
inputEvents();
function inputEvents() {
for (var i = 0; i < inputs.length; i++) {

    // BLUR = När man lämnar ett input-fält sätts doThisOnBlur igång på det fältet 
    if (inputs[i].name !== "gender" && inputs[i].id !== "terms") {inputs[i].onblur = doThisOnBlur;}
    function doThisOnBlur() {  // doThisOnBlur validerar det fält som man lämnar och skapar meddelanden 
        let id = this.id;
        let value = this.value;
        let validReturn = inputValidate(id, value);
        alert(validReturn, id);}
        
    // FOCUS = När man väljer ett fält startas deleteAlerts som tar bort alla alerts för det fältet
    inputs[i].onfocus = deleteAlerts; //tar bort meddelanden för inputs
    if (inputs[i].name === "gender"){inputs[i].onfocus = deleteGenderAlerts;} //tar bort meddelanden för alla gender, dvs alla radio buttons
}}

document.getElementById('customerGroup').onfocus = deleteCustomerAlerts; //tar bort meddelanden för customerGroup när man väljer det fältet
document.getElementById('terms').onfocus = deleteTermsAlerts; //tar bort meddelanden för terms när man väljer det fältet

// SUBMIT = När man klickar på submit eller login-knappen startas en validering av alla fält
document.getElementById("btnSubmit").onclick = submit;

function submit() {
    event.preventDefault();
    let errors = 0; //Varje gång man trycker på submit eller login-knappen så börjar errors från noll

    // Funktionen inputLoop tar varje inputs id (förutom gender och terms som är radio och checkbox-inputs) och testar det i inputValidate.
    // Därefter startas alert som meddelar vilka fel som hittats
    inputLoop();
    function inputLoop() {
        for (var e = 0; e < inputs.length; e++) {
          if (inputs[e].name !== "gender" && inputs[e].id !== "terms") {
              let id = inputs[e].id;
              let value = inputs[e].value;
              let validReturn = inputValidate(id, value);
              alert(validReturn, e);     // Meddelar om fel har hittats eller inte
              if (validReturn !== true) { errors++}
    }}}

    if (page === 'registration') {
        // Meddelar om någon radiobutton är vald eller inte
        genderAlerts(checkRadio);
        if (checkRadio() !== true) { errors++}

        // Meddelar om någon select har blivit vald eller inte
        customerAlerts(checkSelect);
        if (checkSelect() !== true) { errors++}

        // Meddelar om checkbox har blivit ikryssad
        termsAlerts(checkTerms);
        if (checkTerms() !== true) { errors++}
    }

    // Byter "sida" om inga fel har hittats 
    if (errors === 0) {
        if (page === 'registration') {
            document.getElementById("regForm").remove();
            addLogin(); //skapar login-sidan
            page = 'login';
        } else {
            document.getElementById('formContainer').remove();
            youAreLoggedIn();
    }}
    else
    console.log(`There is something wrong in ${errors} input fields`)
}

// TESTAR VILLKOR
    // Kollar om någon radiobutton är checked
    function checkRadio() {
        for (var e = 0; e < radio.length; e++) {
        if (radio[e].checked) 
            return true;}}

    // Testar om customerGroup har blivit selected 
    function checkSelect() {
        let customerForm = document.getElementById('customerGroup');
        if (customerForm.value >= 1)
            return true;}

    function checkTerms() {
        let termsCheck = document.getElementById('terms');
        if (termsCheck.checked === true)
            return true;}


function inputValidate(id, value) {

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
                return "Please insert your email.";
            } else {
                if (validateEmail(value)) {
                return true;
                } else {
                return "It seems this is not a valid email. Please make sure it is correct.";
            }}

        case "password":
            if (length(8)) {
                return "Please insert a password at least 8 letters long.";
            } else {
                if (validatePassword(value)) {
                return true;
                } else {
                return "The password must include at least one letter and one number";
            }}

        case "message":
            if (length(3)) {
                return "Please enter a message";
            } else return true;
    }

    function validateEmail(email) {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);}

    function validatePassword(password) {
        let re2 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{8,}$/;
        return re2.test(password);}

    function length(i) {
        return value.length < i;
    }
}

// FUNKTIONER FÖR ATT SKICKA UT OCH TA BORT FELMEDDELANDEN

// Raderar tidigare felmeddelanden
function deleteAlerts() {
    let elements = this.parentNode.getElementsByClassName("invalid-tooltip");
    removeAll(elements);
}

function deleteGenderAlerts() {
    if (document.contains(document.getElementById('genderAlert'))){
        let elements = document.getElementById('genderAlert').parentNode.getElementsByClassName("invalid-tooltip");
        removeAll(elements);}

    for (var e = 0; e < radio.length; e++) {
    radio[e].classList.remove("is-invalid");
}}

function deleteCustomerAlerts() {
    if (document.contains(document.getElementById('customerAlert'))){
    let elements = document.getElementById('customerAlert').parentNode.getElementsByClassName("invalid-tooltip");
    removeAll(elements);}

    document.getElementById('customerGroup').classList.remove("is-invalid");
}

function deleteTermsAlerts() {
    if (document.contains(document.getElementById('termsAlert'))){
    let elements = document.getElementById('termsAlert').parentNode.getElementsByClassName("invalid-tooltip");
    removeAll(elements);}

    document.getElementById('terms').classList.remove("is-invalid");
}

function removeAll(elements) {
    while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
}}

// Lägger till felmeddelanden och ändrar färger på fält
function alert(validReturn, i) {
    // Om det var fel i något input-fält så händer det här
  if (validReturn !== true) {
    newDiv = document.createElement("div");
    newDiv.className = "invalid-tooltip";
    newDiv.innerHTML = validReturn;

    inputs[i].classList.remove("is-valid");
    inputs[i].classList.add("is-invalid");
    inputs[i].parentNode.insertBefore(newDiv, inputs[i].nextSibling);
    // Om alla input-fält var korrekta så händer det här
  } else {
    inputs[i].classList.remove("is-invalid");
    inputs[i].classList.add("is-valid");
}}

function genderAlerts(x) {
    //   Om ingen radio-button är vald så händer det här
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
        // Om någon radiobutton är vald så händer det här
        else {
            for (var e = 0; e < radio.length; e++) {
            radio[e].classList.add("is-valid");    
}}}

function customerAlerts(x) {
    //   Om inget alternativ är valt så händer det här
    if (x() !== true) {
        document.getElementById('customerGroup').classList.add("is-invalid");   

        newDiv = document.createElement("div");
        newDiv.className = "invalid-tooltip";
        newDiv.id = "customerAlert";
        newDiv.classList.add("d-block");
        newDiv.innerHTML = "Please select an option in the dropdown list";
        document.getElementById('customerGroup').parentNode.insertBefore(newDiv,document.getElementById('customerGroup').nextSibling);
        }
        // Om något alternativ är valt så händer det här
        else {
            for (var e = 0; e < radio.length; e++) {
                document.getElementById('customerGroup').classList.add("is-valid");    
}}}

function termsAlerts(x) {
    //   Om checkboxen inte är ikryssad så händer det här
    if (x() !== true) {
        document.getElementById('terms').classList.add("is-invalid");    
        newDiv = document.createElement("div");
        newDiv.className = "invalid-tooltip";
        newDiv.id = "termsAlert";
        newDiv.classList.add("d-block");
        newDiv.innerHTML = "You need to confirm Terms and Conditions to register";
        document.getElementById('terms').parentNode.insertBefore(newDiv,document.getElementById('terms').nextSibling);
        }
        // Om checkboxen är ikryssad så händer det här
        else {
            for (var e = 0; e < radio.length; e++) {
                document.getElementById('terms').classList.add("is-valid");    
}}}

// Skapar inloggninsformuläret och meddelande om att man är registrerad 
function addLogin() {
    const div = document.createElement('form');
    div.className = 'login';
    div.innerHTML = `
        <div class="m-4">You are now registred!</div>
        <form autocomplete="off" id="logInForm" class="m-5">
        <!-- EMAIL & PASSWORD -->
        <div class="form-group col-md-6">
                <input id="email" type="text" class="form-control" placeholder="Email">
            </div>
            <div class="form-group col-md-6">
                <input id="password" type="password" class="form-control" placeholder="Password">
            </div>
            <div class="form-group col-md-6">
                <button id="btnLogin" type="submit" class="btn btn-primary">Login</button>
            </div>
        </form>`;
  
    document.getElementById('formContainer').appendChild(div);

    // Uppdaterar listan på inputs och sätter on-events på inputs
    inputs = document.getElementsByTagName("input");
    inputEvents();

    document.getElementById("btnLogin").addEventListener("click", function(event){
        event.preventDefault();
        submit();
})}

// Skapar meddelande att man är inloggad
function youAreLoggedIn() {
    const div = document.createElement('div');
    div.className = 'LoggedIn';
    div.innerHTML = `<div class="m-4">You are now logged in!</div>`;
  
    document.getElementById('containerId').appendChild(div);
}


