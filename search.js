var searchEl = document.querySelector("#searchInput");
var resultsTitleEl = document.querySelector("#result-text");
var resultcontentEl = document.querySelector("#result-content");
var searchButtonEl = document.querySelector("#search-button");
var goBackButtonEl = document.querySelector("#go-back");


function displayData(data) {
    var resultCard = document.createElement("div");
    resultCard.classList.add("result-card")

    var resultCardBody = document.createElement("div");
    resultCardBody.classList.add("result-card-body");
    resultCard.append(resultCardBody);

    var titleEl = document.createElement('h3');
    titleEl.textContent = data.title;

    var dateEl = document.createElement("p");
    dateEl.textContent = data.date;

    if (data.subject) {
        resultCardBody.innerHTML += '<strong>Subjects:</strong> ' + data.subject.join(', ') + '<br/>';
    }

    if (data.description) {
        resultCardBody.innerHTML +=
            '<strong>Description:</strong> ' + data.description[0];
    }

    var linkButton = document.createElement("a");
    linkButton.textContent = "Read More";
    linkButton.setAttribute("href", data.url)
    linkButton.classList.add("dark")

    resultCardBody.append(titleEl, dateEl, linkButton)
    resultcontentEl.append(resultCard);
  
}


function getCongressSearch(query, format) {

    var locQueryUrlPath = (format != undefined) ? 'https://www.loc.gov/' + format + '/?fo=json' : 'https://www.loc.gov/search/?fo=json';
    var locQueryUrl = locQueryUrlPath + "&q=" + query;
    fetch(locQueryUrl)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (data) {
            resultsTitleEl.textContent = data.search.query;
            if (!data.results.length) {
                console.log("no results found.")
                resultcontentEl.innerHTML = '<h3>No results found, search again!</h3>';
            } else {
                resultcontentEl.textContent = '';
                for (var i = 0; i < data.results.length - 30; i++) {
                    displayData(data.results[i]);
                }
            }

        })
}

function extractParams() {
    var formatTopic = document.location.search.split("=")[2]
    var searchTopic = document.location.search.split("=")[1].split("&")[0];

    /**
     * var searchParamsArr = document.location.search.split('&');
     *  var query = searchParamsArr[0].split('=').pop();
      var format = searchParamsArr[1].split('=').pop();
     */

    getCongressSearch(searchTopic, formatTopic)
}


function searchEventHandler() {

}

function redirectHandler() {

}

searchButtonEl.addEventListener("click", searchEventHandler);
goBackButtonEl.addEventListener("click", redirectHandler);

extractParams()