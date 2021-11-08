var inputEl = document.querySelector("#searchInput");
var formatEl = document.querySelector("#formatInput");
var buttonEl = document.querySelector("button");

function handleFormSubmit (){
    event.preventDefault();
    var searchInputVal = inputEl.value.trim();
    var formatInputVal = formatEl.value.trim();
    if(searchInputVal){
        var queryString = './search-results.html?q=' + searchInputVal + '&format=' + formatInputVal;
        document.location.assign("./search-results.html?" + queryString);
    }
}



buttonEl.addEventListener("click", handleFormSubmit);