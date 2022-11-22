const resultado = document.querySelector('#resultado');
const paginacionDiv = document.querySelector('#paginacion');

let paginaActual = 1;
let totalPaginas;
let iteradorSiguiente;

window.onload = () => {
  const formulario = document.querySelector('#formulario');
  formulario.addEventListener('submit', validarFormulario);
  paginacionDiv.addEventListener('click', direccionPaginacion);
};

function validarFormulario(e) {
  e.preventDefault();

  const terminoBusqueda = document.querySelector('#termino').value;

  if (terminoBusqueda === '') {
    mostrarAlerta('Adicione um item para busca.');
    return;
  }

  buscarImagenes();
}

function mostrarAlerta(mensaje) {
  const alerta = document.querySelector('.bg-red-100');
  if (!alerta) {
    const alerta = document.createElement('p');

    alerta.classList.add(
      'bg-red-100',
      'border-red-400',
      'text-red-700',
      'px-4',
      'py-3',
      'rounded',
      'max-w-lg',
      'mx-auto',
      'mt-6',
      'text-center'
    );

    alerta.innerHTML = `
            <strong class="font-bold"></strong>
            <span class="block sm:inline">${mensaje}</span>
        `;

    formulario.appendChild(alerta);

    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

function buscarImagenes() {
  const terminoBusqueda = document.querySelector('#termino').value;

  const key = '1732750-d45b5378879d1e877cd1d35a6';
  const url = `https://pixabay.com/api/?key=${key}&q=${terminoBusqueda}&per_page=30&page=${paginaActual}`;

  fetch(url)
    .then(respuesta => respuesta.json())
    .then(resultado => {
      totalPaginas = calcularPaginas(resultado.totalHits);
      mostrarImagenes(resultado.hits);
    });
}

function mostrarImagenes(imagenes, paginas) {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }

  imagenes.forEach(imagen => {
    const {likes, views, webformatURL, largeImageURL} = imagen;
    resultado.innerHTML += `
            <div class="w-full md:w-1/2 lg:w-1/3 mb-4 p-3 ">
                <div class="bg-white shadow ">
                    <img class="w-full block rounded-t-md " src=${webformatURL} alt={tags} />
                    <div class="pt-4 px-2 w-full">
                        <p class="card-text"><span class="font-bold">${likes}</span> Curtidas</p>
                        <p class="card-text"><span class="font-bold">${views}</span> Visualizações </p>
        
                        <div class="py-4">                        
                        <a href=${largeImageURL} 
                        rel="noopener noreferrer" 
                        target="_blank" class="font-bold text-emerald-400 ">Ver imagem</a></div>
                    </div>
                </div>
            </div>
            `;
  });
}

function calcularPaginas(total) {
  return parseInt(Math.ceil(total / 30));
}
