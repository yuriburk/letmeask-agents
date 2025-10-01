import { useMutation, useQueryClient } from "@tanstack/react-query";

import { GetRoomQuestionsResponse } from "./use-room-questions";

type UseCreateQuestionsProps = {
  roomId: string;
};

type CreateQuestionRequest = {
  question: string;
};

type CreateQuestionResponse = {
  roomId: string;
};

export function useCreateQuestion({ roomId }: UseCreateQuestionsProps) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-question"],
    mutationFn: async ({ question }: CreateQuestionRequest) => {
      const response = await fetch(
        `http://localhost:3000/rooms/${roomId}/questions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question }),
        }
      );
      const result: CreateQuestionResponse = await response.json();

      return result;
    },
    onMutate: ({ question }) => {
      const questions = queryClient.getQueryData<GetRoomQuestionsResponse>([
        "get-questions",
        roomId,
      ]);

      const newQuestion = {
        id: crypto.randomUUID(),
        question,
        answer: undefined,
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData<GetRoomQuestionsResponse>(
        ["get-questions", roomId],
        [newQuestion, ...(questions ?? [])]
      );

      return { questions };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-room-questions", roomId],
      });
    },
    onError: (_, __, context) => {
      if (context?.questions) {
        queryClient.setQueryData<GetRoomQuestionsResponse>(
          ["get-room-questions", roomId],
          context.questions
        );
      }
    },
  });
}
