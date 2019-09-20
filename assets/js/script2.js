const leftButton = document.querySelector('.leftButton');
const rightButton = document.querySelector('.rightButton');
const searchButton = document.querySelector('.searchForm');
const navBarBeforeClick = document.querySelector('.navBarBeforeClick');
const loadpageBeforeClick = document.querySelector('.loadpage');
const buttonsBeforeClick = document.querySelector('.buttonsContainer');
const containerBeforeClick = document.querySelector('.containerBeforeClick');
const body = document.querySelector('body');
const h1 = document.querySelector('h1');
const h2 = document.querySelector('h2');
const donkey = document.querySelector('.demDonkeyContainer');
const elephant = document.querySelector('.gopElephantContainer');
const btnPrev = document.querySelector('.btnPrev');
const btnNext = document.querySelector('.btnNext');
const footer = document.querySelector('footer');
let leftwing = false;
let page = 1;
const resultsPerPage = 5;
const API_KEY = "YOUR API KEY HERE";

leftButton.addEventListener('click', handleLeftSubmit);
rightButton.addEventListener('click', handleRightSubmit);
searchButton.addEventListener('submit', handleSearch);
btnPrev.addEventListener('click', handlePrevClick);
btnNext.addEventListener('click', handleNextClick);

// ADD AND REMOVE CLASSES
function removeClasses() {
    navBarBeforeClick.classList.remove('navBarBeforeClick');
    loadpageBeforeClick.classList.remove('loadpage');
    buttonsBeforeClick.classList.remove('buttonsContainer','huge');
    containerBeforeClick.classList.remove('conatinerBeforeClick');
    donkey.classList.remove('demDonkeyContainer');
    elephant.classList.remove('gopElephantContainer');
    footer.classList.remove('footerBeforeClick');
}

function addClasses() {
    navBarBeforeClick.classList.add('navBar');
    loadpageBeforeClick.classList.add('loadpageAfterClick');
    buttonsBeforeClick.classList.add('buttonsAfterClick','mini');
    containerBeforeClick.classList.add('container');
    donkey.classList.add('donkeyAfterClick');
    elephant.classList.add('elephantAfterClick');
    h1.classList.add('h1AfterClick');
    h2.classList.add('h2AfterClick');
    footer.classList.add('footerAfterClick');

}

function addBodyLeftClass() {
    body.classList.add('bodyLeft');
    body.classList.remove('bodyRight');
}

function addBodyRightClass() {
    body.classList.add('bodyRight');
    body.classList.remove('bodyLeft');
}

function addloadpageRight() {
    loadpageBeforeClick.classList.remove('loadpageLeft');
    loadpageBeforeClick.classList.add('loadpageRight');
}

function addloadpageLeft() {
    loadpageBeforeClick.classList.remove('loadpageRight');
    loadpageBeforeClick.classList.add('loadpageLeft');
}

function addRightSpotify() {
    const spotify = document.querySelector('.spotify');
    spotify.innerHTML = '';
    spotify.insertAdjacentHTML('beforeend',
        `<iframe src="https://open.spotify.com/embed-podcast/show/66YUIC4eZbHnVrQq3Q10OG" width="100%" height="232" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`
    );
}

function addLeftSpotify(){
    const spotify = document.querySelector('.spotify');
    spotify.innerHTML = '';
    spotify.insertAdjacentHTML('beforeend',
        `<iframe src="https://open.spotify.com/embed-podcast/show/2mkBom7w7FdWivt1J0fEAr" width="100%" height="232" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`
    )
}

//HANDLE EVENTS

function handleLeftSubmit(event){
    // fetch results
    addClasses();
    addBodyLeftClass();
    addloadpageLeft();
    addLeftSpotify();
    removeClasses();
    leftwing = true;
    page = 1
    fetchLeftResults(page);

    
}

function handleRightSubmit(event) {
    addClasses();
    addBodyRightClass();
    addloadpageRight();
    addRightSpotify();
    removeClasses();
    leftwing = false;
    page = 1
    fetchRightResults(page);
}

function handleSearch(event){
    event.preventDefault();
    //catch input
    const input = document.querySelector('.searchInput').value;
    //get ride of whitespace
    const search = input.trim();
    fetchSearchResults(search);
}

function handlePrevClick(event){
    page--;
    console.log(page);
    if(leftwing == true){
        console.log(page);
        scrollTop();
        fetchLeftResults(page);
    } else{
        scrollTop();
        fetchRightResults(page);
    }
}

function handleNextClick(event){
    page++;
    console.log(page);
    if(leftwing == true){
        console.log(page);
        scrollTop();
        fetchLeftResults(page);
    } else {
        scrollTop();
        fetchRightResults(page);
    }
}

function scrollTop() {
    window.scrollTo({
        top: 100,
        left: 100,
        behavior: 'smooth'
    });
}

//FETCH RESULTS

function fetchLeftResults(page){
    const endpoint = `https://newsapi.org/v2/top-headlines?q=trump&sources=msnbc,cnn,the-washington-post,the-new-york-times,politico,time,the-huffington-post,abc-news,cbs-news&pageSize=5&page=${page}&apiKey=${API_KEY}`;
    fetchResults(endpoint, page);
}

function fetchRightResults(page){
    const endpoint = `https://newsapi.org/v2/top-headlines?q=trump&sources=breitbart-news,fox-news,national-review,daily-mail,the-washington-times,the-wall-street-journal&pageSize=5&page=${page}&apiKey=${API_KEY}`;
    fetchResults(endpoint, page);

}

function fetchSearchResults(search){
    if(leftwing == true){
        const endpoint = `https://newsapi.org/v2/everything?q=trump+${search}&sources=msnbc,cnn,the-washington-post,the-new-york-times,politico,time,the-huffington-post,abc-news,cbs-news&pageSize=10&apiKey=${API_KEY}`

        fetchResults(endpoint);
        console.log(leftwing);
    } else{
        const endpoint = `https://newsapi.org/v2/everything?q=trump+${search}&sources=breitbart-news,fox-news,national-review,daily-mail,the-washington-times,the-wall-street-journal,the-american-conservative&pageSize=10&apiKey=${API_KEY}`;

        fetchResults(endpoint);
        console.log(leftwing);
    }
}


function fetchResults(endpoint, page){
    fetch(endpoint)
        .then(Response => Response.json())
        .then(data => {
            console.log(data);
            const results = data.articles;
            const totalResults = data.totalResults;
            console.log(totalResults);
            displayResults(results, page, totalResults);
        })
        .catch((err) => console.log(err));
}



//DISPLAY RESULTS

function displayResults(results, page, totalResults){
    //store a reference to .content
    const content = document.querySelector('.content');
    //remove all child elements
    content.innerHTML = '';

    if(page == 1){
        btnPrev.classList.remove('visible');
        btnPrev.classList.add('hidden');
    } else {
        btnPrev.classList.remove('hidden');
        btnPrev.classList.add('visible');
    }

    if(page == Math.ceil(totalResults/resultsPerPage)){
        btnNext.classList.remove('visible');
        btnNext.classList.add('hidden');
    } else {
        btnNext.classList.remove('hidden');
        btnNext.classList.add('visible');
    }

    if(results.length == 0){
        content.classList.remove('contentShadow');
        content.classList.add('contentFlex');
        content.insertAdjacentHTML('beforeend',
            `<div class='errorItem'>

                <div class='errorItemImg'>
                    <img src='assets/images/trumpSearchError.png'>
                </div>
                <h3 class='errorItemTitle'>No Results Found</h3>
            </div>`
        )
        //loop over results array
        }else results.forEach(result => {
            content.classList.add('contentShadow');
            content.classList.remove('contentFlex');
            content.insertAdjacentHTML('beforeend',
            `
                <div class='resultItem' >
                    <h3 class='resultItemTitle'>${result.title}
                    </h3>
                    <div class='resultItemImg'>
                        <img src='${result.urlToImage}'>
                    </div>
                    <div class='resultItemDescription'>
                        <p class='resultItemDescription'>${result.description}</p>
                        <a href='${result.url}' target="_blank" rel="noopener noreferrer">${result.source.name}</a>
                    </div>
                </div>
            `
            )
        });

}

