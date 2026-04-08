import type { TranslateResponse } from "../../interfaces";



export const translateTextUseCase = async(prompt:string, lang:string) => {
  try{
    const resp = await fetch(`${import.meta.env.VITE_GPT_API}/translate`, {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({prompt, lang})
    });

    if(!resp.ok) throw new Error("Error en la respuesta del servidor");

    const { data } = await resp.json() as TranslateResponse;

    return {
      ok: true,
      message:data
    }

  }catch{
    return {
      ok: false,
      message: 'No se pudo traducir'
    }
  }
}