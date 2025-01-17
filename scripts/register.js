import './../scss/register.scss';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Success!');
      })
    }
 });