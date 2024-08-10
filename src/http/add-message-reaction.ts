interface AddMessageReactionRequest {
    roomId: string
    messageId: string
}

export const addMessageReaction = ({ roomId, messageId }: AddMessageReactionRequest) => {
    return fetch(`${import.meta.env.VITE_APP_API_URL}/rooms/${roomId}/messages/${messageId}/react`, { method: 'PATCH'})
}