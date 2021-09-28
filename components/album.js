import Image from 'next/image'
import styles from "../styles/album.module.scss"
import pic from "../images/profile.jpg"
import {numberWithCommas} from "../helper"

const Album = ({ title, songs, image, shorthand }) => {
    const songList = songs.map(song => {
        let count = numberWithCommas(song.playcount);
        let gain = numberWithCommas(song.dailygain);
        
        return (<div className={styles.songColumn}>
            <div>
                {song.number}
            </div>
            <div className={styles.songTitleArtist}>
                <div>{song.name}</div>
                <span className={styles.artist}>Taylor Swift</span>
            </div>
            <div className={styles.countHolder}>
                <div>{count}</div>
                <span className={styles.changeCount}>(+{gain})</span>
            </div>
            <div>
                {gain}
            </div>
        </div>)
    });
    return (
        <div className={styles.root}>
            <section className={`${styles.infoSection} ${styles[shorthand]}`}>
                <div className={styles.imageHolder}>
                    <Image src={image} alt={"Album cover"} width={300} height={300} className={styles.albumCover} />
                </div>
                <div className={styles.infoHolder}>
                    <h2 className={styles.category}>Album</h2>
                    <h1 className={styles.title}>
                        {title}
                    </h1>
                    <h3 className={styles.songCount}>{songList.length} songs
                    </h3>
                </div>
            </section>
            <div className={`${styles.gradient} ${styles[shorthand]}`}>
            </div>
            <section className={styles.songSection}>
                <div className={styles.songLayout}>
                    <div className={styles.columnHead}>
                        <span className={styles.indexHeader}>#</span>
                        <span className={styles.titleHeader}>Title</span>
                        <span className={styles.playcountHeader}>Playcount</span>
                        <span className={styles.changeHeader}>Daily Gain</span>
                    </div>
                    {songList}



                </div>
            </section>
        </div >
    );
}

export default Album;