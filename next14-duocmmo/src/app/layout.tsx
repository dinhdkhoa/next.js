import Header from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { cookies } from "next/headers"
import SeTSeesionToken from "./app-provider"
import "./globals.css"
import SlideSession from "@/components/slide-session"
import meAPI from "./me/me.api"
import { AccountType } from "@/schemaValidations/account.schema"
import { handleApiError } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Web 14",
    template: "%s | Web 14",
  },
  description: "Dự án học Next.js",
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {

  let user: AccountType | null = null
  // if(sessionToken) {
  //   try {
  //     const checkUser = await meAPI.me(sessionToken)
  //     user = checkUser.payload.data
  //   } catch (error) {
  //     handleApiError(error)
  //   }
  // }
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Toaster richColors />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SeTSeesionToken user={user}>
            <Header user={user} />
            {children}
            <SlideSession />
          </SeTSeesionToken>
        </ThemeProvider>
      </body>
    </html>
  )
}
