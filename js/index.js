document.addEventListener("DOMContentLoaded", () =>{ getMonsters()
addMonster()
const forward = document.getElementById("forward")
const back = document.getElementById("back")
const button = document.getElementById("button")
forward.addEventListener("click",getNextPage)
back.addEventListener("click", getPreviousPage)
createButton()
})

let page = 0
function getNextPage(){
    ++page
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
    .then(response => response.json())
    .then(renderAllMonsters)
}

function getPreviousPage(){
    --page
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
    .then(response => response.json())
    .then(renderAllMonsters)
}

function getMonsters(){
fetch("http://localhost:3000/monsters?_limit=50&_page=1")
.then(response => response.json()).then(renderAllMonsters)
}

function renderAllMonsters(monsters){
    const monsterContainer = document.getElementById("monster-container")
    monsterContainer.innerHTML = ""
     monsters.forEach(renderMonster)
}

function renderMonster(x){
    const monsterContainer = document.getElementById("monster-container")
    const div = document.createElement("div")
    monsterContainer.append(div)
    const h2 = document.createElement("h2")
    h2.innerText = x.name
    div.append(h2)
    const h4 = document.createElement("h4")
    h4.innerText = `Age: ${x.age}`
    div.append(h4)
    const p = document.createElement("p")
    p.innerText = `Bio: ${x.description}`
    div.append(p)
}

function addMonster(){
    const createMonster = document.getElementById("create-monster")
    const form = document.createElement("form")
    form.id = "monster-form"
    createMonster.append(form)
    const nameInput = document.createElement("input")
    nameInput.id = "name"
    nameInput.placeholder = "name..."
    form.append(nameInput)
    const ageInput = document.createElement("input")
    ageInput.id = "age"
    ageInput.placeholder = "age..."
    form.append(ageInput)
    const descriptionInput = document.createElement("input")
    descriptionInput.id = "description"
    descriptionInput.placeholder = "description..."
    form.append(descriptionInput)
}

function createButton(){
    const button = document.createElement("button")
    button.id = "button"
    button.innerText = "Create"
    const form = document.getElementById("monster-form")
    form.append(button)
    button.addEventListener("submit", event => createMonster(event))
}

function createMonster(e){
    let monsterObject = {
    name:e.target.name.value,
    age:e.target.age.value,
    description:e.target.description.value
    }
    fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(monsterObject)
        .then(response => {
            debugger
            response.json()
        })
        .then(data => {  
            console.log(data)  
            return data  
        })
    })
}
