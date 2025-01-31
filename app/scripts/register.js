import './../scss/register.scss';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
    if (form) {


      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        /* 
          {
            key : value
          }
        
        */
        const userData = {
          name,
          email,
          password
        }

        try {
          
          const res = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
              'Content-Type' : 'application/json'
            },
            body: JSON.stringify(userData)
          });

          if(res.ok){
            alert('User registered successfully!');
            form.reset();
          }else{
            const errorData = await res.json();
            alert(`Error: ${errorData.error}`)
          }

        } catch (error) {
          alert('An error ocurred while registering the userData.');
          console.error(`Error: ${error}`);
        }

      })


    }
 });