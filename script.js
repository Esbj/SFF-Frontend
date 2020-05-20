const logInArea = document.getElementById("login");
const movieTitle = document.getElementsByClassName("title");
const triviaText = document.getElementsByClassName("trivia");
const flex_container = document.getElementById("flex-container")

const StudioURL = "https://localhost:44361/api/Filmstudio";
const movieURL = "https://localhost:44361/api/Film";
const triviaURL = "https://localhost:44361/api/Filmtrivia";


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
    fetch(movieURL)
        .then(response => response.json())
        .then(function (movies) {
            movies.forEach(m => {
                flex_container.insertAdjacentHTML("beforeend",
                '<div class = "flex-item" id = "movieId:'+m.id+'"><p>'+ m.name + '</p>'
                )                
            });
        })
    fetch(triviaURL)
        .then(response => response.json())
        .then(function (trivias) {
            trivias.forEach(trivias => {
                var movie = document.getElementById("movieId:"+trivias.filmId);
                movie.insertAdjacentHTML("beforeend", trivias.trivia);
            });
        })

    function showLoginPage() {
        console.log("Succes!");
        logInArea.innerHTML = "";
        logInArea.insertAdjacentHTML("beforeend", "Hej och välkommen " + localStorage.getItem("userName"));
        logInArea.insertAdjacentHTML("beforeend", '<br><button type="submit" id = "logOutButton">Logga ut</button>');
        var logOutButton = document.getElementById("logOutButton");

        logOutButton.addEventListener("click", function () {
            localStorage.removeItem("userName");
            showStartPage();
        })
    }
}