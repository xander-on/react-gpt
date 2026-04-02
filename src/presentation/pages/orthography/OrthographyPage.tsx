import { useState } from "react";
import { GptMessage, MyMessage, TextMessageBox, TypingLoader } from "../../components"

interface Message {
  text:string;
  isGpt:boolean;
}


export const OrthographyPage = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async(text:string) => {
    setIsLoading(true);
    setMessages( prev => [...prev, {text, isGpt:false}] );

    //Todo: useCase
    setIsLoading(false);

    //Todo: anadir el mensaje de isGpt en true

  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">

          <GptMessage text="Hola"/>

          {
            messages.map( (message, index) => (
              message.isGpt 
                ? <GptMessage key={index} text={"esto es de openAi"}/>
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

      {/* <TextMessageBoxFile
        onSendMessage={handlePost}
        placeholder="Escribe tu mensaje aquí..."
      /> */}

      {/* <TextMessageBoxSelect
        onSendMessage={console.log}
        options={[{id: "1", text:"hola"}, {id: "2", text:"mundo"}]}
      /> */}
    </div>
  )
}
