import { useState } from 'react'
import Mensaje from './Mensaje'

const NuevoPresupuesto = ({presupuesto, setPresupuesto, setPresupuestoValido}) => {

    const [mensaje, setMensaje] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        // console.log('Enviando...');
        console.log(presupuesto);
        if (!presupuesto || presupuesto <= 0) {
            setMensaje('No es un presupuesto valido');
            setTimeout(() => {
                setMensaje('')
            }, 3000);
            return;
        }
        setMensaje('')
        setPresupuestoValido(true)
    }

  return (
    <div className="contenedor-presupuesto contenedor sombra">
        <form 
            className="formulario"
            onSubmit={handleSubmit}
        >
            <div className="campo">
                <label htmlFor="presupuesto">Definir Presupuesto</label>
                <input 
                    type="number" 
                    className="nuevo-prepuesto"
                    id="presupuesto"
                    placeholder="Añade tu Presupuesto"
                    value={presupuesto}
                    onChange={(e) => setPresupuesto(Number(e.target.value))}
                />
            </div>

            <input 
                type="submit" 
                value="Añadir"
            />

            {mensaje && 
                <Mensaje error={'error'}>
                    {mensaje}
                </Mensaje>
            }
        </form>
    </div>
  )
}

export default NuevoPresupuesto