import '../styles/globals.css'
import Navbar from '../components/navbar';
import React, { useState, useEffect } from "react"
import Head from "next/head"
import { app } from "../firebase";

import { getFirestore, setDoc, addDoc, collection, doc, getDoc } from "@firebase/firestore";



function MyApp({ Component, pageProps, albums3 }) {

  const [activePage, setActivePage] = useState("home");
  const handlePageChange = (page) => {
    setActivePage(page);
  };

  //Using seed albums
  // const albumsWithoutKey = [fearlesstv, evermore, folklore, lover, reputation, eightynine, red, speaknow, fearless, selftitled];

  // const albums = albumsWithoutKey.map(album => {
  //   album.key = album.spotify_id;
  //   album.tracks.map(song => {
  //     song.key = song.name;
  //     return song;
  //   })
  //   return album;
  // });

  const db = getFirestore(app);

  const docRef = doc(db, "albums", "album-data");



//First time putting albums into firestore
  // setDoc(doc(db, "albums", "album-data"), { albums: albums }).then(
  //   function () {
  //     console.log("hi");
  //   }
  // );
  return (
    <>
    <Head>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
      <Navbar activePage={activePage} />
      <Component {...pageProps} setActivePage={handlePageChange} />
    </>
  );
}

export default MyApp
