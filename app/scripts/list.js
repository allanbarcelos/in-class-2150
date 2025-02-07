import './../scss/list.scss';

document.addEventListener('DOMContentLoaded', () => {
    const userListContainer = document.getElementById('userList');


    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/register');
            if(!res.ok)
                throw new Error("Failed");

            const users = await res.json();
                
            renderUsers(users);

        } catch (error) {
            console.error(error);
            userListContainer.innerHTML = '<p>Error loading user list</p>';
            
        }
    };


    const renderUsers = (users) => {
        if(users.length === 0) {
            userListContainer.innerHTML = '<p>No users found</p>';
            return;
        }


        const userListHTML = users.map( user => `
           <div class="user-card">
            <p><b>Name: </b> ${user.name}</p>
            <p><b>Email: </b> ${user.email}</p>
            <p><b>Created At: </b> ${new Date(user.created_at).toLocaleString()}</p>
           </div> 
        `).join('');


        userListContainer.innerHTML = userListHTML;

    };

    fetchUsers();
});

