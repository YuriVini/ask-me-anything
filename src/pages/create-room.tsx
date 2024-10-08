import { ArrowRight } from "lucide-react"

import amaLogo from "../assets/ama-logo.svg"
import { useNavigate } from "react-router-dom"
import { createRoom } from "../http/create-room"
import { toast } from "sonner"

export const CreateRoom = () => {
    const navigate = useNavigate()

    const handleCreateRoom = async (data: FormData) => {
        const theme = data.get("theme")?.toString()
        
        if(!theme) {
            toast.warning("Please enter a room name.")
            return
        }

        try {
            const { roomId } = await createRoom({ theme })
            
            navigate(`/room/${roomId}`)
        } catch {
            toast.error("Something went wrong when tried to create room!")
        }
    }

    return ( 
        <main className="h-screen flex items-center justify-center px-4">
            <div className="max-w-[450px] flex flex-col gap-6">
                <img src={amaLogo} alt="AMA" className="h-10"/>

                <p className="leading-relaxed text-zinc-300 text-center">
                    Create a public AMA room and prioritize the most important questions to the community.                
                </p>

                <form action={handleCreateRoom} className="flex items-center gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800 ring-orange-400 ring-offset-2 ring-offset-zinc-950  focus-within:ring-1">
                    <input
                        required
                        type="text" 
                        name="theme" 
                        autoComplete="off" 
                        placeholder="Room Name" 
                        className="flex-1 text-sm bg-transparent mx-2 outline-none text-zinc-100 placeholder:text-zinc-500"
                    />

                    <button type="submit" className="bg-orange-400 text-orange-950 px-3 py-1.5 gap-1.5 flex items-center rounded-lg font-medium text-sm transition-colors hover:bg-orange-500">
                        Create Room
                        <ArrowRight className="size-4"/>
                    </button>
                </form>
            </div>
        </main>
    )
}