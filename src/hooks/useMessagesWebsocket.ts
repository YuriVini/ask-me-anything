import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { RoomMessages } from "../components/message-list";

interface UseMessageWebsocketsParams {
    roomId: string;
}

type WebsocketMessageResponse =
    | { kind: 'message_created', value: { id: string, message: string } }
    | { kind: 'message_answered', value: { id: string } }
    | { kind: 'message_reacted' | 'message_remove_react', value: { id: string, count: number } }

export const useMessagesWebsocket = ({ roomId }: UseMessageWebsocketsParams) => {
    const queryClient = useQueryClient()

    const resignData = (state: { messages: RoomMessages[] }, messageId: string, key: keyof RoomMessages, value: boolean | number) => {
        return state?.messages?.map(item => {
            if (item?.id === messageId)
                return { ...item, [`${key}`]: value }

            return item;
        })
    }

    useEffect(() => {
        const ws = new WebSocket(`${import.meta.env.VITE_APP_WEBSOCKET_URL}/subscribe/${roomId}`)

        ws.onmessage = (event) => {
            const message: WebsocketMessageResponse = JSON.parse(event.data)

            switch (message.kind) {
                case "message_created":
                    queryClient.setQueryData<{ messages: RoomMessages[] }>(["messages-list", roomId], (state) => {
                        return {
                            messages: [
                                ...(state?.messages ?? []),
                                {
                                    id: message?.value?.id,
                                    text: message?.value?.message,
                                    amountOfReactions: 0,
                                    answered: false,
                                }
                            ],
                        }
                    })
                    break;
                case "message_answered":
                    queryClient.setQueryData<{ messages: RoomMessages[] }>(["messages-list", roomId], (state) => {
                        if (!state) {
                            return undefined;
                        }
                        return {
                            messages: resignData(state, message?.value?.id, "answered", true)
                        }
                    })
                    break;
                case "message_reacted":
                case "message_remove_react":
                    queryClient.setQueryData<{ messages: RoomMessages[] }>(["messages-list", roomId], (state) => {
                        if (!state) {
                            return undefined;
                        }
                        return {
                            messages: resignData(state, message?.value?.id, "amountOfReactions", message?.value?.count)
                        }
                    })
                    break;
                default:
                    break;
            }
        }

        return () => {
            ws.close();
        }
    }, [roomId, queryClient])
}