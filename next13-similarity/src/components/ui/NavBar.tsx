import { getServerSession } from "next-auth"
import Link from "next/link"
import { buttonVariants } from "./Button"
import SignOutBtn from "../SignOutBtn"
import SignInBtn from "../SignInBtn"
import { ThemeToggle } from "../ThemeToggle"

interface NavBarProps {
  
}

const NavBar = async ({} : NavBarProps) => {
  const session = await getServerSession()
  return (
    <div className="fixed backdrop-blur-sm bg-white/75 dark:bg-slate-900 z-30 top-0 left-0 right-0 h-20 border-b border-slate-300 dark:border-slate-700 shadow-sm flex justify-between items-center">
      <div className="container max-w-7xl mx-auto w-full flex justify-between items-center">
        <Link href="/" className={buttonVariants({ variant: "link" })}>
          Text Similarity 1.0
        </Link>

        <div className="md:hidden">
          <ThemeToggle />
        </div>

        <div className="hidden md:flex gap-4">
          <ThemeToggle />
          <Link
            href={"/documentation"}
            className={buttonVariants({ variant: "ghost" })}
          >
            Documentation
          </Link>
          {false ? (
            <>
              <Link
                href={"/"}
                className={buttonVariants({ variant: "ghost" })}
              >
                Dashboard
              </Link>
              <SignOutBtn />
            </>
          ) : (
              <SignInBtn />
          )}
        </div>
      </div>
    </div>
  )
}

export default NavBar