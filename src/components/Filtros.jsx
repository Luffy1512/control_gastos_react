import {useState, useEffect} from 'react'

const Filtros = ({filtro, setFiltro}) => {

    function handleChange(e) {
        // console.log(e.target.value);
        setFiltro(e.target.value);
    }

  return (
    <div className='filtros sombra contenedor'>
        <form>
            <div className='campo'>
                <label htmlFor="filtro">Filtros</label>
                <select 
                    id="filtro"
                    value={filtro}
                    onChange={handleChange}
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
        </form>
    </div>
  )
}

export default Filtros