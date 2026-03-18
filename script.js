const audio = document.getElementById('audioElement');
const masterPlay = document.getElementById('masterPlay');

// 1. Hamare fixed gaano ki list (Search isi mein se hoga)
const myFixedSongs = [
    { name: 'Teri Hogaiyaan', artist: 'Vishal Mishra', img: 'https://image2url.com/r2/default/images/1773862409110-24818e4e-59f9-486e-a461-b4f420786bf9.jpg', url: 'https://image2url.com/r2/default/audio/1773862358460-04c98278-5f8a-42eb-84fc-5a2725949623.mp3' },
    { name: 'Phir Bhi Tumko Chaahunga', artist: 'Arijit Singh', img: 'https://image2url.com/r2/default/images/1773863572773-8f31b0fb-71b0-4e9d-b91d-2fa1d7e33b1c.jpg', url: 'https://image2url.com/r2/default/audio/1773863766875-ff5a1da7-fa34-4a22-8bd8-8e97c524237e.mp3' },
    { name: 'Sanson Ki Mala', artist: 'Rahat Fateh Ali Khan', img: 'https://image2url.com/r2/default/images/1773866445142-a5076e4b-a813-4553-9de7-72170dc2c85f.jpg', url: 'https://image2url.com/r2/default/audio/1773866292593-eeb5fc72-d3b0-4e77-9a8d-0c3076fec763.mp3' },
    { name: 'Chaap Tilak', artist: 'Nakash Aziz', img: 'https://image2url.com/r2/default/images/1773866751399-f93751a0-62b4-4dd4-811d-3f02024650f4.jpg', url: 'https://image2url.com/r2/default/audio/1773866515382-37a07c64-a3a1-40e4-a311-a97cba1f50f1.mp3' }
];

// 2. Gana bajane ka function
function playSong(url, title, artist, img) {
    document.querySelector('.music-player').style.display = 'block';
    audio.src = url;
    audio.play();
    document.getElementById('player-title').innerText = title;
    document.getElementById('player-artist').innerText = artist;
    document.getElementById('player-img').src = img;
    masterPlay.classList.replace('fa-play', 'fa-pause');
}

// 3. Play/Pause toggle
function togglePlay() {
    if (audio.paused) {
        audio.play();
        masterPlay.classList.replace('fa-play', 'fa-pause');
    } else {
        audio.pause();
        masterPlay.classList.replace('fa-pause', 'fa-play');
    }
}

// 4. Player band karne ke liye (X button)
function closePlayer() {
    if (audio) {
        audio.pause();
    }
    document.querySelector('.music-player').style.display = 'none';
}

// 5. NAYA FEATURE: Search Results hatane ke liye
function clearSearch() {
    const resultsSection = document.getElementById('resultsSection');
    const searchInput = document.getElementById('searchInput');
    if (resultsSection) resultsSection.style.display = "none";
    if (searchInput) searchInput.value = ""; 
}

// 6. UPDATED SEARCH FUNCTION
function searchSongs() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    const resultsContainer = document.getElementById('apiResults');
    const resultsSection = document.getElementById('resultsSection');

    if (query.length < 2) {
        if (resultsSection) resultsSection.style.display = "none";
        return;
    }

    // Fixed list mein dhoondhna (Suggest feature)
    const filteredSongs = myFixedSongs.filter(song => 
        song.name.toLowerCase().includes(query) || 
        song.artist.toLowerCase().includes(query)
    );

    if (resultsSection) resultsSection.style.display = "block";
    
    if (filteredSongs.length > 0) {
        resultsContainer.innerHTML = filteredSongs.map(s => `
            <div class="mini-card" style="margin-bottom:8px; width:100%;" onclick="playSong('${s.url}', '${s.name}', '${s.artist}', '${s.img}')">
                <img src="${s.img}">
                <div class="card-text">
                    <span>${s.name}</span>
                    <small>${s.artist}</small>
                </div>
            </div>
        `).join('');
    } else {
        // Aapka bataya hua custom message
        resultsContainer.innerHTML = "<p style='padding:15px; font-size:12px; color:#b3b3b3;'>Gana nahi mila hamare fixed list mein se dhundhiye</p>";
    }
}