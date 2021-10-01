
import styles from '../styles/home.module.scss'
import MiniAlbum from '../components/miniAlbum';
import { app } from "../firebase";
import Head from "next/head"
import { getFirestore, doc, getDoc } from "@firebase/firestore";

export async function getStaticProps(){
  const db = getFirestore(app);
  const docRef = doc(db, "albums", "album-data");
  const updateRef = doc(db, "albums", "updateLog");
  const albumDoc = await getDoc(docRef);
  const updateDoc = await getDoc(updateRef);
  const albumsProp = albumDoc.data();
  const updateProp = updateDoc.data();
    return {props: {
      albumsProp,
      updateProp
    },
    revalidate: 60
  }
  }

export default function Home(props) {
   const albums = props.albumsProp.albums;
  //  console.log(props.updateProp.updated);
  const miniAlbums = albums.map(album => (
    <MiniAlbum {...album} key={album.key} />
  ));
  props.setActivePage("home");
  return (
    <>
    <Head>
      <title>Tayspotify</title>
    </Head>
    <div className={styles.root}>
      <div className={styles.updateDiv}><span>Last Updated: {props.updateProp.updated}</span>
      <span>Counter Updated On: {props.updateProp.counterUpdated}</span></div>
      <h1 className={styles.title}>Albums</h1>
      <section className={styles.miniAlbumSection}>
        {miniAlbums}
      </section>
    </div>
    </>
  );
}
