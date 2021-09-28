function calculateNewAlbum(oldAlbum, newAlbum){
    let oldSongs = oldAlbum.tracks;
    let newSongs = newAlbum.discs[0].tracks;
    let trackCount = oldAlbum.track_count;
    let trackGain = 0;
    let trackPlays = 0;
    for(let i = 0; i < trackCount; i++ ){
        oldSongs[i].dailygain = newSongs[i].playcount -  oldSongs[i].playcount;
        oldSongs[i].playcount = newSongs[i].playcount;
        trackGain += oldSongs[i].dailygain;
        trackPlays += oldSongs[i].playcount;
    }

    oldAlbum.dailygain = trackGain;
    oldAlbum.playcount = trackPlays;
    oldAlbum.tracks = oldSongs
    return oldAlbum;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export {calculateNewAlbum, numberWithCommas};