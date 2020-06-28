// Picking of element
const clear = document.querySelector('.clear')
const dateToday = document.getElementById('date')
const list = document.getElementById('list')
const input = document.getElementById('input')
const addTask = document.querySelector('#btn')
const finish = document.querySelector('.finish')


const CHECK="fa-check-circle"
const UNCHECK = "fa-dot-circle"
const LINE_THROUGH = "lineThrough"

// Our Variables

let LIST, id;
 

// get item in local storage
let data = localStorage.getItem("TODO")
if(data){
    LIST = JSON.parse(data)
    id = LIST.length;
    loadLIST(LIST)
}else{
    LIST = [];
    id = 0;
}

// loadLIST function
function loadLIST(activity){
    activity.forEach(function(task){
        addToDo(task.name, task.id, task.done, task.trash)
    });
}

// empty the loca storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
})

// add date to app
const format = {weekday: "short",  day:"numeric", month:"short"}
const today = new Date();
 dateToday.innerHTML = today.toLocaleDateString("en-US", format)

//  add to do

 function addToDo(toDo, id, done, trash){

    if(trash){ return; }
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
     const task = `
     <li class="task">
            <i class="far ${DONE} co" job="complete" id="${id}"></i>
            <p class="text ${LINE}">${toDo}</p>
            <i class="fas fa-trash-alt de" job="delete" id="${id}"></i>
    </li>
     `;
     const position = "beforeend";
     list.insertAdjacentHTML(position, task);
 }

 addTask.addEventListener("click", function(event){
 const toDo = input.value;
 if(toDo){
    addToDo(toDo, id, false, false);

    LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false
    })
    localStorage.setItem("TODO", JSON.stringify(LIST))

    id++;
}
input.value = ''
})

document.addEventListener("keyup", function(event){
    if(event.keyCode == 13){
        const toDo = input.value;

        if(toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            })
            localStorage.setItem("TODO", JSON.stringify(LIST))

            id++;
        }
        input.value = ''
    }
})

// addToDo("Learn Language", 1, true, false)

// Complete toDo function

function completeToDo(element){
    element.classList.toggle(CHECK)
    element.classList.toggle(UNCHECK)
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    finish.classList.add(element)

    LIST[element.id].done = LIST[element.id].done ? false : true;

}

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// Add to item to ul
list.addEventListener("click", addList)

function addList(e){
    const element = e.target;
    const elementJob = element.attributes.job.value;

    if(elementJob == "complete"){
        completeToDo(element);
    } else if(elementJob == "delete"){
        removeToDo(element);
    }
    localStorage.setItem("TODO", JSON.stringify(LIST))
}
