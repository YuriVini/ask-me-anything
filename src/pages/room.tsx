import { useParams } from "react-router-dom"

export const Room = () => {
    const params = useParams()
    
    return <>Room id: {params?.roomId}</>
}