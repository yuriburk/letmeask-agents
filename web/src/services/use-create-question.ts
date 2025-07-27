import { useMutation, useQueryClient } from '@tanstack/react-query'

type CreateQuestionRequest = {
  roomId: string
  question: string
}

type CreateQuestionResponse = {
  roomId: string
}

export function useCreateQuestion() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['create-room'],
    mutationFn: async ({ roomId, question }: CreateQuestionRequest) => {
      const response = await fetch(
        `http://localhost:3000/rooms/${roomId}/questions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question }),
        }
      )
      const result: CreateQuestionResponse = await response.json()

      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-rooms'] })
    },
  })
}
