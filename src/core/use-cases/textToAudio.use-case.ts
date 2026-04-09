

export const textToAudioUseCase = async (prompt:string, voice:string) => {

  try{
    const resp = await fetch(`${import.meta.env.VITE_GPT_API}/text-to-audio`, {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({prompt, voice})
    });

    if(!resp.ok) throw new Error("Error en la respuesta del servidor");

    const audioFile = await resp.blob();
    const audioUrl = URL.createObjectURL(audioFile);

    return {
      ok:true,
      message: prompt,
      audioUrl
    }

  }catch(err){
    return{
      ok:false,
      message:`No se pudo generar el audio: ${err}`
    }
  }
}