
function testUser(){
    let usuario=document.querySelector('input[name="usuario"]').value;
    let password=document.querySelector('input[name="password"]').value;
    console.log(usuario+":"+password);
}

function loadListeners(){
    document.querySelector('input[name="btnlogin"]').addEventListener("click",testUser);
}

function init(){
    loadListeners();
}


window.onload=init;