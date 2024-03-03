const popupModal = document.querySelector(".popup");
const popupOverlay = document.querySelector(".pop-overlay");
const game = document.querySelector(".game");
const infoIcon = document.querySelector(".info.icon");
const playButton = document.querySelector(".game .card-wrapper .play");
const cardWrapper = document.querySelector(".game .cardContainer");
const bagsVector = document.querySelector(".game .bags");
const body = document.querySelector(".body");
const arrows = document.querySelectorAll(".game .body .arrow");
const pauseButton = document.querySelector(".game .pause.icon");
const iconsArr = [...arrows, pauseButton];
const cards = document.querySelectorAll(".game-card .card-wrapper");
const icons = document.querySelectorAll(`.card-icon`);
const soundIcons = document.querySelectorAll(".card-icon.sound");
const recordIcons = document.querySelectorAll(".card-icon.speak");
const successModal = document.querySelector(".success-wrapper");
const closeButton = document.querySelector(".closeModal");
const overlay = document.querySelector(".overlay");
const animateInfo = () => {
  infoIcon.classList.add("show");
  infoIcon.addEventListener("animationend", () => {
    setTimeout(() => {
      infoIcon.classList.remove("show");
      infoIcon.classList.add("hide");
    }, 1000);
  });
};
infoIcon.addEventListener("click", () => {
  infoIcon.classList.remove("hide");
  animateInfo();
});
playButton.addEventListener("click", () => {
  document.querySelector("#start-audio").play();
  cardWrapper.classList.add("hide");
  bagsVector.style.visibility = "hidden";
  cardWrapper.addEventListener("animationend", () => {
    cardWrapper.classList.remove("hide");
    cardWrapper.style.visibility = "hidden";
    game.style.backgroundImage = "url('../media/images/gameBackground.svg')";
    body.classList.add("show");
    document.querySelector(".game-vector").classList.add("show");
    cards.forEach((card) => {
      card.classList.add("show");
    });
  });
});
const hideItems = () => {
  iconsArr.forEach((item) => {
    item.style.opacity = 0;
  });
};
let timer;
const resetTimer = () => {
  clearTimeout(timer);
  iconsArr.forEach((item) => {
    item.style.opacity = 1;
  });
  timer = setTimeout(hideItems, 3000);
};
icons.forEach((icon) => {
  icon.addEventListener("animationend", () => {
    if (icon.classList.contains("show")) {
      icon.classList.remove("show");
    } else if (icon.classList.contains("hide")) {
      icon.classList.remove("hide");
      icon.style.visibility = "hidden";
    }
  });
});
cards.forEach((card) => {
  card.addEventListener("click", (e) => {
    const cardId = card.dataset.id;
    const icons = document.querySelectorAll(`.card-icon[data-id="${cardId}"]`);
    if (!card.classList.contains("is-flipped")) {
      document.querySelector(`audio[id="${cardId}"]`).play();
      card.classList.remove("is-flippedBack");
      card.classList.add("is-flipped");
      icons.forEach((icon) => {
        icon.style.visibility = "visible";
        icon.classList.add("show");
      });
    } else {
      card.classList.remove("is-flipped");
      card.classList.add("is-flippedBack");
      icons.forEach((icon) => {
        icon.classList.add("hide");
      });
    }
  });
});
soundIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    icon.classList.add("clicked");
    const id = icon.dataset.id;
    document.querySelector(`audio[id="${id}"]`).play();
    icon.addEventListener("animationend", () => {
      icon.classList.remove("clicked");
    });
  });
});
recordIcons.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    e.preventDefault();
  });
  icon.addEventListener("pointerdown", () => {
    icon.classList.add("animate");
    icon.addEventListener("pointerup", () => {
      icon.classList.remove("animate");
    });
    icon.addEventListener("pointerout", () => {
      icon.classList.remove("animate");
    });
  });
});
document.addEventListener("mousemove", resetTimer);
document.addEventListener("touchstart", resetTimer);
document.querySelector(".show-success").addEventListener("click", () => {
  const score = 70;
  const text = document.querySelector(".text-card .score-text");
  text.textContent = `${score}%`;
  text.setAttribute("text", `${score}%`);
  successModal.style.visibility = "visible";
  overlay.classList.add("show");
  successModal.classList.add("show");
  setTimeout(() => {
    document.querySelector(`audio[id="success"]`).play();
  }, 500);
});
successModal.addEventListener("animationend", () => {
  successModal.classList.remove("show");
  successModal.classList.remove("hide");
});
const addCloseAnimation = () => {
  closeButton.classList.add("animate");
  closeButton.addEventListener("animationend", () => {
    closeButton.classList.remove("animate");
  });
  successModal.classList.add("hide");
  successModal.style.visibility = "hidden";
  overlay.classList.remove("show");
};
document.addEventListener("click", function (event) {
  const isVisible =
    window.getComputedStyle(successModal).visibility === "visible";
  var isClickInside =
    successModal.contains(event.target) || event.target === closeButton;
  if (!isClickInside && isVisible) {
    addCloseAnimation();
  }
});
closeButton.addEventListener("click", () => {
  addCloseAnimation();
});
const checkScreen = () => {
  const isPortrait = window.matchMedia("(orientation: portrait)").matches;
  const isMobile = window.innerWidth < 768 && isPortrait;
  return isMobile;
};
window.addEventListener("load", () => {
  const is_mobile = checkScreen();
  if (is_mobile) {
    popupModal.style.visibility = "visible";
    popupOverlay.style.visibility = "visible";
  } else {
    game.style.visibility = "visible";
  }
  animateInfo();
  let i = cards.length;
  cards.forEach((card) => {
    card.style.animationDelay = `${(i - 1) * 0.2}s`;
    i--;
  });
});
document.addEventListener("contextmenu", function (event) {
  var target = event.target;
  if (target.tagName === "IMG") {
    event.preventDefault();
  }
  return false;
});
window.addEventListener("orientationchange", function () {
  const is_mobile = checkScreen();
  if (window.orientation === 90 || window.orientation === -90) {
    if (is_mobile) {
      game.style.visibility = "visible";
      popupModal.style.visibility = "hidden";
      popupOverlay.style.visibility = "hidden";
    } else {
      popupModal.style.visibility = "visible";
      popupOverlay.style.visibility = "visible";
    }
  } else {
    popupModal.style.visibility = "visible";
    popupOverlay.style.visibility = "visible";
  }
});
