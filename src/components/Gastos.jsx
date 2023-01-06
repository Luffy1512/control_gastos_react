import { useEffect, useState } from 'react'

// react-circular-progressbar
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

import {formatearCantidad} from '../helpers'

const Gastos = ({
  presupuesto, 
  setPresupuesto,
  gastos,
  setGastos,
  setPresupuestoValido
}) => {

  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)
  const [porcentaje, setPorcentaje] = useState(0)

  useEffect(() => {
    const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0)
    const totalDisponible = presupuesto-totalGastado

    // Calcular el porcentaje gastado
    const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje)
    }, 1000);

    setDisponible(totalDisponible)
    setGastado(totalGastado)
  }, [gastos])

  function handleResetearApp() {
    const confirmar = confirm('¿Estas Seguro de Reinificar la App?')
    if (confirmar) {
      setPresupuesto(0)
      setGastos([])
      setPresupuestoValido(false)
    }
  }
  
  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">

      <div>
        <CircularProgressbar 
          styles={buildStyles({
            pathColor: disponible < 0 ? '#DC2626' : '#3B82F6',
            trailColor: '#F5F5F5',
            textColor: disponible < 0 ? '#DC2626' : '#3B82F6'
          })}
          text={`${porcentaje}% Gastado`}
          value={porcentaje}
        />
      </div>

      <div className="contenido-presupuesto">
        <button 
          type='button'
          className="reset-app"
          onClick={handleResetearApp}
        >Resetar App</button>
        <p>
          <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? 'negativo' : ''}`}>
          <span>Disponible: </span> {formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado: </span> {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  )
}

export default Gastos