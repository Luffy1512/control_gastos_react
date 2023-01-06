export function mostrarMensaje(mensaje, error) {
    const formulario = document.querySelector('#formulario')
    const div = document.createElement('DIV')
    div.classList.add('text-white', 'py-3', 'px-5', 'mt-5', 'uppercase', 'text-center', 'font-bold')

    if (error === 'error') {
        div.classList.add('bg-red-800')
    } else {
        div.classList.add('bg-lime-600')
    }

    const mensajeDiv = document.createElement('P')
    mensajeDiv.textContent = mensaje
    
    div.appendChild(mensajeDiv)
    formulario.appendChild(div)

    setTimeout(() => {
        div.remove();
    }, 3000);
}

export function formatearCantidad(cantidad) {
    return cantidad.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    })
}

export function generarId() {
    const random = Math.random().toString(36).substr(2)
    const fecha = Date.now().toString(36)
    return random + fecha
}

export function formatearFecha(fecha) {
    const fechaNueva = new Date(fecha)
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }

    return fechaNueva.toLocaleDateString('es-ES', opciones)
}