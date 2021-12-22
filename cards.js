const rand = (arr) => {
  return arr[Math.floor(Math.random()*arr.length)];
}

class MyCard extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    let suit = this.getAttribute("suit") || rand(["spades", "clubs", "diams", "hearts"]);
    let rank = this.getAttribute("rank") || rand([1,2,3,4,5,6,7,8,9,10]);
    let color = this.getColor(suit)


    this.innerHTML = `
    <div class="card color-${color}"><div class="card-inner">
      <div class="card-front"></div>
      <div class="card-back">
      <span class="card-topleft">
        <span class="rank">${rank}</span>
        <br>
        <span class="suit">&${suit};</span>
      </span>
      <span class="card-bottomright">
      <span class="card-topleft">
        <span class="rank">${rank}</span>
        <br>
        <span class="suit">&${suit};</span>
      </span>
      </span>
      </div></div></div>
    `
  }

  getColor(suit) {
    if (suit == "spades" || suit == "clubs") {
      return "black"
    } else {
      return "red"
    }
  }

  toggle() {
    this.classList.toggle("show")
    return this.classList.value.split(" ").includes("show")
  }
}




class MyDeck extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    console.log(this.getAttribute("cards"))
    let numCards = parseInt( this.getAttribute("cards") || rand([1,2,3,4,5,6,7,8,9,10]));

    this.innerHTML = ``
    for (let i of new Array(numCards)) {
      this.innerHTML += "<my-card></my-card>"
    }
  }
}

customElements.define("my-card", MyCard);
customElements.define("my-deck", MyDeck);

let accentcolor = getComputedStyle(document.documentElement)
    .getPropertyValue('--accent').replace("#", "");

document.head.innerHTML += `<style>.card-front {background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='12' viewBox='0 0 20 12'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='charlie-brown' fill='%${accentcolor}' fill-opacity='1'%3E%3Cpath d='M9.8 12L0 2.2V.8l10 10 10-10v1.4L10.2 12h-.4zm-4 0L0 6.2V4.8L7.2 12H5.8zm8.4 0L20 6.2V4.8L12.8 12h1.4zM9.8 0l.2.2.2-.2h-.4zm-4 0L10 4.2 14.2 0h-1.4L10 2.8 7.2 0H5.8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");}</style>`
