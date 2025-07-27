import { useMutation, useQueryClient } from '@tanstack/react-query'

type UseCreateQuestionsProps = {
  roomId: string
}

type CreateQuestionRequest = {
  question: string
}

type CreateQuestionResponse = {
  roomId: string
}

export function useCreateQuestion({ roomId }: UseCreateQuestionsProps) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['create-question'],
    mutationFn: async ({ question }: CreateQuestionRequest) => {
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
      queryClient.invalidateQueries({
        queryKey: ['get-room-questions', roomId],
      })
    },
  })
}
