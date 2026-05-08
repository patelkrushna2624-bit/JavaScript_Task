const baseURL = "https://crud-api-5f45.onrender.com";

let editUserId = null;

const loginForm = document.querySelector(".login-container form");

if (loginForm) {

loginForm.addEventListener("submit", async (e) => {

e.preventDefault();

const email = document.getElementById("uname").value;
const password = document.getElementById("pwd").value;

try {

const response = await fetch(`${baseURL}/login`, {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
email,
password
})
});

const data = await response.json();

if (response.ok) {

localStorage.setItem("token", data.token);

alert("Login successful");

window.location.href = "dashboard.html";

} else {

alert( "Don't have an account");
window.location.href="signup.html";
}

} catch (error) {
console.log(error);
}

});

}

