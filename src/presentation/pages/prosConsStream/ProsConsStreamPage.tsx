import { useRef, useState } from "react";
import { GptMessage, MyMessage, TextMessageBox, TypingLoader } from "../../components";
import { prosConsStreamUseCase } from "../../../core/use-cases";

interface Message {
  text:string;
  isGpt:boolean;
}


export const ProsConsStreamPage = () => {

  const abortController = useRef(new AbortController());

  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async(text:string) => {
    setIsLoading(true);
    setIsStreaming(true);
    setMessages( prev => [...prev, {text, isGpt:false}] );

    const stream = prosConsStreamUseCase(text, abortController.current.signal);

    // setIsLoading(false);

    // setTimeout(() => {
    //   setIsLoading(false);
    // },3000)
    setMessages( prev => [...prev, {text:'', isGpt:true}] );
    let isFirstChunk = true;

    for await (const text of stream){

      if (isFirstChunk) {
        setIsLoading(false);   // ✅ aquí sí
        isFirstChunk = false;
      }

      setMessages( messages => {
        const newMessages = [...messages];
        newMessages[newMessages.length - 1].text = text
        return newMessages;
      })
    }

    // setTimeout(() => {
    //   setIsStreaming(false);
    // },5000);

    setIsStreaming(false);
  }

  const handleAbort = () => {
    abortController.current.abort();
    abortController.current = new AbortController();
    setIsLoading(false);
    setIsStreaming(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">

          <GptMessage text="Que deseas comparar??"/>

          { 
            messages.map( (message, index) => (
              message.isGpt
                ? !isLoading && <GptMessage key={index} text={message.text}/>
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


      <TextMessageBox
        onSendMessage={handlePost}
        onAbort={handleAbort}
        isStreaming={isStreaming}
        placeholder="Escribe tu mensaje aquí..."
        disableCorrections
      />
    </div>
  )
}
