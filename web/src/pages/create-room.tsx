import { RoomList } from '@/components/room-list'

export function CreateRoom() {
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="item-start grid grid-cols-2 gap-8">
          <div />

          <RoomList />
        </div>
      </div>
    </div>
  )
}
