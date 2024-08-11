import {   useSuspenseQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

import { Message } from "./message"
import { getRoomMessages } from "../http/get-room-messages"
import { useMessagesWebsocket } from "../hooks/useMessagesWebsocket"
import { useMemo } from "react"

export interface RoomMessages {
    id: string
    text: string
    amountOfReactions: number
    answered: boolean
}


export const MessageList = () => { 
    const { roomId } = useParams()

    if(!roomId) {
        throw new Error('MessagesList component must be used within room page')
    }

    const { data = { messages: [] as RoomMessages[] } } = useSuspenseQuery({
        queryFn: () => getRoomMessages({ roomId }),
        queryKey: ["messages-list", roomId],
        retry: false
    })

    useMessagesWebsocket({ roomId })

    const sortedMessages = useMemo(() => data?.messages?.sort((a, b) => {
        return b.amountOfReactions - a.amountOfReactions
    }), [data?.messages])

    if (data.messages.length < 1) {
        return <p>No messages yet.</p>
    }

    return (
        <ol className="list-decimal list-outside px-3 space-y-8">
            {sortedMessages?.map((item) => (
                <Message key={item?.id} id={item?.id} answered={item?.answered} amountOfReactions={item?.amountOfReactions} text={item?.text} />
            ))}
        </ol>
    )
}