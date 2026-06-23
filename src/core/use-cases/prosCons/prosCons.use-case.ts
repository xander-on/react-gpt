
export const prosConsUseCase = async (prompt:string) => {

  try{
    const resp = await fetch(`${import.meta.env.VITE_GPT_API}/pros-cons-discusser`, {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({prompt})
    });

    if(!resp.ok) throw new Error("Error en la respuesta del servidor");

    const data:string = await resp.text() as string;

    return {
      ok:true,
      data
    }

  }catch(err){
    return{
      ok:false,
      message:`No se pudo hacer la comparacion: ${err}`
    }
  }
}