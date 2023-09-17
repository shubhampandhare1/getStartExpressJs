window.addEventListener("DOMContentLoaded", () => {
    axios.get('http://localhost:3000/user/get-user')
        .then((response) => {
            console.log(response.data.allUsers);
            for (let i = 0; i < response.data.allUsers.length; i++) {
                showUserOnHome(response.data.allUsers[i]);
            }
        })
        .catch((err) => {
            console.log(err)
        })
})

function submitForm(event) {

    event.preventDefault();

    let name = event.target.name.value;
    let email = event.target.email.value;
    let mobile = event.target.mobile.value;

    user = {
        name: name,
        email: email,
        mobile: mobile
    }

    axios.post('http://localhost:3000/user/add-user', user)
        .then((response) => {
            showUserOnHome(response.data.newUserDetails);
            console.log(response.data.newUserDetails);
        })
        .catch((error) => {
            document.body.innerHTML = document.body.innerHTML + '<h4>Something Went Wrong</h4>';
            console.log('Something Went Wrong', error);
        })
}

function showUserOnHome(user) {
    let parentEle = document.getElementById('userList');
    let childEle = document.createElement('li');
    childEle.id = 'addedUser';
    childEle.innerText = user.Name + ' - ' + user.Email + ' - ' + user.Mobile;

    let deleteBtn = document.createElement('input');
    deleteBtn.type = 'button';
    deleteBtn.value = 'Delete';

    let editBtn = document.createElement('input');
    editBtn.type = 'button';
    editBtn.value = 'Edit';

    editBtn.onclick = () => {
        let storedUser = JSON.parse(localStorage.getItem(user.email));
        document.getElementById('name').value = storedUser.name;
        document.getElementById('email').value = storedUser.email;
        document.getElementById('mobile').value = storedUser.mobile;

        localStorage.removeItem(user.email);
        parentEle.removeChild(childEle);

    }

    deleteBtn.onclick = () => {
        let userId = user.Id;
        axios.delete(`http://localhost:3000/user/delete-user/${userId}`)
            .then(() => {
                parentEle.removeChild(childEle);
            })
            .catch(err => console.log(err));
    }

    childEle.appendChild(editBtn);
    childEle.appendChild(deleteBtn);
    parentEle.appendChild(childEle);
}