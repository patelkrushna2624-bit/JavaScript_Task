const baseURL = "https://crud-api-5f45.onrender.com";

let editUserId = null;


const token = localStorage.getItem("token");

const userForm = document.getElementById("userForm");

if (userForm) {

userForm.addEventListener("submit", async (e) => {

e.preventDefault();

const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const department = document.getElementById("department").value;

try {

let url = `${baseURL}/dashboard/user`;
let method = "POST";

if(editUserId){
url = `${baseURL}/dashboard/user/${editUserId}`;
method = "PUT";
}

await fetch(url,{
method: method,
headers:{
"Content-Type":"application/json",
"Authorization":`Bearer ${token}`
},
body:JSON.stringify({
name,
email,
department
})
});

editUserId = null;

userForm.reset();

if(popupForm){
popupForm.style.display = "none";
}

loadUsers();

} catch (error) {
console.log(error);
}

});

}



// -------------------- LOAD USERS --------------------

async function loadUsers() {

const table = document.getElementById("userTable");

if (!table) return;

try {

const response = await fetch(`${baseURL}/dashboard/users`, {

headers: {
"Authorization": `Bearer ${token}`
}

});

const users = await response.json();

table.innerHTML = "";

users.forEach((user) => {

table.innerHTML += `
<tr>
<td>${user.name}</td>
<td>${user.email}</td>
<td>${user.department}</td>
<td class="btn">
<button class="edit-btn" onclick="openEditPopup('${user.id}','${user.name}','${user.email}','${user.department}')">Edit</button>
<button class="delete-btn" onclick="openDeletePopup('${user.id}')">Delete</button>
</td>
</tr>
`;

});

} catch (error) {
console.log(error);
}

}


// -------------------- EDIT USER --------------------

function openEditPopup(id, name, email, department){

editUserId = id;

document.getElementById("name").value = name;
document.getElementById("email").value = email;
document.getElementById("department").value = department;

if(popupForm){
popupForm.style.display = "block";
}

}



// // -------------------- DELETE USER --------------------

async function deleteUser(id) {

try {

await fetch(`${baseURL}/dashboard/user/${id}`, {

method: "DELETE",

headers: {
"Authorization": `Bearer ${token}`
}

});

loadUsers();

} catch (error) {
console.log(error);
}

}



// -------------------- LOGOUT --------------------

function logout() {

localStorage.removeItem("token");

window.location.href = "login.html";

}



// -------------------- POPUP CONTROL --------------------

const openPopup = document.getElementById("openPopup");
const popupForm = document.getElementById("popupForm");
const closePopup = document.getElementById("closePopup");

if(openPopup){
openPopup.onclick = () => {
popupForm.style.display = "block";
};
}

if(closePopup){
closePopup.onclick = () => {
popupForm.style.display = "none";
};
}


let deleteUserId = null;

function openDeletePopup(id){

deleteUserId = id;

document.getElementById("deletePopup").style.display = "block";
}

function closeDeletePopup(){

document.getElementById("deletePopup").style.display = "none";
}

document.getElementById("confirmDelete").onclick = async function(){

if(deleteUserId){

await deleteUser(deleteUserId);

closeDeletePopup();

}

};

// -------------------- AUTO LOAD USERS --------------------

if (token) {
loadUsers();
}