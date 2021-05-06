import Link from 'next/link'
import styles from './styles.module.scss'
import { api } from '../services/api'

export default function Characters({ characters }) {
    return (
        <div className={styles.homepage}>
            <section className={styles.section}>
                {characters.map((character) => {
                    return (
                        <div className={styles.movie} key={character.name}>
                            <Link href={`/characters/${character.name}`}> 
                                <a>{character.name}</a>
                            </Link>
                        </div>
                    )
                })}  
            </section>             
        </div>
    )
}

export const getStaticProps = async () => {
    const { data } = await api.get('people/?page=1')

    const characters = data.results.map(character => {
        return {
            name: character.name,
        }
    })

    return {
        props: {
            characters,
        },
        revalidate: 60 * 60 * 24, //24hrs
    }
}