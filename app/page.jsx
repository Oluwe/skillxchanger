import Link from "next/link";

export default function Home(){
  return (
    <main className="min-h-dvh bg-[url('/bg.jpg')] bg-no-repeat bg-center bg-cover">
      <section className="min-h-dvh bg-black/60 flex items-center justify-center">
        <div className="lg:w-1/2 text-white flex flex-col gap-10 items-center p-3">
          <h1 className="md:text-6xl text-4xl font-black text-center">Learn, Teach, Connect, and Grow Your Skills <span className="text-purple-700 italic">at Zero Cost</span>.</h1>
          <p className="text-xl font-light text-center">
            <span className="text-purple-800 underline font-bold text-2xl">SkillXchanger </span> 
            is a free skill swap and sharing platform where students seeking affordable learning opportunities, freelancers looking to expand skillsets, youths in underserved communities, tech enthusiasts, individuals willing to teach or mentor others and curious minds connect to exchange skills, share knowledge, collaborate and learn faster — without paying.
          </p>
          <div className="flex items-center justify-center gap-5 max-md:flex-col w-full">
            <Link className="bg-purple-700 px-8 py-3 rounded-md hover:bg-white hover:text-purple-700 transition-all duration-200 max-md:w-full text-center" href={"#"}>Start Swapping</Link>
            <Link className="text-purple-700 px-8 py-3 rounded-md bg-white hover:bg-purple-700 hover:text-white duration-200 transition-all max-md:w-full text-center" href={"#"}>Join the Community</Link>
          </div>
        </div>
      </section>
    </main>
  )
}