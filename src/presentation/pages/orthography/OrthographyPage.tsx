import { useState } from "react";
import { GptMessage, GptOrthographyMessage, MyMessage, TextMessageBox, TypingLoader } from "../../components"
import { orthographyUseCase } from "../../../core/use-cases";

interface Message {
  text:string;
  isGpt:boolean;
  info?:{
    userScore:number;
    errors:string[];
    message:string;
  }
}


export const OrthographyPage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async(text:string) => {
    setIsLoading(true);
    setMessages( prev => [...prev, {text, isGpt:false}] );

    const data = await orthographyUseCase(text);
    console.log({data});

    if(!data.ok) {
      setMessages( prev => [...prev, {text: data.message, isGpt:true}]);
      return;
    }

    setMessages(prev => [...prev, {
      text: data.message,
      isGpt:true,
      info:{
        userScore: data.userScore,
        errors: data.errors,
        message: data.message
      }
    }]);

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
                ? <GptOrthographyMessage 
                    key={index} 
                    userScore={message.info!.userScore}
                    errors={message.info!.errors}
                    message={message.info!.message}
                  />
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
