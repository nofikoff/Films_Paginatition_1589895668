// при клике на сабмит - берем слово из searchText и
// формируем AJAX запрос на API  http://www.omdbapi.com/?s=The+best&apikey=d7790324&page=
// результат выводим  в resultDiv
// если больше 10 то выводим пагинацию (несколько ссылок)
// 1390 рездультатов - выводим по 10 фильмов - внизу
// на каждой циферке - click - page search type AJAX


(function () {
    "use strict";
    let httpRequest;

    let page = 1;

    let cached = null
    // window.addEventListener('scroll', event => {
    //     if (!cached) {
    //         setTimeout(() => {
    //             console.warn(`It's scrolling THROTTLED! ${window.scrollY} ${window.scrollX}`)
    //
    //             cached = null
    //         }, 1000)
    //     }
    //     cached = event
    // })

    window.addEventListener('scroll', function (e) {

        console.log("*", document.documentElement.scrollTop, document.documentElement.clientHeight, document.documentElement.scrollHeight);
        if (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            console.log("*ACTION*");
            page++;

/*
            let elChild = document.createElement('div');
            elChild.innerHTML = "<p>&nbsp; *** " + page + "<p>&nbsp; *** " + page + "<p>&nbsp; *** " + page + "<p>&nbsp; *** " + page + "<p>&nbsp; *** " + page;
            film.appendChild(elChild);

            film.innerHTML += "<p>&nbsp; *** " + page + "<p>&nbsp; *** " + page + "<p>&nbsp; *** " + page;
*/


            makeAPIRequest();
        }


    });

    document.getElementById("submitMe").addEventListener('click', makeAPIRequest);

    let userSelection = document.getElementsByClassName('pageMe');
    for (let i = 0; i < userSelection.length; i++) {
        (function (index) {
            userSelection[index].addEventListener("click", makeAPIRequest)
        })(i);
    }


    let modal = document.getElementById("myModal");

    // Get the button that opens the modal
    let btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 


    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    function makeAPIRequest(event) {


        // try {
        //     page = this.attributes["data-id"].value
        // } catch (e) {
        //     //page = 1
        // }

        messageNotfound.style.display = "none";
        //page
        //console.log(this.attributes["data-id"].value);
        httpRequest = new XMLHttpRequest();
        httpRequest.open('GET', 'http://www.omdbapi.com/?s=' + searchText.value + '&apikey=d7790324&&page=' + page, true);
        httpRequest.send();
        httpRequest.onreadystatechange = alertContents;
        // запрещаем переход по кнопке - страниа не перегружается
        //event.preventDefault();

    }

    function MoreDetails() {
        let httpRequest;
        document.getElementById("submitMe").addEventListener('click', makeAPIRequest);
    }

    function alertContents() {

        console.log(httpRequest);


        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                let out = JSON.parse(httpRequest.responseText)

                //response: "{"Response":"False","Error":"Movie not found!"}"


                if (out.Response == 'True') {
                    let b = "";
                    console.log(out);
                    // for(let i = 0; i < out.Search.length; i++){
                    for (let i = 0; i < out.Search.length; i++) {
                        b = b + `
                         <div class = "book">
                         <img src = "${out.Search[i].Poster}">
                         <h2 > ${out.Search[i].Title} </h2>
                         Type: ${out.Search[i].Type} <br>
                         Year: ${out.Search[i].Year} <br>
                         imdbID: ${out.Search[i].imdbID} <br>
                         <button class = "myBtn">Details</button>                   
                         </div>
                         <hr>
                         `
                    }

                    //film.innerHTML += "<div>"+b+"</div>";

                    let elChild = document.createElement('div');
                    elChild.innerHTML = b;
                    film.appendChild(elChild);


                    let userButton = document.getElementsByClassName('myBtn');
                    for (let i = 0; i < userButton.length; i++) {
                        (function (index) {
                            console.log("11");
                            userButton[index].addEventListener("click", function () {
                                myModal.style.display = "block";
                                console.log("22");

                            })
                        })(i);
                    }


                } else {
                    //Film not found
                    messageNotfound.style.display = "block";
                }


            } else {
                alert('There was a problem with the request.');
            }
        }
    }
})();


