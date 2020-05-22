const userArea = document.getElementById("userArea");
const container = document.getElementById("container");
const registerButton = document.getElementById("createNewStudio");
const registerForm = document.forms["register"];

const StudioURL = "https://localhost:44361/api/Filmstudio";
const movieURL = "https://localhost:44361/api/Film";
const triviaURL = "https://localhost:44361/api/Filmtrivia";
const rentalURL = "https://localhost:44361/api/RentedFilm"

function showLoginPage() {
    console.log("Succes!");
    userArea.innerHTML = "";
    userArea.insertAdjacentHTML("beforeend", "Hej och välkommen " + localStorage.getItem("userName"));
    userArea.insertAdjacentHTML("beforeend", '<br><button type="submit" id = "logOutButton">Logga ut</button>');
    fetch(rentalURL)
        .then(response => response.json())
        .then(function (json) {
            for (let i = 0; i < json.length; i++) {
                const rental = json[i];
                if(rental.StudioId == localStorage.getItem("userId")){
                    console.log("du kom hit")
                    userArea.insertAdjacentHTML("beforeend", "<button>lämna tillbaka film</button>")
                }
            }
        })
    var logOutButton = document.getElementById("logOutButton");
    var movies = document.getElementsByClassName("movie");
    for (let i = 0; i < movies.length; i++) {
        movies[i].insertAdjacentHTML("beforeend", '<button class="rentButton">Hyr</button>')
        movies[i].insertAdjacentHTML("beforeend", '<button class="triviaButton">Lägg till Trivia</button>')
    }

    var triviaButtons = document.getElementsByClassName("triviaButton");
    for (let i = 0; i < triviaButtons.length; i++) {
        const triviaButton = triviaButtons[i];
        triviaButton.addEventListener("click", function () {
            var filmArea = triviaButton.parentElement;
            filmArea.insertAdjacentHTML("beforeend", '<input id = "newTrivia" type = text placeholder = "Skriv trivia här:">');
            filmArea.insertAdjacentHTML("beforeend", '<button id = "submitTrivia" type = "submit">Skicka</button>');
            var submitTrivia = document.getElementById("submitTrivia");
            submitTrivia.addEventListener("click", function () {
                fetch(triviaURL, {
                    method: "POST",
                    headers: {
                        "Content-type": 'application/json',
                    },
                    body: JSON.stringify({
                        filmId: parseInt(triviaButton.parentElement.id),
                        trivia: document.getElementById("newTrivia").value
                    })
                })
                    .then(response => response.json())
                    .then(json => console.log(json))
            })
        })
    }
    var rentButtons = document.getElementsByClassName("rentButton");
    for (var i = 0; i < rentButtons.length; i++) {
        const button = rentButtons[i];
        console.log(button.parentElement.id);

        button.addEventListener("click", async function () {
            await fetch(rentalURL, {
                method: "POST",
                headers: {
                    "Content-type": 'application/json',
                },
                body: JSON.stringify({
                    FilmId: parseInt(button.parentElement.id),
                    StudioId: parseInt(localStorage.getItem("userId")),
                    Returned: false
                })
            })
                .then(response => response.json())
                .then(rented => console.log(rented))
        })
    }
    logOutButton.addEventListener("click", function () {
        localStorage.removeItem("userName");
        var rentButtons = document.getElementsByClassName("rentButton");
        for (let i = 0; i < rentButtons.length; i++) {
            rentButtons[i].remove();
        }
        showStartPage();
    })
}


function showStartPage() {
    userArea.innerHTML =
        '<input type="text" placeholder="Användarnamn" name="login" id="user"><input type = "password" placeholder = "Lösenord" name = "pass" id = "password"><button type="submit" id="logInButton">Logga in</button>';
    var logInButton = document.getElementById("logInButton")
    logInButton.addEventListener("click", function logIn() {
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
                        localStorage.setItem("userName", getUser);
                        localStorage.setItem("userId", json[i].id);
                        showLoginPage();
                    }
                }
            })
    })
}

if (localStorage.getItem("userName") != null) {
    showLoginPage();
} else {
    showStartPage();
}

registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var newEmail = document.getElementById("newStudioMail").value;
    var newUser = document.getElementById("newStudioName").value;
    var newPassword = document.getElementById("newStudioPassword").value;

    fetch(StudioURL, {
        method: "POST",
        headers: {
            "Content-type": 'application/json',
        },
        body: JSON.stringify({
            name: newUser,
            password: newPassword,
            verified: true
        })
    })
        .then(response => response.json())
        .then(json => console.log(json))
})

fetch(movieURL)
    .then(response => response.json())
    .then(function (movies) {
        movies.forEach(m => {
            container.insertAdjacentHTML("beforeend", '<div class = "flex-item movie" id = "' + m.id + '"><img src = "images/LOTR.jpg"><p class = "title">' + m.name + '</p></div>');
        });
    })
fetch(triviaURL)
    .then(response => response.json())
    .then(function (trivias) {
        trivias.forEach(trivias => {
            var movie = document.getElementById("" + trivias.filmId);
            if ("" + trivias.filmId === movie.id)
                movie.insertAdjacentHTML("beforeend", '<li>' + trivias.trivia + '</li>')
        });
    })