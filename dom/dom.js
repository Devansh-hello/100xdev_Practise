
let todo =[];

function addToDo() {
    const title = document.querySelector("#input").value.trim()
    
    todo.push({title});
    render(todo);
};

function render(todo){
    const showElm = document.createElement("div");
    showElm.innerHTML= todo.title;
    document.querySelector("body").appendChild(showElm);
};

