const baseUrl = "https://finish-api.onrender.com/api/user/";

let successMessageDisplayed = false; // متغير للتحكم في إظهار رسالة النجاح

document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();
    login();
});

function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch(baseUrl + "login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password}),
    })
    .then((response) => {
        if (!response.ok) {
            throw response;
        }
        return response.json();
    })
    .then((data) => {
        console.log("data => ", data);
        console.log("token => ", data.data.token);
        console.log("id => ", data.data.id);
        successMessageDisplayed = true;
        localStorage.setItem("token", JSON.stringify(data.data.token));
        localStorage.setItem("id", JSON.stringify(data.data.id));
        window.location.href = "home2.html";
    })
    .catch((error) => {
        console.error("Error:", error);
        // alert("An error occurred. Please try again later.");
    });
}
// eye
document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password");
    const toggleButton = document.querySelector(".password button");

    toggleButton.addEventListener("click", function () {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            toggleButton.innerHTML = '<i class="fa fa-eye" aria-hidden="true"></i>';
        } else {
            passwordInput.type = "password";
            toggleButton.innerHTML =
                '<i class="fa fa-eye-slash" aria-hidden="true"></i>';
        }
    });
});
