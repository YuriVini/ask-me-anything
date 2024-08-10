import { RoomMessages } from "../components/message-list"

interface GetRoomMessagesRequest {
    roomId: string
}

export interface GetRoomMessagesResponse {
    id: string
    room_id: string
    message: string
    reaction_count: number
    answered: boolean
}

export const getRoomMessages = async ({ roomId }: GetRoomMessagesRequest): Promise<{ messages: RoomMessages[] }> => {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/rooms/${roomId}/messages`)

    const data: GetRoomMessagesResponse[]  = await response.json()

    if(data === null) return { messages: [] }

    return { 
        messages: data.map(({ id, message, reaction_count, answered }) => ({
            id,
            answered,
            text: message,
            amountOfReactions: reaction_count,
        }))
    }
}