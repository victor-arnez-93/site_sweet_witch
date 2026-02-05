/* =====================================================
   SWEET WITCH — MAIN JS
   Funções:
   - Música ambiente (play / pause)
   - Scroll animations (fade / slide)
   - Carrossel de produtos
   - Botão voltar ao topo
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       MÚSICA AMBIENTE
    ================================================= */
    const btnMusic = document.getElementById("btnMusic");
    const audio = document.getElementById("audioAmbient");
    let tocando = false;

    if (btnMusic && audio) {
        audio.volume = 0.6;

        btnMusic.addEventListener("click", () => {
            if (!tocando) {
                audio.play().then(() => {
                    tocando = true;
                    btnMusic.classList.add("ativo");
                    btnMusic.innerHTML = `
                        <i class="fa-solid fa-volume-high"></i>
                        Pausar atmosfera
                    `;
                }).catch(() => {
                    console.warn("Interação necessária para iniciar o áudio.");
                });
            } else {
                audio.pause();
                tocando = false;
                btnMusic.classList.remove("ativo");
                btnMusic.innerHTML = `
                    <i class="fa-solid fa-music"></i>
                    Ativar atmosfera
                `;
            }
        });
    }

    /* =================================================
       ANIMAÇÕES SUAVES POR SCROLL
    ================================================= */
    const animatedSections = document.querySelectorAll(
        ".anim-fade, .anim-slide-up, .anim-slide-left"
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visivel");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    animatedSections.forEach(sec => observer.observe(sec));

/* =================================================
   CARROSSEIS — PRODUTOS + DEPOIMENTOS
================================================= */

const carrosseis = document.querySelectorAll(".carrossel, .depoimentos-carrossel");

carrosseis.forEach(carrossel => {

    let autoScroll = null;
    const velocidade = carrossel.classList.contains("depoimentos-carrossel")
        ? 0.6   // mais lento para leitura
        : 1.5;  // produtos

    // DUPLICA SLIDES (loop infinito)
    const slides = [...carrossel.children];
    slides.forEach(slide => {
        carrossel.appendChild(slide.cloneNode(true));
    });

    function iniciarAutoScroll() {
        if (autoScroll) return;

        autoScroll = setInterval(() => {
            carrossel.scrollLeft += velocidade;

            const limite = carrossel.scrollWidth / 2;

            if (carrossel.scrollLeft >= limite) {
                carrossel.scrollLeft = 0;
            }
        }, 16);
    }

    function pararAutoScroll() {
        clearInterval(autoScroll);
        autoScroll = null;
    }

    // Desktop
    carrossel.addEventListener("mouseenter", pararAutoScroll);
    carrossel.addEventListener("mouseleave", iniciarAutoScroll);

    // Mobile
    carrossel.addEventListener("touchstart", pararAutoScroll, { passive: true });
    carrossel.addEventListener("touchend", iniciarAutoScroll);

    // Aguarda imagens
    window.addEventListener("load", iniciarAutoScroll);
});

/* =================================================
   DEPOIMENTOS — PAUSAR CARROSSEL AO EXPANDIR
================================================= */
document.addEventListener("click", function (e) {
    const botao = e.target.closest(".btn-expandir");
    if (!botao) return;

    const card = botao.closest(".depoimento-card");
    if (!card) return;

    const carrossel = card.closest(".depoimentos-carrossel");
    if (!carrossel) return;

    card.classList.toggle("expandido");

    const expandido = card.classList.contains("expandido");
    botao.textContent = expandido ? "Ler menos" : "Ler mais";

    /* pausa / retoma autoplay */
    if (expandido) {
        carrossel.dispatchEvent(new Event("mouseenter"));
    } else {
        carrossel.dispatchEvent(new Event("mouseleave"));
    }
});

/* =================================================
   MENU HAMBURGUER — MOBILE
================================================= */
const menuHamburguer = document.querySelector(".menu-hamburguer");
const menuPrincipal = document.querySelector(".menu-principal");

if (menuHamburguer && menuPrincipal) {
    menuHamburguer.addEventListener("click", () => {
        menuPrincipal.classList.toggle("ativo");
    });

    // Fecha ao clicar em link
    menuPrincipal.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            menuPrincipal.classList.remove("ativo");
        });
    });
}

    /* =================================================
       BOTÃO VOLTAR AO TOPO
    ================================================= */
    const btnTopo = document.getElementById("btnTopo");

    if (btnTopo) {
        btnTopo.style.opacity = "0";
        btnTopo.style.pointerEvents = "none";

        window.addEventListener("scroll", () => {
            if (window.scrollY > 500) {
                btnTopo.style.opacity = "1";
                btnTopo.style.pointerEvents = "auto";
            } else {
                btnTopo.style.opacity = "0";
                btnTopo.style.pointerEvents = "none";
            }
        });

        btnTopo.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

});
