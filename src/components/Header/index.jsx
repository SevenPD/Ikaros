import Link from 'next/link'
import styles from './styles.module.scss'

export function Header() {
    return (
        <header className={styles.header}>
            <Link href="/">
                <a>
                    <img src="/logo-star.png" alt="Starwars"/>                
                </a>
            </Link>
            <hr/>
        </header>
    )
}