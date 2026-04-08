import { useState } from "react";
import { GptMessage, MyMessage, TextMessageBox, TypingLoader } from "../../components";
import { prosConsUseCase } from "../../../core/use-cases/prosCons.use-case";

interface Message {
  text:string;
  isGpt:boolean;
}


export const ProsConsPage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async(text:string) => {
    setIsLoading(true);
    setMessages( prev => [...prev, {text, isGpt:false}] );

    const { ok, data } = await prosConsUseCase(text);

    setIsLoading(false);
    if(!ok ) return;

    setMessages( prev => [...prev, {text: data!, isGpt:true}] );
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">

          <GptMessage text="Hola, puedes escribir lo que sea que quieres comparar"/>

          {
            messages.map( (message, index) => (
              message.isGpt 
                ? <GptMessage key={index} text={message.text}/>
                : <MyMessage key={index} text={message.text}/>
            ))
          }


          {
            isLoading && 
              <div className="col-start-1 col-end-12">
                <TypingLoader className="fade-in"/>
              </div>
          }

          {/* <MyMessage text="Hola Mundo"/>

          <TypingLoader className="fade-in"/> */}
        </div>
      </div>


      <TextMessageBox
        onSendMessage={handlePost}
        placeholder="Escribe tu mensaje aquí..."
        disableCorrections
      />
    </div>
  )
}
