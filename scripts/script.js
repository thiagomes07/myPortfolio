/* Cálculo correto de altura da tela: */

const documentHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
};
window.addEventListener("resize", documentHeight);
documentHeight();

/*  Animação do scroll: */

window.sr = ScrollReveal({ reset: true });

sr.reveal("#aboutTexts", {
  distance: "100%",
  origin: "left",
  duration: 1000,
});

sr.reveal("#aboutImg", {
  distance: "100%",
  origin: "right",
  duration: 1000,
});

sr.reveal("#iscool", { duration: 2000 });
sr.reveal("#dbgeral", { duration: 2000 });

sr.reveal("#contact", {
  duration: 1000,
  distance: "50px",
  easing: "cubic-bezier(0.5, -0.01, 0, 1.005)",
  interval: 64,
  origin: "bottom",
  viewFactor: 0.32,
});

/* Abrir menu em dispositivos móveis: */

document.querySelector("ul#menu .fa-xmark").addEventListener("click", () => {
  openMenu(false);
});
document.querySelector("nav > i.fa-bars").addEventListener("click", () => {
  openMenu(true);
});

function openMenu(action) {
  if (window.innerWidth > 440) {
    action
      ? (document.getElementById("menu").style.right = "0")
      : (document.getElementById("menu").style.right = "-160px");
  } else {
    action
      ? (document.getElementById("menu").style.right = "0")
      : (document.getElementById("menu").style.right = "-135px");
  }
}

window.addEventListener("resize", ()=>{
  if (window.innerWidth > 440) document.getElementById("menu").style.right = "-160px"
});

/* Fechar menu automaticamente quando o usuário clicar em alguma seção */

document
  .querySelector("ul#menu > li:nth-of-type(1)")
  .addEventListener("click", () => {
    openMenu(false);
  });

document
  .querySelector("ul#menu > li:nth-of-type(2)")
  .addEventListener("click", () => {
    openMenu(false);
  });

document
  .querySelector("ul#menu > li:nth-of-type(3)")
  .addEventListener("click", () => {
    openMenu(false);
  });

/* Animações: */

document
  .querySelector("div#headerTextAndImage > img")
  .addEventListener("click", () => {
    animateCSS("div#headerTextAndImage > img", "zoomOutLeft").then(() => {
      animateCSS("div#headerTextAndImage > img", "zoomInRight");
    });
  });

document.querySelector("#headerText > h1").addEventListener("mouseover", () => {
  if (!isScrolling()) animateCSS("#headerText > h1", "rubberBand");
});

document.querySelector("#about .title").addEventListener("click", () => {
  animateCSS("#about .title", "hinge").then(() => {
    animateCSS("#about .title", "fadeInDownBig");
  });
});

document.querySelector("#portfolio .title").addEventListener("click", () => {
  animateCSS("#portfolio .title", "hinge").then(() => {
    animateCSS("#portfolio .title", "zoomInDown");
  });
});

document.querySelector("#contact .title").addEventListener("click", () => {
  animateCSS("#contact .title", "hinge").then(() => {
    animateCSS("#contact .title", "bounceInDown");
  });
});

window.addEventListener("scroll", () => {
  window.lastScrollTime = new Date().getTime();
});

function isScrolling() {
  return (
    window.lastScrollTime && new Date().getTime() < window.lastScrollTime + 500
  );
}

const animateCSS = (element, animation, prefix = "animate__") =>
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });

/* Mudar aba na seção "Sobre Mim": */

function openTab(tabName) {
  let tabLinks = document.getElementsByClassName("tabLinks");
  let tabContents = document.getElementsByClassName("tabContents");

  for (tabLink of tabLinks) {
    tabLink.classList.remove("activeLink");
  }
  for (tabContent of tabContents) {
    tabContent.classList.remove("activeTab");
  }
  tabName == "skills"
    ? document.getElementById("skillsLink").classList.add("activeLink")
    : document.getElementById("educationLink").classList.add("activeLink");

  document.getElementById(tabName).classList.add("activeTab");
}

/* Reposicionamento de elementos por conta da responsividade: */

window.onload = changePlaces();

window.addEventListener("resize", changePlaces());

function changePlaces() {
  const aboutTitle = document.querySelector("section#about h1");
  const iscoolTitle = document.querySelector("div#iscool h2");
  const dbgeralTitle = document.querySelector("div#dbgeral h2");

  if (window.innerWidth <= 1000) {
    const aboutImage = document.querySelector("div#aboutImg");
    const iscoolImages = document.querySelector("div#iscoolImages");
    const gbgeralImage = document.querySelector("div#dbgeralImages");

    aboutImage.insertAdjacentElement("afterbegin", aboutTitle);
    gbgeralImage.insertAdjacentElement("beforebegin", dbgeralTitle);
    iscoolImages.insertAdjacentElement("beforebegin", iscoolTitle);
  }

  if (window.innerWidth > 1000) {
    const aboutTexts = document.querySelector("div#aboutTexts");
    const iscoolTexts = document.querySelector("div#iscoolTexts");
    const dbgeralTexts = document.querySelector("div#dbgeralTexts");

    aboutTexts.insertAdjacentElement("afterbegin", aboutTitle);
    iscoolTexts.insertAdjacentElement("afterbegin", iscoolTitle);
    dbgeralTexts.insertAdjacentElement("afterbegin", dbgeralTitle);
  }
}

/* Validação e envio de formulário: */

window.onload = initFormValidation();

function initFormValidation() {
  const form = document.querySelector("#contact form");
  const name = document.querySelector('#contact input[type="text"]');
  const email = document.querySelector('#contact input[type="email"]');
  const message = document.querySelector("#contact textarea");
  const submitBtn = document.querySelector("#contact button");
  let error = false;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    submitBtn.disabled = true;
    name.disabled = true;
    email.disabled = true;
    message.disabled = true;
    submitBtn.textContent = "Enviando...";

    const nameValue = name.value.trim();
    const emailValue = email.value.trim();
    const messageValue = message.value.trim();

    if (nameValue === "") {
      name.parentElement.classList.add("error");
      error = true;
    }

    if (emailValue === "") {
      email.parentElement.classList.add("error");
      error = true;
    }

    if (messageValue === "") {
      message.parentElement.classList.add("error");
      error = true;
    }

    if (!error) {
      await fetch("https://formsubmit.co/ajax/thiagogomesalmeida27@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameValue,
          email: emailValue,
          message: messageValue,
        }),
      })
        .then(() => {
          submitBtn.textContent = "Enviado";
          submitBtn.style.border = "2px solid #4eca64";
          submitBtn.style.boxShadow = "0px 0px 10px #4eca6572";
          submitBtn.style.color = "#4eca64";

          name.parentElement.classList.add("success");
          email.parentElement.classList.add("success");
          message.parentElement.classList.add("success");

          setTimeout(() => {
            animateCSS("#contact button", "tada");
          }, 3000);

          setTimeout(() => {
            submitBtn.textContent = "Enviar";
            submitBtn.style.border = null;
            submitBtn.style.boxShadow = null;
            submitBtn.style.color = null;

            submitBtn.removeAttribute("disabled");
            name.removeAttribute("disabled");
            email.removeAttribute("disabled");
            message.removeAttribute("disabled");

            name.parentElement.classList.remove("success");
            email.parentElement.classList.remove("success");
            message.parentElement.classList.remove("success");

            name.value = "";
            email.value = "";
            message.value = "";
          }, 7000);
        })
        .catch((error) => {
          console.log(error);
          submitBtn.textContent = "Erro";
          submitBtn.style.border = "2px solid #d31717";
          submitBtn.style.boxShadow = "0px 0px 10px #d317177b";
          submitBtn.style.color = "#d31717";

          name.parentElement.classList.add("error");
          email.parentElement.classList.add("error");
          message.parentElement.classList.add("error");

          setTimeout(() => {
            animateCSS("#contact button", "headShake");
          }, 3000);

          alert("Ocorreu um erro ao enviar a mensagem: " + error);

          setTimeout(() => {
            submitBtn.textContent = "Enviar";
            submitBtn.style.border = null;
            submitBtn.style.boxShadow = null;
            submitBtn.style.color = null;

            submitBtn.removeAttribute("disabled");
            name.removeAttribute("disabled");
            email.removeAttribute("disabled");
            message.removeAttribute("disabled");

            name.parentElement.classList.remove("error");
            email.parentElement.classList.remove("error");
            message.parentElement.classList.remove("error");

            name.value = "";
            email.value = "";
            message.value = "";
          }, 7000);
        });
    }
  });
}
