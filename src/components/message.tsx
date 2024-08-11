import { ArrowUp } from "lucide-react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "sonner"

import { removeMessageReaction } from "../http/remove-message-reaction"
import { addMessageReaction } from "../http/add-message-reaction"

interface MessageProps {
    id: string
    text: string
    amountOfReactions: number
    answered?: boolean
}

export const Message = ({ id, text, answered = false, amountOfReactions}: MessageProps) => {
    const { roomId } = useParams()

    const [hasReacted, setHasReacted] = useState(false)

    if(!roomId) {
        throw new Error('MessagesList component must be used within room page')
    }

    const addReactMessage = async () => {
        try {
            await addMessageReaction({ messageId: id, roomId})
            setHasReacted(true)
        } catch {
            toast.error("Error reacting message")
        }
    }
    
    const removeReactMessage = async () => {
        try {
            await removeMessageReaction({ messageId: id, roomId})
            setHasReacted(false)
        } catch {
            toast.error("Error unreacting message")
            
        }

    }

    return (
        <li data-answered={answered} className="ml-4 leading-relaxed text-zinc-100 data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none">
            {text}
            
            {hasReacted
                ? (
                    <button 
                        type="button"
                        onClick={removeReactMessage} 
                        className="mt-3 flex items-center gap-2 text-orange-400 text-sm font-medium hover:text-orange-500"
                    >
                        <ArrowUp  className="size-4"/>
                        Like ({amountOfReactions})
                    </button>
                ): (
                    <button 
                        type="button"
                        onClick={addReactMessage} 
                        className="mt-3 flex items-center gap-2 text-zinc-400 text-sm font-medium hover:text-zinc-300"
                    >
                        <ArrowUp className="size-4"/>
                        Like ({amountOfReactions})
                    </button>
                )
            }
        </li>
    )
}