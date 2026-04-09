
import { useState } from "react";
import { GptMessage, GptMessageAudio, MyMessage, TextMessageBoxSelect, TypingLoader } from "../../components";
import { textToAudioUseCase } from "../../../core/use-cases";


const voices = [
  { id: "zephyr", text: "Zephyr" },
  { id: "puck",   text: "Puck" },
  { id: "charon", text: "Charon" },
  { id: "kore",   text: "Kore" },
  { id: "fenrir", text: "Fenrir" },
  { id: "leda",   text: "Leda" }
]


interface TextMessage {
  text:string;
  isGpt:boolean;
  type:"text";
}

interface AudioMessage{
  text:string;
  audio:string;
  isGpt:boolean;
  type:"audio";
}

type Message = TextMessage | AudioMessage;


export const TextToAudioPage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async(text:string, selectedVoice:string) => {
    setIsLoading(true);
    setMessages( prev => [...prev, {text, isGpt:false, type:"text"}] );

    const {ok, message, audioUrl} = await textToAudioUseCase(text, selectedVoice);
    setIsLoading(false);

    if(!ok) return;

    setMessages( prev => [
      ...prev, 
      { 
        text:`${selectedVoice} - ${message}`, 
        audio:audioUrl!, 
        isGpt:true, 
        type:"audio"
      }
    ]);

  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">

          <GptMessage text="## que audio quieres generar?? todo audio generado es por AI"/>

          {
            messages.map( (message, index) => (
              message.isGpt 
                ? message.type === "audio"
                  ? <GptMessageAudio key={index} text={message.text} audio={message.audio}/>
                  : <GptMessage      key={index} text={message.text}/>

                : <MyMessage key={index} text={message.text}/>
            ))
          }


          {
            isLoading && 
              <div className="col-start-1 col-end-12">
                <TypingLoader className="fade-in"/>
              </div>
          }
        </div>
      </div>


      <TextMessageBoxSelect
        onSendMessage={handlePost}
        placeholder="Escribe tu mensaje aquí..."
        placeholderOptions="Selecciona una voz"
        options={voices}
      />
    </div>
  )
}
