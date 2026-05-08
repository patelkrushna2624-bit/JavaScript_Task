const baseURL = "https://crud-api-5f45.onrender.com";

let editUserId = null;

const signupForm = document.querySelector(".signup-container form");

if (signupForm) {

signupForm.addEventListener("submit", async (e) => {

e.preventDefault();

const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const password = document.getElementById("pwd").value;

try {

const response = await fetch(`${baseURL}/signup`, {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
name,
email,
password
})
});

const data = await response.json();

if (response.ok) {

alert("Signup successful");
window.location.href = "login.html";

} else 

if(data.message && data.message.includes("already")){
    alert("email already registered.Please Login.!");
    window.location.href="login.html";
}   else{ 

alert(data.message || "Signup failed");

}

} catch (error) {
console.log(error);
}

});

}