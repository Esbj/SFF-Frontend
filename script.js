var main = document.getElementById("main");
var content = document.getElementById("content")
var header = document.getElementById("header")
var login = document.getElementById("login");
var logInButton = document.getElementById("logInButton")


logInButton.addEventListener("click", function(){
    console.log("Button!!!");

    var getUser = document.getElementById("user").value;
    var getPassword = document.getElementById("password").value;

    console.log(getUser + " " + getPassword)

    fetch("https://localhost:44361/api/Filmstudio")
        .then(function(response)
        {
            return response.json();
        })
        .then(function(json)
        {
            console.log(json);
            for(var i=0; json.length > i; i++){
                if(json[i].name == getUser && json[i].password == getPassword){
                    logIn();
                } else {
                    console.log("Welp... that didn't work did it")
                }
            }
        })
})


function logIn() {
    console.log("Succes!")
}