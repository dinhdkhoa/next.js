import Image from "next/image"
import styles from "./page.module.css"
import Link from "next/link"

export default function Home() {
  return (
    <main className={styles.main}>
      <ul>
        <li>
          <Link href="/facebook">Facebook</Link>
        </li>
        <li>
          <Link href="/tiktok">Tiktok</Link>
        </li>
        <li>
          <Link href="/youtube">Youtube</Link>
        </li>
      </ul>
    </main>
  )
}
