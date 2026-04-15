import { useState } from "react";
import { GptMessage, MyMessage, TextMessageBoxFile, TypingLoader } from "../../components";
import { audioToTextUseCase } from '../../../core/use-cases/audioToText.use-case';

interface Message {
  text:string;
  isGpt:boolean;
}


export const AudioToTextPage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async(text:string, audioFile:File) => {
    setIsLoading(true);
    setMessages( prev => [...prev, {text, isGpt:false}] );

    const resp = await audioToTextUseCase(audioFile, text);
    setIsLoading(false);

    if(!resp ) return;

    const segmentMessages:string[] = [];

    resp.segments.forEach( segment => {
      const text = `**${segment.time}:** ${segment.text}`;
      segmentMessages.push(text);
    });

    const gptMessage = `
## Transcription:
**Duration:** ${Math.round(resp.duration)} segundos  
**Languaje:** ${resp.lang}
### Segments:
${segmentMessages.join('\n\n')}
`;

    setMessages(prev => [...prev, {text:gptMessage, isGpt:true}]);
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">

          <GptMessage text="Que archivo quieres transcribir"/>

          {
            messages.map( (message, index) => (
              message.isGpt 
                ? <GptMessage key={index} text={message.text}/>
                : <MyMessage key={index} text={message.text ? message.text :'Transcribe el audio'}/>
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


      <TextMessageBoxFile
        onSendMessage={handlePost}
        placeholder="Escribe tu mensaje aquí..."
        disableCorrections
        accept="audio/*"
      />
    </div>
  )
}
