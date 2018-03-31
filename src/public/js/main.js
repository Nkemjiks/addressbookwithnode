var addressBook;
var open = document.getElementById('landing-page-second-icon');
var contacts = document.getElementById('contacts');
var landingPage = document.getElementById('landing-page');
var addContactIcon = document.getElementById('addcontacticon');
var addContact = document.getElementById('add-contact');
var savebutton = document.getElementById('save');
var form = document.getElementById('myForm');
var success = document.getElementById('success');
var input = document.getElementsByTagName('input');
var viewContact = document.getElementById('view-contact');
var viewGoBack = document.getElementById('view-go-back');
var addGoBack = document.getElementById('add-go-back');
var viewName = document.getElementById('view-name');
var viewPhoneNumber = document.getElementById('view-phonenumber');
var viewEmail = document.getElementById('view-email');
var contactList = document.getElementById('contact-list');
var viewNameChild = document.createElement('p');
var viewPhoneNumberChild = document.createElement('p');
var viewEmailChild = document.createElement('p');
var deleteThis = document.getElementById('delete');
var deleteSucess = document.getElementById('delete-message');
var edit = document.getElementById('edit');
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
        var contactListChild = document.createElement('p');
        contactListChild.innerHTML = addressBook[key].name;
        contactList.appendChild(contactListChild);
    }
});
addContactIcon.addEventListener('click', function(){
    contacts.style.display = 'none';
    form.style.display = 'block';
    savebutton.style.display = 'block';
    success.style.display = 'none';
    addContact.style.display = 'block';
});
function saveSuccess(){
    addContact.style.display = 'none';
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
        addressBook[name] = {name: document.getElementById('fullname').value, phonenumber: document.getElementById('phonenumber').value , email: document.getElementById('email').value};
        localStorage.setItem('addressBook', JSON.stringify(addressBook));
        viewNameChild.innerHTML = document.getElementById('fullname').value;
        viewName.appendChild(viewNameChild);
        viewPhoneNumberChild.innerHTML = document.getElementById('phonenumber').value;
        viewPhoneNumber.appendChild(viewPhoneNumberChild);
        viewEmailChild.innerHTML = document.getElementById('email').value;
        viewEmail.appendChild(viewEmailChild);
        form.reset();
        form.style.display = 'none';
        savebutton.style.display = 'none';
        success.style.display = 'block';
        setTimeout(saveSuccess, 2000);
        
    } else {
        alert('One of the Input Fields is Invalid');
    }

});
viewGoBack.addEventListener('click', function(){
    viewName.removeChild(viewName.childNodes[3]);
    viewPhoneNumber.removeChild(viewPhoneNumber.childNodes[3]);
    viewEmail.removeChild(viewEmail.childNodes[3]);
    while(contactList.hasChildNodes()) {
        contactList.removeChild(contactList.firstChild);
    }
    for(var key in addressBook) {
        var contactListChild = document.createElement('p');
        contactListChild.innerHTML = addressBook[key].name;
        contactList.appendChild(contactListChild);
    }
    viewContact.style.display = 'none';
    contacts.style.display = 'block';
});
addGoBack.addEventListener('click', function(){
    form.reset();
    addContact.style.display = 'none';
    contacts.style.display = 'block';
});
contactList.addEventListener('click', function(event) {
    if(event.target.tagName === 'P'){
        activeChild = event.target.textContent;
        viewNameChild.innerHTML = addressBook[event.target.textContent].name;
        viewName.appendChild(viewNameChild);
        viewPhoneNumberChild.innerHTML = addressBook[event.target.textContent].phonenumber;
        viewPhoneNumber.appendChild(viewPhoneNumberChild);
        viewEmailChild.innerHTML = addressBook[event.target.textContent].email;
        viewEmail.appendChild(viewEmailChild);
        contacts.style.display = 'none';
        viewContact.style.display = 'block';
    }
})
deleteThis.addEventListener('click', function() {
    var goOn = confirm('Are you sure want to delete this contact?');
    if(goOn === true) {
        delete addressBook[activeChild];
        localStorage.setItem('addressBook', JSON.stringify(addressBook));
        while(contactList.hasChildNodes()) {
            contactList.removeChild(contactList.firstChild);
        }
        viewContact.style.display = 'none';
        contacts.style.display = 'block';
        for(var key in addressBook) {
            var contactListChild = document.createElement('p');
            contactListChild.innerHTML = addressBook[key].name;
            contactList.appendChild(contactListChild);
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
});