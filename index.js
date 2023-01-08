const stars = [];

document.addEventListener('DOMContentLoaded', async () => {
    const gallery = await parseData();
    let i = 0;
    for (let i = 1; i <= 5; i++) {
        stars.push(document.querySelector(`.star[data-rate="${i}"]`));
    }
    showPhoto(i, gallery);
    document.querySelector('.arrow-left').addEventListener('click', previousPhoto);
    document.querySelector('.arrow-right').addEventListener('click', nextPhoto);
    document.querySelector('.rate').addEventListener('click', rate);


    function previousPhoto() {
        i--;
        if (i < 0) {
            i = gallery.length - 1;
        }
        showPhoto(i, gallery);
    }

    function nextPhoto() {
        i++;
        if (i >= gallery.length) {
            i = 0;
        }
        showPhoto(i, gallery);
    }

    function rate({target}) {
        const rate = target.dataset.rate;
        const key = gallery[i].date;
        localStorage.setItem(key, rate);
        showRating(key);
    }
})

function parseData() {
    return fetch('https://api.nasa.gov/planetary/apod?api_key=TsXV7xJ8dgIUbZZvzgenlnzrAb0GFvDn8kQQGgEs&start_date=2023-01-01')
        .then(response => response.json())
        .then(result => result.reverse());
}

function showPhoto(i, gallery) {
    const photo = document.querySelector('.photo img')
    const item = gallery[i];
    photo.src = item.url;
    photo.alt = item.title;
    const title = document.querySelector('.title');
    const description = document.querySelector('.description');
    const date = document.querySelector('.date');
    title.innerHTML = item.title;
    description.innerHTML = item.explanation;
    date.innerHTML = item.date;
    showMinis(i, gallery);
    showRating(item.date);
}

function showMinis(i, gallery) {
    document.querySelector('.current-photo').src = gallery[i].url;
    document.querySelector('.previous-photo').src = gallery[(i - 1 + gallery.length) % gallery.length].url; //сложные расчеты остатка от деления, чтобы перелистывать на нужную фотку
    document.querySelector('.next-photo').src = gallery[(i + 1) % gallery.length].url;
}

function showRating(key) {
    const rating = Number(localStorage.getItem(key));
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars[i - 1].classList.add('star-full');
        } else {
            stars[i - 1].classList.remove('star-full')
        }
    }
}


