"use strict";

window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("init");
  get();
  navMenu();
}

function post(newItem) {
  fetch("https://portfolio-6518.restdb.io/rest/portfolio", {
    method: "post",
    body: JSON.stringify(newItem),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c929a17cac6621685acc104",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {
      showItem(data);
    });
}

function get() {
  console.log("get");
  fetch("https://portfolio-6518.restdb.io/rest/portfolio", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c929a17cac6621685acc104",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {
      data.forEach(showItem);
      console.log(data);
    });
}

function showItem(item) {
  console.log("showItem");
  const template = document.querySelector("[data-template]").content;
  const clone = template.cloneNode(true);
  clone.querySelector("[data-title]").textContent = item.title;
  clone.querySelector("[data-category]").textContent = item.category;
  clone.querySelector("[data-github]").href = item.github;
  clone.querySelector("[data-github]").textContent = "Github";

  if (item.github === "") {
    clone.querySelector("[data-github]").textContent = "";
    clone.querySelector("[data-github]").classList.remove("githublink");
  }

  clone.querySelector("[data-img]").src =
    "https://portfolio-6518.restdb.io/media/" + item.featuredImage + "?f=w";

  clone.querySelector(".item-content").addEventListener("click", e => {
    console.log(e);
    singleItem(item._id);
    document.querySelector("#modal").classList.remove("hide-modal");
  });

  document.querySelector("[data-container]").appendChild(clone);
}

// -------------------

function singleItem(id) {
  fetch("https://portfolio-6518.restdb.io/rest/portfolio/" + id, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c929a17cac6621685acc104",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {
      showSingleItem(data);
    });
}

function showSingleItem(item) {
  document.querySelector("#load").classList.add("hide-modal");
  document.querySelector("#modal-container").classList.remove("hide-modal");

  console.log(item.title);
  let modalDescr = document.querySelector("[data-modal=description]");

  document.querySelector("[data-modal=img]").src =
    "https://portfolio-6518.restdb.io/media/" + item.featuredImage + "?f=w";
  document.querySelector("[data-modal=title]").textContent = item.title;
  document.querySelector("[data-modal=description]").innerHTML =
    item.description;
  modalDescr.querySelector("span").removeAttribute("style");
  document.querySelector("[data-modal=github]").href = item.github;
  document.querySelector("[data-modal=link]").href = item.link;

  document.querySelector("#close-modal").addEventListener("click", e => {
    document.querySelector("#modal").classList.add("hide-modal");
    document.querySelector("#modal-container").classList.add("hide-modal");
    document.querySelector("#load").classList.remove("hide-modal");
  });
}

//		nav-menu-mobile - eventlisterns
function navMenu() {
  console.log("navMenu");

  function toggleMenu() {
    console.log("toggleMenu");
    document.querySelector(".burger").classList.toggle("change");
    document.querySelector("nav").classList.toggle("show");
    document.querySelector("header").classList.toggle("show");
  }

  function closeMenu() {
    console.log("closeMenu");
    document.querySelector(".burger").classList.remove("change");
    document.querySelector("nav").classList.remove("show");
    document.querySelector("header").classList.remove("show");
  }

  document.querySelector(".burger").addEventListener("click", toggleMenu);
  document.querySelector("nav ul").addEventListener("click", closeMenu);
}
