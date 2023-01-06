import Gastos from "./Gastos"
import NuevoPresupuesto from "./NuevoPresupuesto"

const Header = ({
  presupuesto, 
  setPresupuesto, 
  presupuestoValido, 
  setPresupuestoValido, 
  gastos,
  setGastos
}) => {

  return (
    <header>
        <h1>Planificador de Gastos</h1>

        {presupuestoValido ? (
            <Gastos 
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            gastos={gastos}
            setGastos={setGastos}
            setPresupuestoValido={setPresupuestoValido}
            />
        ) : (
            <NuevoPresupuesto 
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            setPresupuestoValido={setPresupuestoValido}
            />
        )}
    </header>
  )
}

export default Header