document.getElementById('lyrics-show').style.display = 'none';
document.querySelector('.search-total').style.display = 'none';

document.getElementById('searchBtn').addEventListener('click', function(){
    let searchText = document.getElementById('searchText').value;
    songSearch(searchText);
})

function songSearch (searchText) {
    fetch(`https://api.lyrics.ovh/suggest/${searchText}`) 
    .then(res => res.json())
    .then(data => displaySongs(data))
    .catch(error => window.alert('No Data Found',error))
}

function displaySongs (data){

    const songResultArea = document.getElementById('songs-section');
        songResultArea.innerHTML = "";

    for (let i = 0; i < 10; i++) {
        const element = data.data[i];
        const artistName = element.artist.name;
        const songTitle = element.title;
        const songAlbum = element.album.title;
        const artistImage = element.artist.picture;
        const songDuration = element.duration;
        const songLink = element.link;
    
        // document.getElementById('song-name').innerText = songTitle;
        // document.getElementById('author-name').innerText = artistName;
        // document.getElementById('album-name').innerText = songAlbum;
        // document.getElementById('author-image').src = `${artistImage}`;
        // document.getElementById('song-time').innerHTML = (songDuration/60).toFixed(2) + ' min';
        // document.getElementById('song-link').href = `${songLink}`;
        showLyrics(artistName, songTitle);
        songResultArea.innerHTML += `<div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name">${songTitle}</h3>
                <p class="author"><span>${songAlbum}</span> Album by <span style="color:rgb(60, 248, 2);font-weight: 700;">${artistName}</span></p>
                <div class="row">
                    <div class="col-md-3">
                        <img class="small image-box" src="${artistImage}" alt="NoImage" width="80px" height="80px">
                    </div>
                    <div class="col-md-3">
                        <p class="">${(songDuration/60).toFixed(2) + ' min'}</p>
                        <a href="${songLink}" target="_blank"><button class="btn btn-success small">Play</button></a>
                    </div>
                </div>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="showLyrics('${artistName}','${songTitle}')" class="btn btn-success">Get Lyrics</button>
            </div>
        </div>`;

     }
     document.querySelector('.search-total').style.display = 'block';
}

function showLyrics(artistName, songTitle){
    fetch(`https://api.lyrics.ovh/v1/${artistName}/${songTitle}`) 
    .then(res => res.json())
    .then(data => lyrics(data.lyrics))
    .catch(error => window.alert('No Data Found',error))

    document.getElementById('lyrics-show').style.display = 'block';

    function lyrics(data){
        const lyricArea = document.getElementById('lyrics-show');
            lyricArea.innerHTML = '';
            lyricArea.innerHTML += `<button class="btn go-back" >&lsaquo;</button>
                                <h2 class="text-success mb-4">${songTitle}</h2>
                                <pre class="lyric text-white">
                                ${data}
                                </pre>`;
    }
    

}
