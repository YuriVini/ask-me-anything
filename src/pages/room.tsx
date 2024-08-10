import { useParams } from "react-router-dom"
import { Share2 } from "lucide-react"
import { toast } from "sonner"

import amaLogo from "../assets/ama-logo.svg"
import { CreateMessageForm } from "../components/create-message-form"

export const Room = () => {
    const { roomId } = useParams()

    const handleShareRoom =() => {
        const url = window.location.href.toString()

        if(navigator.share !== undefined && navigator.canShare()) {
            navigator.share({
                title: "Join AMA with us!",
                text: `Check out this new room code: ${roomId}. Join us to ask questions, share answers, and learn from others!`,
                url: url
            }).then(() => console.log("Share was successful!"))
             .catch((error) => console.log("Error sharing:", error));
        } else {
            navigator.clipboard.writeText(url)
            
            toast.info("The room url was copied to clipboard")
        }
    }

    const handleCreateQuestion =() => {}
    
    return (
        <div className="mx-auto max-w-[640px] flex flex-col gap-6 py-10 px-4">
            <div className="flex items-center gap-3 px-3">
                <img src={amaLogo} alt="AMA" className="h-5"/>

                <span className="text-sm text-zinc-500 truncate">
                    Room code: <span className="text-zinc-300">{roomId}</span>
                </span>

                <button 
                    type="submit"
                    onClick={handleShareRoom} 
                    className="bg-zinc-800 text-zinc-300 px-3 py-1.5 gap-1.5 flex items-center rounded-lg font-medium text-sm transition-colors hover:bg-zinc-700"
                >
                    Share
                    <Share2 className="size-4"/>
                </button>
            </div>

            <div className="h-px w-full bg-zinc-900"/>

            <CreateMessageForm />
        </div>
    )
}