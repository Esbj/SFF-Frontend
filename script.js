const logInArea = document.getElementById("login");
const movieTitle = document.getElementsByClassName("title");
const triviaText = document.getElementsByClassName("trivia");
const flexContainer = document.getElementById("flex-container");
const registerForm = document.forms["register"];
const registerButton = document.getElementById("createNewStudio");

const StudioURL = "https://localhost:44361/api/Filmstudio";
const movieURL = "https://localhost:44361/api/Film";
const triviaURL = "https://localhost:44361/api/Filmtrivia";


if (localStorage.getItem("userName") != null) {
    showLoginPage();
} else {
    showStartPage();
}

registerForm.addEventListener("submit", function(e){
    e.preventDefault();
    var uwu = registerForm;
    console.log(document.getElementById("newStudioMail"))
    
})

function showStartPage() {
    logInArea.innerHTML =
        '<input type="text" placeholder="Användarnamn" name="login" id="user"><input type = "password" placeholder = "Lösenord" name = "pass" id = "password"><button type="submit" id="logInButton">Logga in</button>';
    flexContainer.innerHTML = "";
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
                    } 
                }
            })
    })
    fetch(movieURL)
        .then(response => response.json())
        .then(function (movies) {
            movies.forEach(m => {
                flexContainer.insertAdjacentHTML("beforeend",'<div class = "flex-item" id = "movieId:' + m.id + '"><img src = "images/LOTR.jpg"><p class = "title">' + m.name + '</p></div>');
                });
        })
    fetch(triviaURL)
        .then(response => response.json())
        .then(function (trivias) {
            var triviaText = document.getElementsByClassName("flex-container")
            trivias.forEach(trivias => {
                var movie = document.getElementById("movieId:" + trivias.filmId);
                if ("movieId:" + trivias.filmId === movie.id)
                    movie.insertAdjacentHTML("beforeend", '<p>' + trivias.trivia + '</p>')
                
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