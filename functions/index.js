const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const axios = require("axios");
const db = admin.firestore();
const numAlbums = 10;
const docRef = db.collection("albums").doc("album-data");
const time = "*/30 * * * *";


exports.updateAlbum = functions.pubsub.schedule(time).onRun(async (context) => {
  const albumDoc = await docRef.get();
  if(!albumDoc.exists){
      return null;
  } else {
  const albumsObj = albumDoc.data();
  const albums = albumsObj.albums;
  let didItUpdate = true;
  let result = [];
  for (let i = 0; i < numAlbums; i++) {
    const album = albums[i];
    const albumFromApi = await axios.get(`https://api.t4ils.dev/albumPlayCount?albumid=${album.key}`);
    const res = calculateNewAlbum(album, albumFromApi.data.data);
    if (!(res.dailygain > 0)) {
      didItUpdate = false;
      break;
    }
    result.push(res);
  }
  if (didItUpdate) {
    const resultDoc = {
        albums: result
    };
    await docRef.set(resultDoc);
    const timeStamp = admin.firestore.Timestamp.now();
    await db.collection("albums").doc("updateLog").update({
      counterUpdated: `${timeStamp.toDate()}`
    });
  }
  //gotta save it as a string [todo]
  const timeStamp = admin.firestore.Timestamp.now();
  await db.collection("albums").doc("updateLog").update({
    updated: `${timeStamp.toDate()}`
  });
  return context;
}
});

function calculateNewAlbum(oldAlbum, newAlbum) {
  const oldSongs = oldAlbum.tracks;
  const newSongs = newAlbum.discs[0].tracks;
  const trackCount = oldAlbum.track_count;
  let trackGain = 0;
  let trackPlays = 0;
  for (let i = 0; i < trackCount; i++) {
    oldSongs[i].dailygain = newSongs[i].playcount - oldSongs[i].playcount;
    oldSongs[i].playcount = newSongs[i].playcount;
    if(!(oldSongs[i].name == "Back To December" && oldSongs[i].number == 21)) {
    trackGain += oldSongs[i].dailygain;
    trackPlays += oldSongs[i].playcount;
    }
  }

  oldAlbum.dailygain = trackGain;
  oldAlbum.playcount = trackPlays;
  oldAlbum.tracks = oldSongs;
  return oldAlbum;
}


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
