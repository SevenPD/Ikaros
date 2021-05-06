import Link from 'next/link'
import styles from './home.module.scss'
import { api } from './services/api'

export default function Home({ movies }) {
    return (
        <div className={styles.homepage}>
            <section className={styles.section}>
                {movies.map((episode) => {
                    return (
                        <div className={styles.movie} key={episode.id}>
                            <Link href={`/movies/${episode.id}`}> 
                                <a>{episode.title}</a>
                            </Link>
                        </div>
                    )
                })}  
            </section>
        </div>
    )
}

export const getStaticProps = async () => {
    const { data } = await api.get('films', {
        params: {
            _path: 'results',
            _sort: 'episode_id',
            _order: 'desc'
        }
    })

    const movies = data.results.map(movie => {
        return {
            id: movie.episode_id,
            title: movie.title
        }
    })

    return {
        props: {
            movies,
        },
        revalidate: 60 * 60 * 24, //24hrs
    }
}