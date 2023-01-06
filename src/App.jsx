import { useState, useEffect } from 'react'

import Filtros from './components/Filtros'
import Header from "./components/Header"
import ListadoGastos from './components/ListadoGastos'
import Modal from './components/Modal'

import {generarId} from './helpers'

import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  )
  const [presupuestoValido, setPresupuestoValido] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : [])
  const [gastoEditar, setGastoEditar] = useState({})

  // State para el filtro
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true)
      // Animar el Modal
      setTimeout(() => {
        setAnimarModal(true)
      }, 500);    
    }    
  }, [gastoEditar])

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])
  
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
    if (presupuestoLS > 0) {
      setPresupuestoValido(true)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])

  // useEffect para los filtros
  useEffect(() => {
    if (filtro) {
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    } 
  }, [filtro])

  function handleNuevoGasto() {
    // console.log('Añadiendo nuevo gasto...');
    setModal(true)
    setGastoEditar({})

    // Animar el Modal
    setTimeout(() => {
      setAnimarModal(true)
    }, 500);    
  }

  function guardarGasto(gasto) {

    if (gasto.id) {
      // Editar
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    } else {
      // Añadir
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }
  }

  function eliminarGasto(id) {
    // console.log('Eliminando...', id);
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id)
    setGastos(gastosActualizados)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      
      <Header 
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        presupuestoValido={presupuestoValido}
        setPresupuestoValido={setPresupuestoValido}
        gastos={gastos}
        setGastos={setGastos}
      />
 
      {presupuestoValido && (

        <>
        <main>
          <Filtros 
            filtro={filtro}
            setFiltro={setFiltro}
          />
          <ListadoGastos 
            gastos={gastos}
            setGastoEditar={setGastoEditar}
            eliminarGasto={eliminarGasto}
            filtro={filtro}
            gastosFiltrados={gastosFiltrados}
          />
          
        </main>
        <div className='nuevo-gasto'>
          <img 
            src={IconoNuevoGasto} 
            alt="Icono para Nuevo Gasto" 
            onClick={handleNuevoGasto}
          />
        </div>
        </>
      )}
      
      { modal && <Modal 
                    setModal={setModal} 
                    animarModal={animarModal}
                    setAnimarModal={setAnimarModal}
                    guardarGasto={guardarGasto}
                    gastoEditar={gastoEditar}
                    setGastoEditar={setGastoEditar}
                  /> }
     
    </div>
  )
}

export default App
