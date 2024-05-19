import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import LargeHeading from '@/components/ui/LargeHeading'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <LargeHeading className="text-sky-400">Hello</LargeHeading>
      <h1 className='text-sky-400'>tailwind</h1>
    </>
  )
}
