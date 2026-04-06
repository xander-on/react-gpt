
interface Props{
  userScore :number;
  errors    :string[];
  message   :string;
}

export const GptOrthographyMessage = ({userScore, errors, message}:Props) => {
  return (
    <div className="col-start-1 col-end-8 p-3 rounded-lg">
      <div className="flex flex-row items-start">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 shrink-0">
          G
        </div>

        <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 px-4 shadow rounded-xl">
          <h3 className="text-xl">Puntaje: {userScore}</h3>
          <p>{message}</p>

          {
            errors.length === 0 
              ? <p className="text-green-500">¡Sin errores! ¡Excelente trabajo!</p>
              : <>
                  <h3 className="text-lg">Errores encontrados:</h3>
                  <ul className="list-disc list-inside">
                    {errors.map((error, index) => (
                      <li key={index} className="text-red-300">
                        {error}
                      </li>
                    ))}
                  </ul>
                </>
          }
        </div>
      </div>

    </div>
  )
}
