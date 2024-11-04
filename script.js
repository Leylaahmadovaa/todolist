let b = document.querySelector(".b");
let output = document.querySelector(".containerOutput");
let sortButton = document.querySelector(".sort");
let isAscending = true;
let showlists=false

function creatingElement() {
  let div = document.createElement("div");
  div.classList.add("output");
  div.setAttribute("draggable", "true");
  div.innerHTML = `
             <input type="text" class="a" value="${b.value}" readonly >
             <div class="bu">
             <button class="edit" onclick="edit(this)" ><i class="fa-solid fa-pen"></i></button>
           <button class="save" onclick="save(this)" ><i class="fa-solid fa-check"></i></button>
              <button class="delete" onclick="sil(this)">
              <img src="assets/Group 52.svg" alt="sort" >
              </button>
              </div>
              `;
  output.appendChild(div);
  div.addEventListener("dragstart", dragStart);
  div.addEventListener("dragover", dragOver);
  div.addEventListener("drop", drop);
}

creatingElement();

function add() {
  showlists=!showlists
  if(showlists==true){
    output.style.display="block"
    b.style.display="none"
    creatingElement();
  }
  else{
    b.value=''
    output.style.display="none"
    b.style.display="block"
  }
}
function sil(element) {
  let div = element.parentElement;
  let iv = div.parentElement;
  iv.remove();
}

function save(element){
  let e = element.parentElement;
  let d=e.parentElement;
  let u=d.querySelector("input");
  u.setAttribute('value', `${u.value}`);
  u.setAttribute('readonly', true);
  console.log(u);

}
function edit(element){
  let e = element.parentElement;
  let d=e.parentElement;
  let u=d.querySelector("input");
  u.focus();
  u.removeAttribute("readonly");   

}

function sortItems() {
  let items = Array.from(output.children);
  items.sort((a, b) => {
    let textA = a.querySelector(".a").value.toLowerCase();
    let textB = b.querySelector(".a").value.toLowerCase();
    if (isAscending) {
      return textA.localeCompare(textB);
    } 
    else {
      return textB.localeCompare(textA);
    }
  });
  items.forEach((item) => output.appendChild(item));
  isAscending = !isAscending;
  updateSortButton();
}
function updateSortButton(){
  if (isAscending) {
    sortButton.setAttribute("title", "forward");
    sortButton.style.transform = "rotate(180deg)";
  } 
  else {
    sortButton.setAttribute("title", "backward");
    sortButton.style.transform = "";
  }
}
sortButton.addEventListener("click", sortItems);
let draggedElement;
function dragStart(event){
  draggedElement = event.target; 
  event.dataTransfer.effectAllowed = "move";
}
function dragOver(event){
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}
function drop(event) {
  event.preventDefault(); 
  if (event.target.classList.contains("output")){
    output.insertBefore(draggedElement, event.target);
    output.insertBefore(draggedElement, event.target); 
  } 
  else if (event.target.parentElement.classList.contains("output")){
    output.insertBefore(draggedElement, event.target.parentElement);
  }
  else if (event.target.classList.contains("delete")) {
    output.insertBefore(draggedElement, event.target.closest('.output').nextSibling);
  }
}