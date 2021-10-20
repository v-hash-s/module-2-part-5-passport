"use strict";
//const galleryUrl: URL = new URL('api/gallery'); 
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
let total = Number(document.getElementById('total').innerText);
console.log(total)

const pageSearch = /\?page=\d+&limit=\d+/g;
let limit;
let pageNumber;
let filter;
if(params.filter){
    filter = params.filter
    console.log(filter)
}
else if(params.limit !== undefined){
    limit = params.limit
} else {
    params.limit = 10
}

if (location.search.match(pageSearch)) {
    pageNumber = params.page
    localStorage.setItem('page', pageNumber);
    document.getElementById("pageNumInForm").value = pageNumber;
    document.getElementById("limitNumInForm").value = params.limit
}
else if (localStorage.getItem('page')) {
    pageNumber = localStorage.getItem('page');
    updateLocation();
} else if(limit)(
    updateLocation()
)
else {
    pageNumber = 1;
    localStorage.setItem('page', pageNumber);
    updateLocation();
}


const btnBack = document.getElementById('back');
const btnNext = document.getElementById('next');


async function createGalleryPage() {
    
    try {
        checkTime();
        updateLocation();
    }
    catch (err) {
        alert(err.message);
    }
}

async function checkTime() {
    let timeNow = new Date();
    if (timeNow.getUTCMinutes() - Number(localStorage.getItem('time')) >= 10) {
        localStorage.removeItem('token');
        localStorage.removeItem('time');
        document.location.replace('/');
    }
}
function updateLocation() {
    if(params.filter){
        // location.search = `?filter=true`;
        return
    } else {

        console.log(location);
        location.search = `?page=${pageNumber}&limit=${limit}`;
    }
}
btnBack.addEventListener('click', function () {
    pageNumber = previousPage(pageNumber);

    localStorage.setItem('page', pageNumber);
    createGalleryPage(pageNumber);
});
btnNext.addEventListener('click', function () {
    pageNumber = nextPage(pageNumber);
    localStorage.setItem('page', pageNumber);
    createGalleryPage(pageNumber);
});

function nextPage(pageNumber) {
    pageNumber = `${+pageNumber + 1}`;
    console.log(total)
    if (+pageNumber > total) {
        pageNumber = `${+pageNumber - total}`;
    }
    
    localStorage.setItem('page', pageNumber);
    console.log(pageNumber);
    return pageNumber;
}
function previousPage(pageNumber) {
    pageNumber = `${+pageNumber - 1}`;
   
    if (+pageNumber < 1) {
        pageNumber = `${+pageNumber + total}`;
    }
    
    localStorage.setItem('page', pageNumber);
    console.log(pageNumber);
    return pageNumber;
}

