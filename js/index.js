"use strict";

window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("init");
  get();
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
    "https://portfolio-6518.restdb.io/media/" + item.featuredImage + "?s=w";

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

  if (item.github === "") {
    document.querySelector("[data-modal=github]").textContent = "";
    document
      .querySelector("[data-modal=github]")
      .classList.remove("modal-button");
  } else {
    document.querySelector("[data-modal=github]").href = item.github;
    document.querySelector("[data-modal=github]").textContent = "Github";
  }

  if (item.link === "") {
    document.querySelector("[data-modal=link]").textContent = "";
    document
      .querySelector("[data-modal=link]")
      .classList.remove("modal-button");
  } else {
    document.querySelector("[data-modal=link]").href = item.link;
    document.querySelector("[data-modal=link]").textContent = "Link";
  }

  document.querySelector("#close-modal").addEventListener("click", e => {
    document.querySelector("#modal").classList.add("hide-modal");
    document.querySelector("#modal-container").classList.add("hide-modal");
    document.querySelector("#load").classList.remove("hide-modal");
    document.querySelector("[data-modal=link]").classList.add("modal-button");
    document.querySelector("[data-modal=github]").classList.add("modal-button");
  });
}
