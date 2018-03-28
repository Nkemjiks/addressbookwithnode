var addressBook;
var open = document.getElementById('second');
var contacts = document.getElementById('contacts');
var landingPage = document.getElementById('landing-page');
var addContactIcon = document.getElementById('addcontacticon');
var addContact = document.getElementById('add-contact');
var savebutton = document.getElementById('save');
var form = document.getElementById('myForm');
var success = document.getElementById('success');
var input = document.getElementsByTagName('input');
var viewContact = document.getElementById('view-contact');
var goBack = document.getElementById('goback');
var goBacka = document.getElementById('gobacka');
var el1 = document.getElementById('named');
var el2 = document.getElementById('phone-numberd');
var el3 = document.getElementById('emaild');
var el = document.getElementById('contact-list');
var el1Child = document.createElement('p');
var el2Child = document.createElement('p');
var el3Child = document.createElement('p');
var deleteThis = document.getElementById('delete');
var deleteSucess = document.getElementById('delete-message');
var edit = document.getElementById('edit');
var picture = document.getElementById('picture');
var activeChild;
var goAhead = false;

if(localStorage.getItem('addressBook')) {
    addressBook = JSON.parse(localStorage.getItem('addressBook'));
} else {
    addressBook = {};
}

open.addEventListener('click', function(){
    landingPage.style.display = 'none';
    contacts.style.display = 'block';
    for(var key in addressBook) {
        var elChild = document.createElement('p');
        elChild.innerHTML = addressBook[key].name;
        el.appendChild(elChild);
    }
});
addContactIcon.addEventListener('click', function(){
    contacts.style.display = 'none';
    form.style.display = 'block';
    savebutton.style.display = 'block';
    success.style.display = 'none';
    addContact.style.display = 'block';
});
function successes(){
    addContact.style.display = 'none';
    viewContact.style.display = 'block';
}
function successez(){
    contacts.style.display = 'none';
    viewContact.style.display = 'block';
}
savebutton.addEventListener('click', function(){
    if(addressBook.hasOwnProperty(activeChild) && goAhead === true) {
        delete addressBook[activeChild];
    }
    goAhead = false;
    if(document.getElementById('fullname').value.match(/^[a-zA-Z0-9 ]+$/) && document.getElementById('phonenumber').value.match(/^[0-9]+$/) && document.getElementById('email').value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        activeChild = document.getElementById('fullname').value;
        var name = document.getElementById('fullname').value;
        addressBook[name] = {name: document.getElementById('fullname').value, phonenumber: document.getElementById('phonenumber').value , email: document.getElementById('email').value, image: document.getElementById('pictures').value};
        localStorage.setItem('addressBook', JSON.stringify(addressBook));
        //I can't get the full file path to the uploaded image due to security reasons attached in most browser
        //picture.src = document.getElementById('pictures').value;
        //console.log(document.getElementById('pictures').value);

        el1Child.innerHTML = document.getElementById('fullname').value;
        el1.appendChild(el1Child);
        el2Child.innerHTML = document.getElementById('phonenumber').value;
        el2.appendChild(el2Child);
        el3Child.innerHTML = document.getElementById('email').value;
        el3.appendChild(el3Child);
        form.reset();
        form.style.display = 'none';
        savebutton.style.display = 'none';
        success.style.display = 'block';
        setTimeout(successes, 2000);
        
    } else {
        alert('One of the Input Fields is Invalid');
    }

});
goBack.addEventListener('click', function(){
    el1.removeChild(el1.childNodes[3]);
    el2.removeChild(el2.childNodes[3]);
    el3.removeChild(el3.childNodes[3]);
    //picture.src = 'public/images/added.png';
    while(el.hasChildNodes()) {
        el.removeChild(el.firstChild);
    }
    for(var key in addressBook) {
        var elChild = document.createElement('p');
        elChild.innerHTML = addressBook[key].name;
        el.appendChild(elChild);
    }
    viewContact.style.display = 'none';
    contacts.style.display = 'block';
});
goBacka.addEventListener('click', function(){
    form.reset();
    addContact.style.display = 'none';
    contacts.style.display = 'block';
});
el.addEventListener('click', function() {
    if(event.target.tagName === 'P'){
        activeChild = event.target.textContent;
        //picture.src = addressBook[event.target.textContent].image;
        el1Child.innerHTML = addressBook[event.target.textContent].name;
        el1.appendChild(el1Child);
        el2Child.innerHTML = addressBook[event.target.textContent].phonenumber;
        el2.appendChild(el2Child);
        el3Child.innerHTML = addressBook[event.target.textContent].email;
        el3.appendChild(el3Child);
        successez();
    }
})
deleteThis.addEventListener('click', function() {
    var goOn = confirm('Are you sure want to delete this contact?');
    if(goOn === true) {
        delete addressBook[activeChild];
        localStorage.setItem('addressBook', JSON.stringify(addressBook));
        while(el.hasChildNodes()) {
            el.removeChild(el.firstChild);
        }
        viewContact.style.display = 'none';
        contacts.style.display = 'block';
        for(var key in addressBook) {
            var elChild = document.createElement('p');
            elChild.innerHTML = addressBook[key].name;
            el.appendChild(elChild);
        }
        deleteSucess.style.display = 'block';
        setTimeout(function() {
            deleteSucess.style.display = 'none';
        }, 1000)
    }
});
edit.addEventListener('click', function() {
    goAhead = true;
    viewContact.style.display = 'none';
    addContact.style.display = 'block';
    form.style.display = 'block';
    savebutton.style.display = 'block';
    success.style.display = 'none';
    document.getElementById('fullname').value = addressBook[activeChild].name;
    document.getElementById('phonenumber').value = addressBook[activeChild].phonenumber;
    document.getElementById('email').value = addressBook[activeChild].email;
    document.getElementById('picture').value = addressBook[activeChild].image;
});