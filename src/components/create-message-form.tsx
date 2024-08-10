import { ArrowRight } from "lucide-react"
import { toast } from "sonner";
import { createMessage } from "../http/create-message";
import { useParams } from "react-router-dom";

export const CreateMessageForm = () => {
    const { roomId } = useParams()

    const handleCreateQuestion = async (data: FormData) => {
        const message = data.get("message")?.toString();

        if(!message || !roomId) {
            toast.warning("Please enter a question")
            return;
        }

        try {
            await createMessage({ message, roomId })
        } catch{
            toast.error("Error creating message!")
        }
    }


    return (
        <form action={handleCreateQuestion} className="flex items-center gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800 ring-orange-400 ring-offset-2 ring-offset-zinc-950  focus-within:ring-1">
            <input
                required
                type="text" 
                name="message" 
                autoComplete="off" 
                placeholder="What's your question?" 
                className="flex-1 text-sm bg-transparent mx-2 outline-none text-zinc-100 placeholder:text-zinc-500"
            />

            <button type="submit" className="bg-orange-400 text-orange-950 px-3 py-1.5 gap-1.5 flex items-center rounded-lg font-medium text-sm transition-colors hover:bg-orange-500">
                Create question
                <ArrowRight className="size-4"/>
            </button>
        </form>
    )
}