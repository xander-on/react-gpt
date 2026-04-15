import type { AudioToTextResponse } from "../../interfaces";


const responseTest = {
  "duration": 60,
  "lang": "es",
  "segments": [
    {
      "text": "El parque. Me llamo Pedro y hoy quiero hablar del parque que hay junto a mi casa.",
      "time": "00:00:01"
    },
    {
      "text": "Yo me divierto todos los días en el parque. Allí veo las palomas comiendo y bebiendo agua.",
      "time": "00:00:07"
    },
    {
      "text": "También veo pájaros de colores en los árboles. Voy al parque a las 5 de la tarde, cuando termino los deberes de la escuela.",
      "time": "00:00:12"
    },
    {
      "text": "Allí veo a mi amigo Juan y a mi amigo Luis. Con ellos juego al escondite y otros juegos muy entretenidos.",
      "time": "00:00:19"
    },
    {
      "text": "Luis se va más temprano del parque porque tiene que ir a la escuela de música a aprender a tocar el piano.",
      "time": "00:00:25"
    },
    {
      "text": "Mi padre también va al parque a hacer deporte. Él corre durante una hora después de trabajar.",
      "time": "00:00:31"
    },
    {
      "text": "Mi madre solo va a los fines de semana porque acaba tarde de trabajar.",
      "time": "00:00:37"
    },
    {
      "text": "Ella se sienta siempre en el mismo banco y yo juego mientras con mis amigos.",
      "time": "00:00:41"
    },
    {
      "text": "Por la mañana cruzo el parque para ir al colegio, pero no me entretengo para no llegar tarde a la clase.",
      "time": "00:00:47"
    },
    {
      "text": "De camino al colegio, veo al guarda del parque y siempre me da un caramelo de fresa.",
      "time": "00:00:54"
    }
  ],
  "rawText": "El parque. Me llamo Pedro y hoy quiero hablar del parque que hay junto a mi casa. Yo me divierto todos los días en el parque. Allí veo las palomas comiendo y bebiendo agua. También veo pájaros de colores en los árboles. Voy al parque a las 5 de la tarde, cuando termino los deberes de la escuela. Allí veo a mi amigo Juan y a mi amigo Luis. Con ellos juego al escondite y otros juegos muy entretenidos. Luis se va más temprano del parque porque tiene que ir a la escuela de música a aprender a tocar el piano. Mi padre también va al parque a hacer deporte. Él corre durante una hora después de trabajar. Mi madre solo va a los fines de semana porque acaba tarde de trabajar. Ella se sienta siempre en el mismo banco y yo juego mientras con mis amigos. Por la mañana cruzo el parque para ir al colegio, pero no me entretengo para llegar para no llegar tarde a la clase. De camino al colegio, veo al guarda del parque y siempre me da un caramelo de fresa."
}

export const audioToTextUseCase = async (audioFile:File, prompt?:string) => {

  try{
    const formData = new FormData();
    formData.append('file', audioFile);
    formData.append('prompt', prompt ?? '');

    const resp = await fetch(`${import.meta.env.VITE_GPT_API}/audio-to-text`, {
      method:"POST",
      body: formData
    });
    
    if(!resp.ok) throw new Error("Error en la respuesta del servidor");

    const data = await resp.json() as AudioToTextResponse;

    // const data = responseTest as AudioToTextResponse;
    return data

  }catch(err){
    return null
  }
}