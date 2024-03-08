const contactDialog = document.getElementById("contact-dialog");
const body = document.body;

const nameInput = document.getElementById("input-name");
const emailInput = document.getElementById("input-email");
const phoneInput = document.getElementById("input-phone");
const businessInput = document.getElementById("input-business"); //textarea
const descInput = document.getElementById("input-desc"); //textarea

const openContact = () => {
    if (!contactDialog || contactDialog.open) return;

    let nameStorage = sessionStorage.getItem("input-name");
    let emailStorage = sessionStorage.getItem("input-email");
    let phoneStorage = sessionStorage.getItem("input-phone");
    let businessStorage = sessionStorage.getItem("input-business");
    let descStorage = sessionStorage.getItem("input-desc");

    if (nameStorage) {
        nameInput.value = nameStorage;
    }
    if (emailStorage) {
        emailInput.value = emailStorage;
    }
    if (phoneStorage) {
        phoneInput.value = phoneStorage;
    }
    if (businessStorage) {
        businessInput.value = businessStorage;
    }
    if (descStorage) {
        descInput.value = descStorage;
    }
    contactDialog.show();
    body.classList.add("stop");
};

const closeContact = () => {
    if (!contactDialog || !contactDialog.open) return;
    contactDialog.close();
    body.classList.remove("stop");
};

if (contactDialog) {
    contactDialog.addEventListener("click", (e) => {
        if (e.target === contactDialog) {
            contactDialog.close();
            body.classList.remove("stop");
        }
    });
}

const setStorage = (e) => {
    let name = e.target.id;
    let value = e.target.value;

    sessionStorage.setItem(name, value);
};

nameInput.addEventListener("input", setStorage);
emailInput.addEventListener("input", setStorage);
phoneInput.addEventListener("input", setStorage);
businessInput.addEventListener("input", setStorage);
descInput.addEventListener("input", setStorage);

const contactSubmit = (e) => {
    e.preventDefault();
    const button = document.getElementById("contact-submit-btn");
    button.disabled = true;

    fetch("https://formsubmit.co/ajax/jcbkdev@gmail.com", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            name: nameInput.value,
            email: emailInput.value,
            "phone-number": phoneInput.value,
            "business-description": businessInput.value,
            "website-description": descInput.value,
        }),
    })
        .then((response) => response.status)
        .then((status) => {
            button.disabled = false;
            contactDialog.close();
            if (status == 200) {
                // alert("git gud");
            } else {
                alert("Wystąpił problem. Wiadomość nie została wysłana.");
            }
        })
        .catch((error) => console.log(error));
};

const form = document.getElementById("contact-form");
form.addEventListener("submit", contactSubmit);
