import Image from 'next/image'
import Link from 'next/link'
import styles from "../styles/minialbum.module.scss"
import {numberWithCommas} from "../helper"

const MiniAlbum = ({ spotify_id, name, playcount, dailygain, cover, shorthand }) => {
    let count = numberWithCommas(playcount);
    let gain = numberWithCommas(dailygain);

    return (
        <div className={`${styles.root} ${styles[shorthand]}`}>
            <div className={styles.body}>
                <Link href={`/album/${spotify_id}`}>
                    <div className={styles.image}>

                        <Image src={cover} height={300} width={300} />
                    </div>
                </Link>
                <div className={styles.playCount}>
                    <label htmlFor="count">Playcount: </label>
                    <span id="count">{count}</span>
                </div>
                <div className={styles.dailyGain}>
                    <label htmlFor="gain">Daily Gain: </label>
                    <span id="gain">{gain}</span>
                </div>
            </div>
        </div>
    );
}

export default MiniAlbum;