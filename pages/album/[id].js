
import { useRouter } from 'next/router'
import Album from "../../components/album"
import { useEffect } from 'react';
import Head from "next/head"
import { app } from "../../firebase";
import { getFirestore, doc, getDoc } from "@firebase/firestore";


export async function getStaticProps(){
    const db = getFirestore(app);
    const docRef = doc(db, "albums", "album-data"); 
    const albumDoc = await getDoc(docRef);
    const albumsProp = albumDoc.data();
      return {props: {
        albumsProp
      }
    }
    }

    export async function getStaticPaths() {
        return {
          paths: [
            { params: { id: "4hDok0OAJd57SGIT8xuWJH" } } ,
            { params: { id: "6AORtDjduMM3bupSWzbTSG" } },
            { params: { id: "1pzvBxYgT6OVwJLtHkrdQK" } },
            { params: { id: "1NAmidJlEaVgA3MpcPFYGq" } },
            { params: { id: "6DEjYFkNZh67HP7R9PSZvv" } },
            { params: { id: "34OkZVpuzBa9y40DCy0LPR" } },
            { params: { id: "1KlU96Hw9nlvqpBPlSqcTV" } },
            { params: { id: "6S6JQWzUrJVcJLK4fi74Fw" } },
            { params: { id: "43OpbkiiIxJO8ktIB777Nn" } },
            { params: { id: "7mzrIsaAjnXihW3InKjlC3" } }         
          ],
          fallback: false // See the "fallback" section below
        };
      }

const Post = ({setActivePage, albumsProp }) => {
    const albums = albumsProp.albums;
    const albumIds = albums.map(album => (
        album.spotify_id
    ));
    const router = useRouter();
    const { id } = router.query;


    const album = albums.find(({ spotify_id }) => spotify_id === id);
    // useEffect(
    //     ()=>{
    //         if(!router.isReady) return;
    //         const {id} = router.query;
    //         const album = albums.find(({spotify_id}) => spotify_id === id);

    //         return(
    //             
    //         )
    //     }, [router.isReady]
    // );
    // if (!album) {
    //     //add 404 component
    // }
    //Nvm im just gonna use nextjs' default 404 page
    useEffect(() => {
      if (id) {
        setActivePage(album.name);
      }
    });

    return (
      <>
      <Head>
        <title>{album.name}</title>
      </Head>
        <Album songs={album.tracks} title={album.name} image={album.cover} shorthand={album.shorthand} />
      </>
    )

}




export default Post;
