import { useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const isRecordingSupported =
  navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === "function" &&
  typeof window.MediaRecorder === "function";

type RoomParams = { roomId: string };

export function RecordRoomAudio() {
  const [isRecording, setIsRecording] = useState(false);
  const recorder = useRef<MediaRecorder | null>(null);

  const params = useParams<RoomParams>();

  if (!params.roomId) {
    return <Navigate replace to="/" />;
  }

  async function startRecording() {
    if (!isRecordingSupported) {
      alert("O seu navegador não suporta gravação de áudio.");
      return;
    }

    setIsRecording(true);

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    });

    recorder.current = new MediaRecorder(audio, {
      mimeType: "audio/webm",
      audioBitsPerSecond: 64_000,
    });

    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data);
      }
    };

    recorder.current.onstop = () => {
      for (const track of audio.getTracks()) {
        track.stop();
      }
    };

    recorder.current.start();
  }

  function stopRecording() {
    setIsRecording(false);

    if (recorder.current && recorder.current.state !== "inactive") {
      recorder.current.stop();
    }
  }

  async function uploadAudio(audio: Blob) {
    const formData = new FormData();

    formData.append("file", audio, "audio.webm");

    const response = await fetch(
      `http://localhost:3000/rooms/${params.roomId}/audio`,
      { method: "POST", body: formData }
    );

    const result = await response.json();

    return result;
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {isRecording ? (
        <Button className="min-w-38" onClick={stopRecording}>
          Parar gravação
        </Button>
      ) : (
        <Button className="min-w-38" onClick={startRecording}>
          Gravar aúdio
        </Button>
      )}
      <p>{isRecording ? "Gravando..." : "Pausado"}</p>
    </div>
  );
}
