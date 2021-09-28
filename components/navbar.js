import Link from "next/link"
import HomeIcon from '@material-ui/icons/Home'
import AlbumIcon from '@material-ui/icons/Album'
import Image from 'next/image'
import styles from "../styles/navbar.module.scss"
import logo from "../images/tayspotifylogo.png"

const Navbar = ({activePage }) => {
    const albums = [
        {
            key: "4hDok0OAJd57SGIT8xuWJH",
            spotify_id: "4hDok0OAJd57SGIT8xuWJH",
            name: "Fearless (Taylor's Version)"
        },
        {
            key: "6AORtDjduMM3bupSWzbTSG",
            spotify_id: "6AORtDjduMM3bupSWzbTSG",
            name: "evermore (deluxe version)"
        },
        {
            key: "1pzvBxYgT6OVwJLtHkrdQK",
            spotify_id: "1pzvBxYgT6OVwJLtHkrdQK",
            name: "folklore (deluxe version)"
        },
        {
            key: "1NAmidJlEaVgA3MpcPFYGq",
            spotify_id: "1NAmidJlEaVgA3MpcPFYGq",
            name: "Lover"
        },
        {
            key: "6DEjYFkNZh67HP7R9PSZvv",
            spotify_id: "6DEjYFkNZh67HP7R9PSZvv",
            name: "reputation"
        },
        {
            key: "34OkZVpuzBa9y40DCy0LPR",
            spotify_id: "34OkZVpuzBa9y40DCy0LPR",
            name: "1989 (Deluxe Edition)"
        },
        {
            key: "1KlU96Hw9nlvqpBPlSqcTV",
            spotify_id: "1KlU96Hw9nlvqpBPlSqcTV",
            name: "Red (Deluxe Edition)"
        },
        {
            key: "5EpMjweRD573ASl7uNiHym",
            spotify_id: "5EpMjweRD573ASl7uNiHym",
            name: "Speak Now (Deluxe Edition)"
        },
        {
            key: "43OpbkiiIxJO8ktIB777Nn",
            spotify_id: "43OpbkiiIxJO8ktIB777Nn",
            name: "Fearless Platinum Edition"
        },
        {
            key: "7mzrIsaAjnXihW3InKjlC3",
            spotify_id: "7mzrIsaAjnXihW3InKjlC3",
            name: "Taylor Swift"
        }
    ]
    const albumIcons = albums.map(album => (
        <Link key={album.key} href={`/album/${album.spotify_id}`}><div className={`${styles.navIcon} ${album.name === activePage && styles.active}`}><AlbumIcon className={styles.icon} /><span className={styles.iconText}>{album.name}</span></div></Link>
    ));
    return (
        <>
            <div className={styles.barContainer}>
                <Link href="/"><HomeIcon></HomeIcon></Link>
            </div>
            <div className={styles.root}>
                <div className={styles.logoHolder}>
                    <Image src={logo} />
                </div>
                <Link href="/"><div className={`${styles.navIcon} ${"home" === activePage && styles.active} ${styles.homeIcon}`}><HomeIcon className={styles.icon} /><span className={styles.iconText}>Home</span></div></Link>
                {albumIcons}
            </div>
        </>
    );
};


export default Navbar;