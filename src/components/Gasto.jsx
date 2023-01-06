import {formatearFecha} from '../helpers'

// react-swipeable-list
import { 
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
 } from 'react-swipeable-list'
 import "react-swipeable-list/dist/styles.css"

import IconoAhorro from '../img/icono_ahorro.svg'
import IconoCasa from '../img/icono_casa.svg'
import IconoComida from '../img/icono_comida.svg'
import IconoGastos from '../img/icono_gastos.svg'
import IconoOcio from '../img/icono_ocio.svg'
import IconoSalud from '../img/icono_salud.svg'
import IconoSuscripciones from '../img/icono_suscripciones.svg'

const Gasto = ({gasto, setGastoEditar, eliminarGasto}) => {
    const {id, nombre, cantidad, categoria, fecha} = gasto

    // objeto para las categorias y asociarla a las imagenes
    const categoriaImagen = {
        ahorro: IconoAhorro,
        casa: IconoCasa,
        comida: IconoComida,
        gastos: IconoGastos,
        ocio: IconoOcio,
        salud: IconoSalud,
        suscripciones: IconoSuscripciones
    }

    const leadingActions = () => ( // Cambiamos las llaves a parentesis para usar un componente
        // console.log('Editar')
        <LeadingActions>
            <SwipeAction onClick={() => setGastoEditar(gasto)}>
                Editar
            </SwipeAction>
        </LeadingActions>
    )
    
    const trailingActions = () => (
        // console.log('Eliminar')
        <TrailingActions>
            <SwipeAction 
                onClick={() => eliminarGasto(id)}
                destructive={true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

  return (
    <SwipeableList>
        <SwipeableListItem
            leadingActions={leadingActions()}
            trailingActions={trailingActions()}
        >
            <div className="gasto sombra">
                <div className="contenido-gasto">
                    <div>
                        <img src={categoriaImagen[categoria]} alt="Icono de la Categoria" />
                    </div>

                    <div className="descripcion-gasto">
                        <p className="categoria">{categoria}</p>
                        <p className="nombre-gasto">{nombre}</p>
                        <p className="fecha-gasto">Agregado el: <span>{formatearFecha(fecha)}</span></p>
                    </div>
                </div>
                <p className='cantidad-gasto'>${cantidad}</p>
            </div>
        </SwipeableListItem>
    </SwipeableList>
  )
}

export default Gasto