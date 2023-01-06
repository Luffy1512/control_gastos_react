const Mensaje = ({children, error}) => {
  return (
    <div className={`alerta ${error}`}>{children}</div>
  )
}

export default Mensaje