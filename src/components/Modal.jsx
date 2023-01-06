import {useState, useEffect} from 'react'
import IconoCerrarModal from '../img/cerrar.svg'
import Mensaje from './Mensaje'

const Modal = ({
    setModal, 
    animarModal, 
    setAnimarModal, 
    guardarGasto, 
    gastoEditar,
    setGastoEditar
}) => {

    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [id, setId] = useState('')
    const [fecha, setFecha] = useState('')

    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            // Estoy Editando
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        } else {
            // Estoy generando un nuevo gasto
        }
    }, [gastoEditar])
    

    function handleCerrarModal() {
        setAnimarModal(false)
        setGastoEditar({})
        setTimeout(() => {
            setModal(false)
        }, 500);
    }

    function handleSubmit(e) {
        e.preventDefault()
        // console.log('Desde formulario...');
        if ([nombre, cantidad, gasto].includes('')) {
            setMensaje('Todos los campos son Obligatorios');
            setTimeout(() => {
                setMensaje('')
            }, 3000);
            return;
        }
        setMensaje('')

        // Guardar los Gastos  en el array
        guardarGasto({nombre, cantidad, categoria, id, fecha})

        // Cerrar el Formulario
        setAnimarModal(false)
        setTimeout(() => {
            setModal(false)
        }, 500);
    }

  return (
    <div className="modal">
        <div className='cerrar-modal'>
            <img 
                src={IconoCerrarModal} 
                alt="Icono para Cerrar Modal" 
                onClick={handleCerrarModal}
            />
        </div>
        <form 
            className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}
            onSubmit={handleSubmit}
        >
            <fieldset>
                <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>

                {mensaje && <Mensaje error={'error'}>{mensaje}</Mensaje>}

                <div className="campo">
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input 
                        type="text" 
                        id='nombre' 
                        placeholder='Añade un Nombre de Gasto' 
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input 
                        type="text" 
                        id='cantidad' 
                        placeholder='Añade la cantidad del Gasto: ej. 300'
                        value={cantidad}
                        onChange={e => setCantidad(Number(e.target.value))}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="gasto">Filtrar Gasto</label>
                    <select 
                        id="gasto"
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}
                    >
                        <option value="">--Seleccione una Opción--</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>
            </fieldset>

            <input type="submit" value={gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gasto'}/>
        </form>
    </div>
  )
}

export default Modal