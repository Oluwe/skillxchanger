import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { FaApple } from "react-icons/fa";
import { auth, signIn } from "@/auth"
import { redirect } from "next/navigation";


export default async function Signin() {

    const session = await auth()
    // console.log(session);

    if (session) {
        redirect("/dashboard");
    }
    
    return (
        <main className="min-h-dvh flex items-center justify-center px-4 py-10 bg-gradient-to-br from-sky-100 via-white to-indigo-100">
            <section className="w-full max-w-lg rounded-3xl bg-white/90 border border-white/60 shadow-2xl backdrop-blur-xl p-8 flex flex-col items-center gap-6">
                <h1 className="text-3xl font-semibold text-slate-900 mb-2 text-center">Welcome! </h1>
                <p className="text-sm text-slate-600 text-center max-w-md">
                  Sign in to continue sharing and discovering skills with the SkillXchanger community.
                </p>
                <form className="flex flex-col gap-4 w-full">
                    <input type="text" placeholder="example@gmail.com" className="w-full outline-none border border-purple-600 rounded-md px-4 py-2" />
                    <button className="w-full bg-purple-600 text-white p-2 rounded-md hover:-translate-y-1 transition-all duration-200">Sign In</button>
                </form>

                <div className="w-full flex items-center gap-2 justify-center">
                    <div className="border-t w-full border-gray-400"></div>
                    <p>or</p>
                    <div className="border-t w-full border-gray-400"></div>
                </div>

                <div className="w-full flex items-center justify-center gap-5">
                    <form
                        action={async () => {
                            "use server"
                            await signIn("google", { callbackUrl: "/dashboard" })
                        }}
                    >      
                        <button type="submit" className="border p-5 text-3xl rounded-md border-gray-400 cursor-pointer"><FcGoogle /></button>
                    </form>
                    <button className="border p-5 text-3xl rounded-md border-gray-400 cursor-pointer"><FaGithub /></button>
                    <button className="border p-5 text-3xl rounded-md border-gray-400 cursor-pointer"><FaApple /></button>
                </div>
            </section>
        </main>
    )
}