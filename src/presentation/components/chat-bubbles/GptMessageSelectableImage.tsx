import { useCanvas } from '../../hooks/useCanvas';

interface Props{
  text:string;
  imageUrl:string;
  alt?:string

  //
  onImageSelected?: (imageUrl:string) => void
}

export const GptMessageSelectableImage = ({ imageUrl, onImageSelected }:Props) => {

  const {
    canvasRef,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    resetCanvas,
  } = useCanvas(imageUrl, onImageSelected);

  return (
    <div className="col-start-1 col-end-8 p-3 rounded-lg">
      <div className="flex flex-row items-start">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 shrink-0">
          G
        </div>

        <div className="relative ml-3 text-sm bg-black bg-opacity-25 py-3 px-4 shadow rounded-xl">

          <canvas
            ref={canvasRef}
            width={1024}
            height={1024}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
          />

          <button
            onClick={resetCanvas}
            className="btn-primary mt-2"
          >Borrar seleccion</button>

        </div>
      </div>

    </div>
  )
}
