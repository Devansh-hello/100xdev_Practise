function addToList(){
    const inputVal = document.querySelector("#input")
    const inputVal_final = inputVal.value;

    const newElm = document.createElement("div");
    newElm.innerHTML = inputVal_final

    document.querySelector("body").appendChild(newElm)


}