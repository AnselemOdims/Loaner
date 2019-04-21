const form = document.getElementsByTagName('form')[0];
const email = document.getElementById('mail');
const error = document.querySelector('.error');
const pError = document.querySelector('.pw');
const password = document.getElementById('password')

if (email){
    email.addEventListener('input', (event)=> {
   if(email.validity.valid) {
       error.innerHTML = '';
       error.className = 'error'
   }
}, false);
}
if(form){
form.addEventListener('submit', (event)=> {
    if(!email.validity.valid) {
        error.innerHTML = 'Input should be valid email, in this format johndoe@gmail.com';
        error.className = "error active";
        event.preventDefault();
    }
    if(password.value.length < 8){
        pError.innerHTML = 'Password should not be less than 8 characters';
        pError.className = "error active";
        event.preventDefault();
    }
    if(email.value ==='anselemodims@gmail.com' && password.value === 'tosheto77') {
        window.location.href = './dashboard.html'
        event.preventDefault();
    }
    
}, false)
}
