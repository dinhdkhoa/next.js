"use client"
import AppTable from "@/components/Table"
import useSWR from "swr"

export default function Home() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json())
  const { data, error, isLoading } = useSWR<BlogItem[]>(
    "http://localhost:8000/blogs",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )
  if (isLoading) return <div>Loading</div>
  if (data == undefined || data.length < 1) return <div>No Data</div>
  return (
    <main>
      <AppTable blogs={data} />
    </main>
  )
}
