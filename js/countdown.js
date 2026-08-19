/* =========================================================
   CUENTA ATRÁS
   ========================================================= */

const weddingDate =
    new Date("2026-12-07T19:00:00").getTime();


function updateCountdown() {

    const now =
        new Date().getTime();

    const difference =
        weddingDate - now;


    if (difference <= 0) {

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;
    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (difference /
                (1000 * 60 * 60)) % 24
        );


    const minutes =
        Math.floor(
            (difference /
                (1000 * 60)) % 60
        );


    const seconds =
        Math.floor(
            (difference / 1000) % 60
        );


    document.getElementById("days").textContent =
        days;

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);


/* =========================================================
   MENÚ PRINCIPAL
   ========================================================= */

const menu =
    document.getElementById("mainMenu");

const menuToggle =
    document.getElementById("menuToggle");

const mobileMenu =
    document.getElementById("mobileMenu");


let menuStart =
    menu.offsetTop;


function updateMenuPosition() {

    menuStart =
        menu.offsetTop;
}


window.addEventListener(
    "resize",
    updateMenuPosition
);


window.addEventListener(
    "scroll",
    function () {

        if (window.scrollY >= menuStart) {

            menu.classList.add("fixed");

        } else {

            menu.classList.remove("fixed");

        }

    }
);


/* =========================================================
   MENÚ MÓVIL
   ========================================================= */

menuToggle.addEventListener(
    "click",
    function () {

        mobileMenu.classList.toggle("active");

        menuToggle.classList.toggle("active");

    }
);


document
    .querySelectorAll(".mobile-menu a")
    .forEach(link => {

        link.addEventListener(
            "click",
            function () {

                mobileMenu.classList.remove("active");

                menuToggle.classList.remove("active");

            }
        );

    });


/* =========================================================
   FAQ
   ========================================================= */

document
    .querySelectorAll(".faq-question")
    .forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const item =
                    this.parentElement;

                const answer =
                    item.querySelector(".faq-answer");


                item.classList.toggle("active");


                if (
                    item.classList.contains("active")
                ) {

                    answer.style.maxHeight =
                        answer.scrollHeight + "px";

                } else {

                    answer.style.maxHeight =
                        null;

                }

            }
        );

    });


/* =========================================================
   COPIAR IBAN
   ========================================================= */

const copyButton =
    document.getElementById("copy-iban");

const iban =
    document.getElementById("iban");

const copyMessage =
    document.getElementById("copy-message");


if (copyButton) {

    copyButton.addEventListener(
        "click",
        function () {

            navigator.clipboard.writeText(
                iban.textContent.trim()
            );


            copyMessage.textContent =
                "IBAN copiado";


            setTimeout(
                () => {

                    copyMessage.textContent =
                        "";

                },
                2500
            );

        }
    );

}


/* =========================================================
   CONFIRMACIÓN
   ========================================================= */

const rsvpModal =
    document.getElementById("rsvpModal");

const openRsvp =
    document.getElementById("openRsvp");

const closeRsvp =
    document.getElementById("closeRsvp");

const guestList =
    document.getElementById("guestList");

const addGuest =
    document.getElementById("addGuest");

const submitRsvp =
    document.getElementById("submitRsvp");

const rsvpError =
    document.getElementById("rsvpError");


/* =========================================================
   WHATSAPP
   ========================================================= */

/* CAMBIAR POR EL WHATSAPP DEFINITIVO */

const whatsappNumber =
    "+34722498518";


let guestCounter = 0;


/* =========================================================
   ABRIR FORMULARIO
   ========================================================= */

openRsvp.addEventListener(
    "click",
    function () {

        rsvpModal.classList.add("active");

        rsvpModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow =
            "hidden";


        if (
            guestList.children.length === 0
        ) {

            addGuestCard();

        }

    }
);


/* =========================================================
   CERRAR FORMULARIO
   ========================================================= */

function closeRsvpModal() {

    rsvpModal.classList.remove("active");

    rsvpModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow =
        "";

    rsvpError.classList.remove(
        "active"
    );

}


closeRsvp.addEventListener(
    "click",
    closeRsvpModal
);


rsvpModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target === rsvpModal
        ) {

            closeRsvpModal();

        }

    }
);


document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            rsvpModal.classList.contains("active")
        ) {

            closeRsvpModal();

        }

    }
);


/* =========================================================
   CREAR INVITADO
   ========================================================= */

function addGuestCard() {

    guestCounter++;


    const guestNumber =
        guestCounter;


    const guestCard =
        document.createElement("div");


    guestCard.className =
        "guest-card";


    guestCard.dataset.guest =
        guestNumber;


    guestCard.innerHTML = `

        <div class="guest-card-header">

            <span class="guest-number">
                INVITADO ${guestNumber}
            </span>

            ${
        guestNumber > 1
            ? `
                        <button
                            type="button"
                            class="remove-guest">
                            ELIMINAR
                        </button>
                    `
            : ""
    }

        </div>


        <input
            type="text"
            class="guest-name"
            placeholder="Nombre y apellidos"
            autocomplete="name"
        >


        <span class="menu-title">
            ELIGE EL MENÚ
        </span>


        <div class="menu-options">

            <div class="menu-option">

                <input
                    type="radio"
                    name="menu-${guestNumber}"
                    id="meat-${guestNumber}"
                    value="Menú Carne"
                >

                <label
                    for="meat-${guestNumber}">
                    Carne
                </label>

            </div>


            <div class="menu-option">

                <input
                    type="radio"
                    name="menu-${guestNumber}"
                    id="fish-${guestNumber}"
                    value="Menú Pescado"
                >

                <label
                    for="fish-${guestNumber}">
                    Pescado
                </label>

            </div>


            <div class="menu-option">

                <input
                    type="radio"
                    name="menu-${guestNumber}"
                    id="vegan-${guestNumber}"
                    value="Menú Vegano"
                >

                <label
                    for="vegan-${guestNumber}">
                    Vegano
                </label>

            </div>


            <div class="menu-option">

                <input
                    type="radio"
                    name="menu-${guestNumber}"
                    id="vegetarian-${guestNumber}"
                    value="Menú Vegetariano"
                >

                <label
                    for="vegetarian-${guestNumber}">
                    Vegetariano
                </label>

            </div>


            <div class="menu-option">

                <input
                    type="radio"
                    name="menu-${guestNumber}"
                    id="children-${guestNumber}"
                    value="Menú Infantil"
                >

                <label
                    for="children-${guestNumber}">
                    Infantil
                </label>

            </div>

        </div>

    `;


    guestList.appendChild(
        guestCard
    );


    const removeButton =
        guestCard.querySelector(
            ".remove-guest"
        );


    if (removeButton) {

        removeButton.addEventListener(
            "click",
            function () {

                guestCard.remove();

                renumberGuests();

            }
        );

    }

}


/* =========================================================
   AÑADIR INVITADO
   ========================================================= */

addGuest.addEventListener(
    "click",
    function () {

        addGuestCard();


        setTimeout(
            () => {

                const cards =
                    guestList.querySelectorAll(
                        ".guest-card"
                    );


                const lastCard =
                    cards[cards.length - 1];


                if (lastCard) {

                    lastCard.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }

            },
            100
        );

    }
);


/* =========================================================
   RENOMBRAR INVITADOS
   ========================================================= */

function renumberGuests() {

    const cards =
        guestList.querySelectorAll(
            ".guest-card"
        );


    cards.forEach(
        (card, index) => {

            const number =
                index + 1;


            card.dataset.guest =
                number;


            const numberElement =
                card.querySelector(
                    ".guest-number"
                );


            numberElement.textContent =
                "INVITADO " + number;


            const radios =
                card.querySelectorAll(
                    'input[type="radio"]'
                );


            radios.forEach(
                radio => {

                    radio.name =
                        "menu-" + number;

                }
            );


            const labels =
                card.querySelectorAll(
                    ".menu-option label"
                );


            const menuIds = [
                "meat",
                "fish",
                "vegan",
                "vegetarian",
                "children"
            ];


            radios.forEach(
                (radio, radioIndex) => {

                    const newId =
                        menuIds[radioIndex] +
                        "-" +
                        number;


                    radio.id =
                        newId;


                    if (
                        labels[radioIndex]
                    ) {

                        labels[radioIndex].htmlFor =
                            newId;

                    }

                }
            );


            let removeButton =
                card.querySelector(
                    ".remove-guest"
                );


            if (
                number === 1 &&
                removeButton
            ) {

                removeButton.remove();

            }


            if (
                number > 1 &&
                !removeButton
            ) {

                const header =
                    card.querySelector(
                        ".guest-card-header"
                    );


                const button =
                    document.createElement(
                        "button"
                    );


                button.type =
                    "button";


                button.className =
                    "remove-guest";


                button.textContent =
                    "ELIMINAR";


                button.addEventListener(
                    "click",
                    function () {

                        card.remove();

                        renumberGuests();

                    }
                );


                header.appendChild(
                    button
                );

            }

        }
    );


    guestCounter =
        cards.length;

}


/* =========================================================
   ERROR
   ========================================================= */

function showRsvpError(message) {

    rsvpError.textContent =
        message;


    rsvpError.classList.add(
        "active"
    );


    rsvpError.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


/* =========================================================
   GENERAR WHATSAPP
   ========================================================= */

submitRsvp.addEventListener(
    "click",
    function () {

        rsvpError.classList.remove(
            "active"
        );


        const cards =
            guestList.querySelectorAll(
                ".guest-card"
            );


        if (
            cards.length === 0
        ) {

            showRsvpError(
                "Añade al menos un invitado."
            );

            return;

        }


        const guests = [];


        for (
            let i = 0;
            i < cards.length;
            i++
        ) {

            const card =
                cards[i];


            const nameInput =
                card.querySelector(
                    ".guest-name"
                );


            const selectedMenu =
                card.querySelector(
                    'input[type="radio"]:checked'
                );


            const name =
                nameInput.value.trim();


            if (!name) {

                showRsvpError(
                    "Introduce el nombre y apellidos del invitado " +
                    (i + 1) +
                    "."
                );


                nameInput.focus();

                return;

            }


            if (!selectedMenu) {

                showRsvpError(
                    "Selecciona un menú para " +
                    name +
                    "."
                );

                return;

            }


            guests.push({
                name: name,
                menu: selectedMenu.value
            });

        }


        let message =
            "Hola Juan y Cristina 😊\n\n";


        message +=
            "Confirmamos nuestra asistencia a la boda.\n\n";


        message +=
            "INVITADOS\n";


        message +=
            "────────────────\n";


        guests.forEach(
            guest => {

                message +=
                    "• " +
                    guest.name +
                    "\n";


                message +=
                    "  " +
                    guest.menu +
                    "\n\n";

            }
        );


        message +=
            "TOTAL: " +
            guests.length +
            (
                guests.length === 1
                    ? " invitado"
                    : " invitados"
            ) +
            "\n\n";


        message +=
            "¡Nos vemos en la boda! 🥰";


        const encodedMessage =
            encodeURIComponent(
                message
            );


        const whatsappUrl =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodedMessage;


        window.open(
            whatsappUrl,
            "_blank"
        );

    }
);