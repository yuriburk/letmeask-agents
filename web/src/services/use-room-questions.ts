import { useQuery } from '@tanstack/react-query'

type UseRoomQuestionsProps = {
  roomId: string
}

type GetRoomQuestionsResponse = Array<{
  id: string
  question: string
  answer?: string
  createdAt: string
}>

export function useRoomQuestions({ roomId }: UseRoomQuestionsProps) {
  return useQuery({
    queryKey: ['get-room-questions', roomId],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3000/rooms/${roomId}/questions`
      )
      const result: GetRoomQuestionsResponse = await response.json()

      return result
    },
  })
}
