// const baseUrl = "http://localhost:4000/api/user/";
const baseUrl = "https://finish-api.onrender.com/api/user/";
getUserDetails();

function toggleMenu() {
    const submenu = document.getElementById("submenu");
    submenu.classList.toggle("open-menu"); // إضافة/إزالة فئة .open-menu
}

document.getElementById("discardButton").addEventListener("click", function () {
    // قم بتحديد العناصر التي تحتوي على البيانات التي ترغب في مسحها
    const inputsToClear = document.querySelectorAll(
        'input[type="text"], input[type="email"], input[type="number"], input[type="url"]',
    );

    // قم بمسح القيم المدخلة في العناصر
    inputsToClear.forEach(function (input) {
        input.value = "";
    });
});

// get user by details
function getUserDetails() {
    let userId = getUserId();

    if (!userId) {
        alert("User not found. Please sign in again.");
        window.location.href = "login.html";
        return;
    }

    fetch(baseUrl + userId)
    .then((response) => response.json())
    .then((data) => {
        const user = data.data.users;
        console.log("User details fetched successfully:", user);
        document.getElementById("user-name").innerText = user.fullname;
        document.getElementById("user-email").innerText = user.email;
        const avatar = user.avatar !== null ? user.avatar[0] : "images.jpg";
        document.getElementById("user-image").src = avatar;
        document.getElementById("placeholder-image").src = avatar;

    })
    .catch((error) => {
        console.error("Error fetching user details:", error);
        alert("Error fetching user details. Please try again.");
    });
}

// logout
document.getElementById("signOutButton").addEventListener("click", function () {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    window.location.href = "login.html";
});

function discardChanges() {
    // Implement your logic to revert changes here
    alert("Changes have been discarded.");
}

// Add an event listener to the "Discard" button
document.getElementById("discardButton").addEventListener("click", function () {
    discardChanges();
});

// كائن لتخزين الوظائف
const functions = {
    saveChanges: function () {
        const fullName = document.getElementById("user-name-input").value;
        const email = document.getElementById("user-email-input").value;
        const gender = document.getElementById("user-gender-input").value;
        const location = document.getElementById("user-location-input").value;
        const phoneNumber = document.getElementById("user-phoneNumber-input").value;
        const websiteURL = document.getElementById("user-websiteURL-input").value;
        const company = document.getElementById("user-company-input").value;
        const otherWebsite = document.getElementById(
            "user-otherWebsite-input",
        ).value;

        const userId = localStorage.getItem("id");

        fetch(baseUrl + userId, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getToken(),
            },
            body: JSON.stringify({
                fullname: fullName,
                email,
                gender,
                location,
                phonenumber: phoneNumber,
                websiteurl: websiteURL,
                company: company,
                otherwebsite: otherWebsite,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("User details saved successfully:", data);
            getUserDetails();
            alert("Changes have been saved successfully!");
        })
        .catch((error) => {
            console.error("Error saving user details:", error);
            alert("Error saving changes. Please try again.");
        });
    },
    goToPage: function (page) {
        window.location.href = page;
    },
};

// Add event listeners
document
.getElementById("saveButton")
.addEventListener("click", functions.saveChanges);

if (!window.location.href.includes("person.html")) {
    document
    .getElementById("generalButton")
    .addEventListener("click", function () {
        functions.goToPage("person.html");
    });
} else {
    document
    .getElementById("generalButton")
    .addEventListener("click", function () {
        console.log("Staying on the current page");
    });
}

// الزرار
if (!window.location.href.includes("person.html")) {
    document
    .getElementById("generalButton")
    .addEventListener("click", function () {
        goToPage("person.html");
    });
} else {
    document
    .getElementById("generalButton")
    .addEventListener("click", function () {
        console.log("Staying on the current page");
    });
}

function goToPage(page) {
    window.location.href = page;
}

// Function to update the user's profile image
function updateUserProfileImage(imageData, imageFile) {

    // Update the src attribute of the user's profile image
    document.getElementById("user-image").src = imageData;
    document.getElementById("placeholder-image").src = imageData;

    // Send the image data to the server
    updateProfileImage(imageFile);
}

// Function to send image data to the server and update the profile

// todo: check this
function updateProfileImage(imageFile) {
    // Create FormData object to send file data

    const formData = new FormData();
    console.log("imageFile", imageFile);
    formData.append("avatar", imageFile);

    const userId = getUserId();

    // Send AJAX request to the server
    fetch(baseUrl + userId, {
        method: "PATCH",
        body: formData,
        headers: {
            Authorization: "Bearer " + getToken(),
        }

    })
    .then((response) => response.json())
    .then((data) => {
        if (data.code >= 400) {
            console.error("Error updating profile image:", data);
            alert("Error updating profile image. Please try again.");
        } else {
            console.log("Profile image updated successfully:", data);
            alert("Profile image updated successfully!");
        }
    })
    .catch((error) => {
        console.error("Error updating profile image:", error);
    });
}

// Function to handle profile image upload
document.getElementById("uploadButton").addEventListener("click", function () {
    const input = document.createElement("input");
    input.type = "file";
    input.setAttribute("accept", "image/*");
    input.setAttribute("capture", "gallery");

    input.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imageData = e.target.result;
                updateUserProfileImage(imageData, file);
            };
            reader.readAsDataURL(file);
        }
    });

    input.click();
});

//1
document.getElementById("facebook-link").addEventListener("click", function () {
    window.open("https://www.facebook.com/", "_blank");
});
document.getElementById("twitter-link").addEventListener("click", function () {
    window.open("https://twitter.com/", "_blank");
});
document.getElementById("email-link").addEventListener("click", function () {
    window.open("https://gmail.com", "_blank");
});
document.getElementById("whatsapp-link").addEventListener("click", function () {
    window.open("https://whatsapp.com", "_blank");
});
document.getElementById("telegram-link").addEventListener("click", function () {
    window.open("https://web.telegram.org/a/", "_blank");
});
//2
document.addEventListener("DOMContentLoaded", function () {
    const viewBtn = document.querySelector(".view-modal");
    const popup = document.querySelector(".popup");
    const close = popup.querySelector(".close");
    const field = popup.querySelector(".field");
    const input = field.querySelector("input");
    const copy = field.querySelector("button");

    viewBtn.addEventListener("click", function () {
        popup.classList.toggle("show");
    });

    close.addEventListener("click", function () {
        viewBtn.click();
    });

    copy.addEventListener("click", function () {
        input.select();
        document.execCommand("copy");
        this.innerText = "Copied!";
        setTimeout(() => {
            this.innerText = "Copy";
        }, 2000);
    });
});
// rate
var ratingValue;

function openRatingBox() {
    var ratingBox = document.getElementById("ratingBox");
    ratingBox.style.display = "block";
}

function closeRatingBox() {
    var ratingBox = document.getElementById("ratingBox");
    ratingBox.style.display = "none";
    console.log("تم حفظ التقييم:", ratingValue);
}

// element.checked = false;

function saveRating(element) {
    var ratingValue = element.value;
    localStorage.setItem("rating", ratingValue);
}

function getUserId() {
    return localStorage.getItem("id").replace(/['"]+/g, "");
}

function getToken() {
    return localStorage.getItem("token").replace(/['"]+/g, "");
}
