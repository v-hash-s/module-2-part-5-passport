"use strict";
//const galleryUrl: URL = new URL('api/gallery'); 
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
let total = Number(document.getElementById('total').innerText);
console.log(total)

// console.log(typeof(params.limit))
// let limit = location.search()
// console.log(limit)
const pageSearch = /\?page=\d+&limit=\d+/g;
let limit;
let pageNumber;

if(params.filter){
    return
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
}
else {
    pageNumber = 1;
    localStorage.setItem('page', pageNumber);
    updateLocation();
}

//createGalleryPage(pageNumber);
//const gallery = document.getElementById('gallery');
const btnBack = document.getElementById('back');
const btnNext = document.getElementById('next');
// async function fetchPhotos(fetchurl) {
//     let token = localStorage.getItem('token');
//     if (token) {
//         try {
//             let response = await fetch(fetchurl, {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': token,
//                 }
//             });
//             let data = await response.json();
//             return data.objects;
//         }
//         catch (err) {
//             console.log(err);
//         }
//     }
// }


async function createGalleryPage(pageNumber) {
    

    
    // console.log(response)
    try {
        checkTime();
        updateLocation();
    }
    catch (err) {
        alert(err.message);
    }
}
// async function displayPhotos(pageNumber) {
//     try {
//         let newUrl = 'http://localhost:8080/gallery?page=' + pageNumber;
//         let fetchedPhotos = await (fetchPhotos(newUrl));
//         gallery.innerHTML = "";
//         fetchedPhotos.forEach((item) => gallery.innerHTML += `<img src=${item} height='400'
//         width='400' style="object-fit: cover">`);
//     }
//     catch (err) {
//         alert(err.message);
//     }
// }
async function checkTime() {
    let timeNow = new Date();
    if (timeNow.getUTCMinutes() - Number(localStorage.getItem('time')) >= 10) {
        localStorage.removeItem('token');
        localStorage.removeItem('time');
        document.location.replace('/');
    }
}
function updateLocation() {
    console.log(location);
    location.search = `?page=${pageNumber}&limit=${limit}`;
}
btnBack.addEventListener('click', function () {
    pageNumber = previousPage(pageNumber);
    // alert(pageNumber)

    localStorage.setItem('page', pageNumber);
    createGalleryPage(pageNumber);
});
btnNext.addEventListener('click', function () {
    pageNumber = nextPage(pageNumber);
    localStorage.setItem('page', pageNumber);
    createGalleryPage(pageNumber);
});
// function changePageNumber(pageNumber: string, sign: string): string{
//     if(sign === "-"){
//         pageNumber = `${+pageNumber - 1}`;
//         if(+pageNumber < 1){
//             pageNumber = `${+pageNumber + 5}`;
//         }
//         localStorage.setItem('page', pageNumber);
//     } else if(sign === '+'){
//         pageNumber = `${+pageNumber + 1}`;
//         if(+pageNumber > 5){
//             pageNumber = `${+pageNumber - 5}`;
//         }
//         localStorage.setItem('page', pageNumber);
//     }
//     console.log(pageNumber)
//     return pageNumber;
// }
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

