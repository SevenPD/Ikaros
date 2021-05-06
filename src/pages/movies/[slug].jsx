import Head from 'next/head'
import Link from 'next/link'
import { api } from '../services/api'
import styles from './movie.module.scss'

export default function Movie({ movie }) {
    return (
        <div>
            <Head>
                <title>{movie.title}</title>
            </Head>
            
            <div className={styles.description}>
                <h1>{movie.title}</h1>
                <h2>Episódio - {movie.id}</h2>
                <p>{movie.text}</p>
                <span>Diretor: {movie.director} <br/></span>
                <span>Produtor: {movie.producer} <br/></span>
                <span>Data de Lançamento: {movie.release} <br/></span>
                <Link href="/characters">
                <span>Personagens: {movie.characters.map(char => {
                    return (
                        <div key={char}>
                            <Link href={char}>
                                <a>{char}</a>
                            </Link>
                        </div>
                    )
                })} <br/></span>
                </Link>
            </div>

        </div>
    )
}

export const getStaticPaths = async () => {
    const { data } = await api.get('films', {
        params: {
            _limit: 6,
        }
    })

    const paths = data.results.map(movie => {
        return {
            params: {
                slug: movie.episode_id.toString()
            }
        }
    })

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async (ctx) => {
    const { slug } = ctx.params
    const { data } = await api.get(`films/${slug}`)

    const movie = {
        id: data.episode_id,
        title: data.title,
        text: data.opening_crawl,
        director: data.director,
        producer: data.producer,
        release: data.release_date,
        characters: data.characters
    }

    return {
        props: {
            movie,
        },
        revalidate: 60 * 60 * 24, //24 hours
    }
}