const key = "AIzaSyB5lwDmmMVKqFu797h4BeTNtdryLb0kqms";
const url = 'https://youtube.googleapis.com/youtube/v3/search';
const query = '?part=snippet&maxResults=15&type=video&key=' + key + '&q=';
const relatedTo = '&relatedToVideoId=';
const searchButton = document.querySelector(".search button");
const search = document.querySelector(".search input");
const videoList = document.querySelector(".video-list");
const videoPerview = document.querySelector("iframe");

const playVideo = (videoId) => {
    videoPerview.setAttribute("src", 'https://www.youtube.com/embed/' + videoId);
    videoPerview.classList.add("visible");
    onSearch(videoId);
}
const createVideo = (video) => {
    const videoEl = document.createElement("div");
    const img = document.createElement("img");
    const title = document.createElement("h3");
    img.setAttribute('src', video.snippet.thumbnails.default.url);

    title.textContent = video.snippet.title;
    videoEl.appendChild(img);
    videoEl.appendChild(title);

    videoEl.addEventListener('click', () => playVideo(video.id.videoId))

    videoList.appendChild(videoEl);
}

const listVideos = videos => {
    search.value = "";
    videoList.innerHTML = "";
    //videoPerview.classList.remove('visible');
    videos.forEach(video => createVideo(video))
}

const onSearch = (videoId) => {
    const req = new XMLHttpRequest();
    const path = videoId ? url + query + relatedTo + videoId : url + query + '&q=' + search.value;
    req.open('GET', path);
    req.onload = () => {
        listVideos(JSON.parse(req.responseText).items)
    }

    req.send();
}

/*const onRelatedSearch = (videoId) => {
    const req = new XMLHttpRequest();
    req.open('GET', url + query + relatedTo + videoId);

    req.onload = () => {
        listVideos(JSON.parse(req.responseText).items)
    }

    req.send();
}*/

searchButton.addEventListener('click', () => {
    videoPerview.classList.remove('visible');
    onSearch();
});
