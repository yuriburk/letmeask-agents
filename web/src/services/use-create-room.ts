import { useMutation, useQueryClient } from '@tanstack/react-query'

type CreateRoomRequest = {
  name: string
  description: string
}

type CreateRoomResponse = {
  questionId: string
}

export function useCreateRoom() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['create-room'],
    mutationFn: async ({ name, description }: CreateRoomRequest) => {
      const response = await fetch('http://localhost:3000/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
      })
      const result: CreateRoomResponse = await response.json()

      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-rooms'] })
    },
  })
}
