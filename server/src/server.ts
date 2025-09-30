import { fastifyCors } from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import { fastify } from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";

import "./db/connection.ts";
import { createQuestionRoute } from "./db/http/routes/create-question.ts";
import { createRoomRoute } from "./db/http/routes/create-room.ts";
import { getRoomQuestionsRoute } from "./db/http/routes/get-room-questions.ts";
import { uploadAudioRoute } from "./db/http/routes/upload-audio.ts";
import { getRoomsRoute } from "./db/http/routes/get-rooms.ts";
import { env } from "./env.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, { origin: "http://localhost:5173" });

app.register(fastifyMultipart);

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get("/health", () => {
  return "Ok";
});

app.register(getRoomsRoute);
app.register(createRoomRoute);
app.register(getRoomQuestionsRoute);
app.register(createQuestionRoute);
app.register(uploadAudioRoute);

app.listen({ port: env.PORT });
