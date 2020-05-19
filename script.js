var logInArea = document.getElementById("login");

var StudioURL = "https://localhost:44361/api/Filmstudio";
var movieTitle = document.getElementsByClassName("title")


if (localStorage.getItem("userName") != null) {
    showLoginPage();
} else {
    showStartPage();
}

function showStartPage() {
    logInArea.innerHTML =
        '<input type="text" placeholder="Användarnamn" name="login" id="user"><input type = "password" placeholder = "Lösenord" name = "pass" id = "password"><button type="submit" id="logInButton">Logga in</button>'
    var logInButton = document.getElementById("logInButton")
    logInButton.addEventListener("click", function () {
        console.log("Button!!!");

        var getUser = document.getElementById("user").value;
        var getPassword = document.getElementById("password").value;

        console.log(getUser + " " + getPassword)

        fetch(StudioURL)
            .then(response => response.json())
            .then(function (json) {
                console.log(json);
                for (var i = 0; json.length > i; i++) {
                    if (json[i].name == getUser && json[i].password == getPassword && json[i].verified == true) {
                        localStorage.setItem("userName", getUser)
                        showLoginPage();
                    } else {
                        console.log("Welp... that didn't work did it")
                    }
                }
            })
    })
}

function showLoginPage() {
    console.log("Succes!");
    logInArea.innerHTML = "";
    logInArea.insertAdjacentHTML("beforeend", "Hej och välkommen " + localStorage.getItem("userName"));
    logInArea.insertAdjacentHTML("beforeend", '<br><button type="submit" id = "logOutButton">Logga ut</button>');
    var logOutButton = document.getElementById("logOutButton");


    logOutButton.addEventListener("click", function () {
        localStorage.removeItem("userName");
    })
}