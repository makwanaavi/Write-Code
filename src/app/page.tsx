import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Textanimation from "../components/Textanimation";
import Link from "next/link";
// import { useRouter } from "next/router";

export default function Home() {
  // const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-b via-white from-white to-primary overflow-hidden">
      <header className="h-20 flex items-center">
        <div className="container px-4 mx-auto flex items-center justify-between gap-4">
          <Logo />
          <nav>
            <Button className="cursor-pointer">
              <Link href={"/login"}>Login</Link>
            </Button>
            {/* <Button onClick={() => router.push("/login")}>Login</Button> */}
          </nav>
        </div>
      </header>

      <Textanimation />
      <div className="mx-auto w-fit shadow-lg">
        <Image
          src="/banner.png"
          alt="Picture of the author"
          width={1000}
          height={400}
        />
      </div>
      <footer className="fixed bottom-0 left-0 w-full bg-black py-4 text-white">
        <p className="text-base font-semibold w-fit px-4 mx-auto">
          Made By <span className="text-primary">@VI</span>
        </p>
      </footer>
    </div>
  );
}
