    window.onload = function(){
    //initial values
    const API_KEY = 'cebf569ffa3e1f2e07bd825f523bb9bf';
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=cebf569ffa3e1f2e07bd825f523bb9bf';
    const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'


    //selecting elements from the DOm
    const buttonElement = document.querySelector('#search');
    const inputElement = document.querySelector('#inputValue');
    const movieSearchable = document.querySelector('#movies-searchable');



    //rendering movie images
    function movieSection(movies) {
        return movies.map((movie) => {
            if (movie.poster_path) {
                return `<img src=${IMAGE_URL + movie.poster_path} data-movie-id=${movie.id}/>`;
            }
        })
    }


    function createMovieContainer(movies) {
        const movieElement = document.createElement('div');
        movieElement.setAttribute('class', 'movie');

        const movieTemplate = `
        <section class="section">
            ${movieSection(movies)}
        </section>
        <div class="content">
            <p id="content-close">X</p>
        </div> `;

        movieElement.innerHTML = movieTemplate;
        return movieElement;
    }

    //rendering for movie results
    function renderSearchMovies(data) {
        //data.results
        movieSearchable.innerHTML = '';
        const movies = data.results;
        const movieBlock = createMovieContainer(movies);
        movieSearchable.appendChild(movieBlock);
        console.log('Data:', data);
    }

    //querying TMDb api for movie results
    buttonElement.onclick = function(event) {
        event.preventDefault();
        const value = inputElement.value;
        console.log('Value:', value);

        const newUrl = url + '&query=' + value;

        fetch(newUrl)
            .then((res) => res.json()) 
            .then(renderSearchMovies)
            .catch((error) =>{
                console.log('Error catching data:', error)
            });

        inputElement.value = '';
    }

    function createIframe() {
        const iframe = document.createElement('iframe');
        document.getElementById("iframe").innerHTML(`<h2> ${movieId} </h2>`);
        // document.write("<form id=personalRating> <input type=radio name=optradio>1 star <input type=radio name=optradio>2 star<input type=radio name=optradio>3 star<input type=radio name=optradio>4 star<input type=radio name=optradio>5 star <input type=radio checked hidden checked>");
        // document.write("<br><button type=button id=likeButton>LIKE</button>  <button type=button id=dislikeButton>DISLIKE</button>");
        // document.write("<br> <textarea id=commentBox name=comments placeholder='Leave a review!' rows=4></textarea>"); 
        // document.write("<br><input type=submit value=Save> </form>");
        // iframe 
        return iframe;
    }


    

    //showing content/review information when clicking on a movie
    document.onclick = function(event) {

        const target = event.target;


        if (target.tagName.toLowerCase() === 'img') {
            const movieId = target.dataset.movieId;
            // console.log('Event:', event);
            console.log('MovieID: ', movieId);
            const section = event.target.parentElement;
            const content = section.nextElementSibling;
            content.classList.add('content-display');

            const frameContainer = document.createElement('div');
            frameContainer.setAttribute('id', 'formContainer');
            // document.querySelector('frameContainer').innerHTML = `<h2> ${movieId} </h2>`;
            document.write(`<h2> ${movieId} </h2>`);
            document.write("<form id=personalRating> <input type=radio name=optradio>1 star <input type=radio name=optradio>2 star<input type=radio name=optradio>3 star<input type=radio name=optradio>4 star<input type=radio name=optradio>5 star <input type=radio checked hidden checked>");
            document.write("<br><button type=button id=likeButton>LIKE</button>  <button type=button id=dislikeButton>DISLIKE</button>");
            document.write("<br> <textarea id=commentBox name=comments placeholder='Leave a review!' rows=4></textarea>"); 
            document.write("<br><input type=submit value=Save> </form>");
        }

        // const movieIDPath = `movie/${movieId}/videos`;
        

        if (target.id === 'content-close') {
            const content = target.parentElement;
            content.classList.remove('content-display');
        }

    
    }



};