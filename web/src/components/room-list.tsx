import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatDate } from '@/lib/utils'
import { useRooms } from '@/services/use-rooms'
import { Badge } from './ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'

export function RoomList() {
  const { data, isLoading } = useRooms()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Salas recentes</CardTitle>
        <CardDescription>
          Acesso rápido para as salas criadas recentemente
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {isLoading && (
          <p className="text-muted-foreground text-sm">Carregando salas</p>
        )}
        {data?.map((room) => (
          <Link
            className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent"
            key={room.id}
            to={`/rooms/${room.id}`}
          >
            <div className="flex flex-1 flex-col gap-1">
              <h3 className="font-medium">{room.name}</h3>

              <div className="flex items-center gap-2">
                <Badge className="text-xs">{formatDate(room.createdAt)}</Badge>
                <Badge className="text-xs">
                  {room.questionsCount} pergunta(s)
                </Badge>
              </div>
            </div>

            <span className="flex items-center gap-1 text-sm">
              Entrar <ArrowRight className="size-3" />
            </span>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
