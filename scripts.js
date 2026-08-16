document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       ELEMENTOS
    ========================== */

    const items = document.querySelectorAll(".item");
    const dots = document.querySelectorAll(".dot");
    const numberIndicator = document.querySelector(".numbers");
    const container = document.querySelector(".container");

    const nextButton = document.getElementById("next");
    const prevButton = document.getElementById("prev");


    /* =========================
       VERIFICA SE EXISTEM SLIDES
    ========================== */

    if (items.length === 0) {
        console.log("Nenhum slide encontrado.");
        return;
    }


    /* =========================
       CONFIGURAÇÃO
    ========================== */

    let active = [...items].findIndex((item) =>
        item.classList.contains("active")
    );

    if (active === -1) {
        active = 0;
        items[active].classList.add("active");
    }

    const total = items.length;

    let isChanging = false;


    /* =========================
       RESET DAS ANIMAÇÕES
    ========================== */

    function resetAnimations(item) {

        if (!item) return;

        const animatedElements = item.querySelectorAll(
            ".product-tag, .product-name, .description, .btn"
        );

        animatedElements.forEach((element) => {

            element.style.animation = "none";

            // Força o navegador a reiniciar a animação
            void element.offsetWidth;

            element.style.animation = "";

        });
    }


    /* =========================
       BOTÕES "SAIBA MAIS"
    ========================== */

    function setupButtons() {

        items.forEach((item) => {

            const button = item.querySelector(".btn");

            if (!button) return;

            button.addEventListener("click", () => {

                const url = button.dataset.link;

                if (!url) {
                    console.log("Nenhum link encontrado no botão.");
                    return;
                }

                window.open(
                    url,
                    "_blank",
                    "noopener,noreferrer"
                );

            });

        });

    }


    /* =========================
       INDICADORES
    ========================== */

    function updateIndicators(index) {

        dots.forEach((dot, i) => {

            dot.classList.toggle(
                "active",
                i === index
            );

        });


        if (numberIndicator) {

            numberIndicator.textContent =
                String(index + 1).padStart(2, "0");

        }

    }


    /* =========================
       TROCAR SLIDE
    ========================== */

    function changeSlide(direction) {

        if (isChanging) return;

        if (total <= 1) return;


        const currentItem = items[active];

        const nextIndex =
            (active + direction + total) % total;

        const nextItem = items[nextIndex];


        if (!currentItem || !nextItem) {
            return;
        }


        isChanging = true;


        /* Remove animações anteriores */

        items.forEach((item) => {

            item.classList.remove(
                "slide-in-left",
                "slide-in-right",
                "fade-out"
            );

        });


        /* Reinicia animações do próximo slide */

        resetAnimations(nextItem);


        /* Slide atual desaparece */

        currentItem.classList.remove("active");

        currentItem.classList.add("fade-out");


        /* Transição do fundo */

        if (container) {

            container.classList.add("transition-bg");

        }


        /* Aguarda a saída do slide */

        setTimeout(() => {

            currentItem.classList.remove("fade-out");


            /* Define direção da entrada */

            if (direction === 1) {

                nextItem.classList.add("slide-in-right");

            } else {

                nextItem.classList.add("slide-in-left");

            }


            /* Ativa próximo slide */

            nextItem.classList.add("active");


            /* Atualiza índice */

            active = nextIndex;


            /* Atualiza indicadores */

            updateIndicators(active);


            /* Finaliza animação */

            setTimeout(() => {

                nextItem.classList.remove(
                    "slide-in-right",
                    "slide-in-left"
                );


                if (container) {

                    container.classList.remove(
                        "transition-bg"
                    );

                }


                isChanging = false;

            }, 700);

        }, 300);

    }


    /* =========================
       BOTÃO PRÓXIMO
    ========================== */

    if (nextButton) {

        nextButton.addEventListener("click", () => {

            changeSlide(1);

        });

    }


    /* =========================
       BOTÃO ANTERIOR
    ========================== */

    if (prevButton) {

        prevButton.addEventListener("click", () => {

            changeSlide(-1);

        });

    }


    /* =========================
       CLICAR NOS DOTS
    ========================== */

    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            if (isChanging) return;

            if (index === active) return;


            const direction =
                index > active ? 1 : -1;

            changeSlide(direction);

        });

    });


    /* =========================
       TECLADO
    ========================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "ArrowRight") {

            changeSlide(1);

        }

        if (event.key === "ArrowLeft") {

            changeSlide(-1);

        }

    });


    /* =========================
       INICIALIZAÇÃO
    ========================== */

    setupButtons();

    updateIndicators(active);

});