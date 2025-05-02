import Image from "next/image";
import Chatbot from './chatbot';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center max-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[22px] row-start-2 items-end sm:flex-row sm:justify-between sm:w-full">
         <Image
           src="/jvfullstack_logo.png"
           alt="Jorge Vega FullStack Services logo"
           width={180}
           height={38}
           priority
         />

          <div className="flex gap-4 items-center flex-col sm:flex-row">
           <Chatbot />
        </div>
        </main>


      <footer className="row-start-4 flex  grid-rows-[20px_1fr_auto] gap-[24px] bg-zinc-900 text-gray-300 text-sm text-center py-4">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          target="_blank"
          rel="noopener noreferrer"
        >
         © {new Date().getFullYear()} Jorge Vega — Chatbot Portfolio
        </a>

        <a
          className="flex items-center gap-[8px] hover:underline hover:underline-offset-4"
          href="https://jorgevegafullstak.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
        >
        <Image
            aria-hidden
            src="/j_logo.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
           Go to JorgeVegaFullStack →
        </a>
      </footer>
    </div>
  );
}
