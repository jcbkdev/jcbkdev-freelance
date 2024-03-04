const contactDialog = document.getElementById("contact-dialog");
const body = document.body;

const openContact = () => {
    if (!contactDialog || contactDialog.open) return;
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
