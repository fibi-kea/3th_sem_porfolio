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
      form.elements.submit.disabled = false;
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
  clone.querySelector("[data-img]").src =
    "https://portfolio-6518.restdb.io/media/" + item.featuredImage + "?f=w";

  document.querySelector("[data-container]").appendChild(clone);
}
