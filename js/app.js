fetch("https://swapi.dev/api/starships/")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    createCard(data, (status = true));
  });

let btnSearch = document.querySelector(".btn-outline-success");
btnSearch.addEventListener("click", seacrhItems);

function seacrhItems(e) {
    e.preventDefault()
  let inputSearch = document.querySelector(".inputSearch").value;
  let item_content = document.querySelector(".items__content");
  item_content.classList.remove("error");
  fetch(`https://swapi.dev/api/starships/?search=${inputSearch}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.count == 0) {
        item_content.classList.add("error");
        item_content.innerHTML = "NO RESULTS";
        let pageItem = document.querySelectorAll(".page-item");

        for (let i = 0; i < pageItem.length; i++) {
          pageItem[i].remove();
        }
      } else {
        createCard(data, (status = true));
      }
    });
}

function createCard(data, status) {
  let item_content = document.querySelector(".items__content");
  item_content.innerHTML = "";
  data.results.map((item, index) => {
    let itemContainer = document.createElement("div");
    itemContainer.className = "card";
    itemContainer.style.width = "18rem";
    itemContainer.innerHTML = `  
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          <div class="idItems" style="display:none">${index}</div>
          <span class="card-text model"><strong>Model: </strong>${item.model}</span>
          <p class="card-text created "><strong>Created: </strong>${item.created}</p>
          <a  class="btn btn-primary btnInfo ">Click for Info</a>
        </div>`;

    item_content.append(itemContainer);
  });

  let btnInfo = document.querySelectorAll(".btnInfo");
  for (let i = 0; i < btnInfo.length; i++) {
    btnInfo[i].addEventListener("click", buttonInfo);
  }

  if (status) {
    createNumLi(data.count);
  }
}
function buttonInfo(event) {
  let id = event.target.parentElement.querySelector(".idItems").innerHTML;
  let card = event.target.parentElement;
  let inputSearch = document.querySelector(".inputSearch").value;
  let link;
  let pageLink=document.querySelectorAll(".page-link")
  for(let i=0;i<pageLink.length;i++)
  {
 
    if(pageLink[i].classList[1]=="color_li")
    {
        var page=pageLink[i].innerHTML
    } 
  }
  
  if (inputSearch) {
    link = `https://swapi.dev/api/starships/?search=${inputSearch}&page=${page}`;
  } else {
    link = `https://swapi.dev/api/starships/?page=${page}`;
  }
  fetch(`${link}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      event.target.remove();

      card.innerHTML = `  
        
          <h5 class="card-title">${data.results[id].name}</h5>
          <div class="idItems" style="display:none">${id}</div>
          <p class="card-text model"><strong>Model: </strong>${data.results[id].model}</p>
          <p class="card-text"><strong>Length: </strong>${data.results[id].length}</p>
          <p class="card-text"><strong>Passengers: </strong>${data.results[id].passengers}</p>
          <p class="card-text"><strong>Starship class: </strong>${data.results[id].starship_class}</p>
          <p class="card-text created"><strong>Created: </strong>${data.results[id].created}</p>
          <a  class="btn btn-primary btnReturn ">Return</a> `;
      var btnReturn = document.querySelectorAll(".btnReturn ");
      for (let i = 0; i < btnReturn.length; i++) {
        btnReturn[i].addEventListener("click", btnRet);
      }
    });
}

function btnRet(event) {
  let id = event.target.parentElement.querySelector(".idItems").innerHTML;
  let name = event.target.parentElement.querySelector(".card-title").innerHTML;
  let model = event.target.parentElement.querySelector(".model").innerHTML;
  let created = event.target.parentElement.querySelector(".created").innerHTML;
  let card = event.target.parentElement;
  card.innerHTML = "";
  card.innerHTML = `  <h5 class="card-title">${name}</h5>
<div class="idItems" style="display:none">${id}</div>
<span class="card-text">${model}</span>
<p class="card-text">${created}</p>
<a  class="btn btn-primary btnInfo ">Click for Info</a>
`;
  let btnInfo = document.querySelectorAll(".btnInfo");
  for (let i = 0; i < btnInfo.length; i++) {
    btnInfo[i].addEventListener("click", buttonInfo);
  }
}

function createNumLi(count) {
  let countOfNum = Math.round(count / 10);
  if (countOfNum < count / 10) {
    countOfNum = Math.round(countOfNum + 1);
  }
  let pageItem = document.querySelectorAll(".page-item");
  let pagination = document.querySelector(".pagination");

  for (let i = 0; i < pageItem.length; i++) {
    pageItem[i].remove();
  }
  for (let i = 1; i <= countOfNum; i++) {
    var li = document.createElement("li");
    li.className = "page-item  lol  ";
    li.innerHTML = `<a class="page-link " >${i}</a>`;
    pagination.append(li);
    li.addEventListener("click", downloadNewItems);
  }

  let redLi = document.querySelector(".lol");
  if (redLi) {
    redLi.children[0].classList.add("color_li");
  }
}

function downloadNewItems(event) {
  let page = event.target.innerHTML;
  let pagination = document.querySelectorAll(".lol");

  for (let i = 0; i < pagination.length; i++) {
    if (pagination[i].children[0].classList[1] == "color_li") {
      pagination[i].children[0].classList.remove("color_li");
    }
  }
  event.target.classList.toggle("color_li");

  let inputSearch = document.querySelector(".inputSearch").value;
  if (inputSearch) {
    newFetch(page, (status = false), inputSearch);
  } else {
    newFetch(page, (status = true));
  }
}

function newFetch(page, status, value) {
  if (status) {
    fetch(`https://swapi.dev/api/starships/?page=${page}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        createCard(data, (staus = false));
      });
  } else {
    fetch(`https://swapi.dev/api/starships/?search=${value}&page=${page}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        createCard(data, (staus = false));
      });
  }
}
