import { Navigate, useParams } from 'react-router-dom'

type RoomParams = {
  id?: string
}

export function Room() {
  const { id } = useParams<RoomParams>()

  if (!id) {
    return <Navigate replace to="/" />
  }

  return <div>Room details {id}</div>
}
