import { BASE_URL } from "./constants"
import io from 'socket.io-client'
export const createSocketConnection = () => {
    return io(BASE_URL)
}