var inputs = document.getElementsByTagName('input'); //en lista av alla inputs, används i flera funktioner
const radio = document.getElementsByName('gender'); //en lista av alla radio-inputs, används i flera funktioner
var page = 'registration'; //börjar på sidan "registration".

// EVENTS

inputEvents();   // Lägger till events som startar validering på varje enskilt input-fält i det aktuella formuläret.
function inputEvents() {   
    for (var i = 0; i < inputs.length; i++) {

        // Blur = När man lämnar ett input-fält sätts doThisOnBlur igång på det fältet 
        if (inputs[i].name !== 'gender' && inputs[i].id !== 'terms') {inputs[i].onblur = doThisOnBlur;}
        function doThisOnBlur() {  // doThisOnBlur validerar det fält som man lämnar och skapar meddelanden 
            let id = this.id;
            let value = this.value;
            let validReturn = inputValidate(id, value);
            inputAlert(validReturn, id);}

        // Focus = När man väljer ett fält tas alla alert-meddelanden bort för det fältet
        inputs[i].onfocus = deleteInputAlerts;
        if (inputs[i].name === 'gender'){inputs[i].onfocus = deleteGenderAlerts;} //tar bort meddelanden för alla radio buttons
}}

document.getElementById('customerGroup').onfocus = deleteCustomerAlerts; //tar bort meddelanden för customerGroup när man väljer det fältet
document.getElementById('message').onclick = deleteMessageAlerts; //tar bort meddelanden för message när man väljer det fältet
document.getElementById('terms').onfocus = deleteTermsAlerts; //tar bort meddelanden för terms när man väljer det fältet
document.getElementById('message').onblur = messageBlur; //validerar message-fältet när man lämnar fältet och skapar meddelanden

    function messageBlur() {
        let validReturn = checkMessage;
        messageAlerts(validReturn);}

document.getElementById('btnSubmit').onclick = submit;

// Submit = När man klickar på submit eller login-knappen startas en validering av alla fält
function submit() {
    event.preventDefault();
    let errors = 0; //Varje gång man trycker på submit eller login-knappen så börjar errors från noll

    inputLoop();      // Funktionen inputLoop tar varje inputs id (förutom gender och terms som är radio och checkbox-inputs) och testar det i inputValidate.
    function inputLoop() {
        for (var e = 0; e < inputs.length; e++) {
          if (inputs[e].name !== 'gender' && inputs[e].id !== 'terms') {
              let id = inputs[e].id;
              let value = inputs[e].value;
              let validReturn = inputValidate(id, value);
              inputAlert(validReturn, e);     // inputAlert meddelar om fel har hittats eller inte
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

        // Meddelar om message har blivit ifyllt
        messageAlerts(checkMessage);
        if (checkMessage() !== true) { errors++}
    }

    // Byter 'sida' om inga fel har hittats 
    if (errors === 0) {
        if (page === 'registration') {
            document.getElementById('regForm').remove();
            addLogin(); //skapar login-sidan
            page = 'login';
        }   else {
            document.getElementById('formContainer').remove();
            youAreLoggedIn();
    }}
    else
    console.log(`There is something wrong in ${errors} input fields`)
}

// FUNKTIONER FÖR ATT TESTA VILLKOR

    function checkRadio() {       // Testar om någon radiobutton är checked
        for (var e = 0; e < radio.length; e++) {
        if (radio[e].checked) 
            return true;}}

    function checkSelect() {      // Testar om customerGroup har blivit selected 
        let customerForm = document.getElementById('customerGroup');
        if (customerForm.value >= 1)
            return true;}

    function checkTerms() {       // Testar om terms har blivit ikryssad 
        let terms = document.getElementById('terms');
        if (terms.checked === true)
            return true;}

    function checkMessage() {       // Testar om message har blivit ifyllt 
        let message = document.getElementById('message');
        if (message.value.length >= 3) 
            return true;
        }

function inputValidate(id, value) {   //Testar alla input-fält

    switch (id) {
        case 'firstName':
            if (length(2)) {
                return 'Please enter your first name.';
            } else return true;

        case 'lastName':
            if (length(2)) {
                return 'Please enter your last name.';
            } else return true;

        case 'email':
            if (length(5)) {
                return 'Please insert your email.';
            } else {
                if (validateEmail(value)) {
                return true;
                } else return 'It seems this is not a valid email. Please make sure it is correct.';
            }

        case 'password':
            if (length(8)) {
                return 'Please insert a password at least 8 letters long.';
            } else {
                if (validatePassword(value)) {
                return true;
                } else return 'The password must include at least one letter and one number';
            }
    }

    function validateEmail(email) {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);}

    function validatePassword(password) {
        let re2 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{8,}$/;
        return re2.test(password);}

    function length(i) {
        return value.length < i;}
}

// FUNKTIONER FÖR ATT TA BORT FELMEDDELANDEN

function deleteInputAlerts() {
    let elements = this.parentNode.getElementsByClassName('invalid-tooltip');
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0])}
}

function deleteGenderAlerts() {
    removeAll('genderAlert');
    for (var e = 0; e < radio.length; e++) {
    radio[e].classList.remove('is-invalid');
}}

function deleteCustomerAlerts() {
    removeAll('customerAlert');
    document.getElementById('customerGroup').classList.remove('is-invalid');
}

function deleteMessageAlerts() {
    removeAll('messageAlert');
    document.getElementById('message').classList.remove('is-invalid');
    document.getElementById('message').classList.remove('is-valid');
}

function deleteTermsAlerts() {
    removeAll('termsAlert');
    document.getElementById('terms').classList.remove('is-invalid');
}

    function removeAll(id) {    //En funktion som används av ovanstående funktioner. Tar bort alla alert-divar som hör till det aktuella fältet.
        if (document.contains(document.getElementById(id))){
        let elements = document.getElementById(id).parentNode.getElementsByClassName('invalid-tooltip');
        while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0])}
    }}

//FUNKTIONER FÖR ATT SKAPA MEDDELANDEN

function inputAlert(validReturn, i) {
  if (validReturn !== true) {   // Om det var fel i något input-fält så händer det här
        newDiv = createAlerts();
        newDiv.innerHTML = validReturn;
        inputs[i].parentNode.insertBefore(newDiv, inputs[i].nextSibling);
        inputs[i].classList.remove('is-valid');
        inputs[i].classList.add('is-invalid');
    }   else {        // Om alla input-fält var korrekta så händer det här
        inputs[i].classList.remove('is-invalid');
        inputs[i].classList.add('is-valid');
}}

function genderAlerts(x) {
    if (x() !== true) {     // Om ingen radio-button är vald så händer det här
        newDiv = createAlerts('genderAlert');
        newDiv.innerHTML = 'Please choose an option';
        radio[2].parentNode.parentNode.insertBefore(newDiv,radio[2].parentNode.nextSibling);
        for (var e = 0; e < radio.length; e++) {
        radio[e].classList.add('is-invalid');}
    }   else {        // Om någon radiobutton är vald så händer det här
            for (var e = 0; e < radio.length; e++) {
            radio[e].classList.add('is-valid');    
}}}

function customerAlerts(x) {
    if (x() !== true) {     // Om inget select alternativ är valt så händer det här
        newDiv = createAlerts('customerAlert');
        newDiv.innerHTML = 'Please select an option in the dropdown list';     
        document.getElementById('customerGroup').parentNode.insertBefore(newDiv,document.getElementById('customerGroup').nextSibling);
        document.getElementById('customerGroup').classList.add('is-invalid');    
    }   else         // Om något select alternativ är valt så händer det här
        document.getElementById('customerGroup').classList.add('is-valid');   
}

function messageAlerts(x) {
    if (x() !== true) {     // Om inget message har skrivits så händer det här
        newDiv = createAlerts('messageAlert');
        newDiv.innerHTML = 'Please enter a message';     
        document.getElementById('message').parentNode.insertBefore(newDiv,document.getElementById('message').nextSibling);
        document.getElementById('message').classList.add('is-invalid');    
    }   else         // Om något meddelande har skrivits så händer det här
        document.getElementById('message').classList.add('is-valid');   
}

function termsAlerts(x) {
    if (x() !== true) {     // Om checkboxen inte är ikryssad så händer det här
        newDiv = createAlerts('termsAlert');
        newDiv.innerHTML = 'You need to confirm Terms and Conditions to register';
        document.getElementById('terms').parentNode.insertBefore(newDiv,document.getElementById('terms').nextSibling);
        document.getElementById('terms').classList.add('is-invalid');    
    }   else         // Om checkboxen är ikryssad så händer det här
        document.getElementById('terms').classList.add('is-valid');    
}

    function createAlerts(id) {     // En funktion som används av ovanstående funktioner. Skapar en alert-div 
        newDiv = document.createElement('div');
        newDiv.className = 'invalid-tooltip';
        newDiv.classList.add('d-block');
        newDiv.id = id; 
        return newDiv
    } 

// SKAPAR INLOGGNINGSFORMULÄRET OCH MEDDELAR ATT REGISTRERINGEN ÄR KLAR 

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

    inputs = document.getElementsByTagName('input');     // Uppdaterar listan av inputs och sätter on-events på inputs för inloggningssidan
    inputEvents();
    document.getElementById('btnLogin').addEventListener('click', function(event){
        event.preventDefault();
        submit();
})}

// MEDDELAR ATT MAN ÄR INLOGGAD

function youAreLoggedIn() {
    const div = document.createElement('div');
    div.className = 'LoggedIn';
    div.innerHTML = `<div class="m-4">You are now logged in!</div>`;
    document.getElementById('containerId').appendChild(div);
}
