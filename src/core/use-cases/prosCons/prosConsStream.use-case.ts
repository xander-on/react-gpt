
// esta es la manera usando generators
export async function* prosConsStreamUseCase (prompt:string, abortSignal:AbortSignal) {

  try{
    const resp = await fetch(`${import.meta.env.VITE_GPT_API}/pros-cons-stream`, {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({prompt}),
      signal:abortSignal
    });

    if(!resp.ok) throw new Error("Error en la respuesta del servidor");

    const reader = resp.body?.getReader();

    if(!reader){
      console.log("No se pudo obtener el reader del stream");
      return null;
    }

    const decoder = new TextDecoder();
    let text = '';

    while(true){
      const { value, done } = await reader.read();
      if(done) break;

      const decodedChunk = decoder.decode(value, { stream: true });
      text += decodedChunk;
      // console.log(text);
      yield text;
    }

  }catch(err){
    return{
      ok:false,
      message:`No se pudo hacer la comparacion: ${err}`
    }
  }
}