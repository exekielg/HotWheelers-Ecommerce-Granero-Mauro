const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// se crea todo dentro de una funcion asincrona con Fetch y se simula conexion a un Endpoint usando un Json Local
  const obtenerProducts = async() => {
  try {
    const response = await fetch("data/productdata.json");
    const datosJson = await response.json();
 
    datosJson.forEach((product) => {
    
 
      let content = document.createElement("div");
      content.className = "card";
      content.innerHTML = `
        <img src="./img/${product.imagen}">
        <h3>${product.nombre}</h3>
        <p class="price">$ ${product.precio} </p>
        `;
  
      shopContent.append(content);
  
      let comprar = document.createElement("button");
      comprar.innerText = "comprar";
      comprar.className = "comprar";
  
      content.append(comprar);
  
      // Se agrega un listener a cada Boton comprar para controlar cuando se presiona un boton.  
      comprar.addEventListener("click", () => {
        const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);
        // si el producto ya existe en el carrito, incremento cantidad, sino, lo agrego
        if (repeat) {
          carrito.map((prod) => {
            if (prod.id === product.id) {
              prod.cantidad++;
            }
          });
        } else {
          carrito.push({
            id: product.id,
            img: product.imagen,
            nombre: product.nombre,
            precio: product.precio,
            cantidad: product.cantidad,
          });
          carritoCounter();
          saveLocal();
    
          //Sweet Alert
          Swal.fire({
            icon: 'success',
            title: 'Producto agregado al carrito',
            showCancelButton: true,
            confirmButtonColor: '#f08810',
            confirmButtonText: 'Ir al carrito',
            cancelButtonText: 'Seguir comprando'
          }).then((result) => {
            if (result.value) {
              verCarrito
            }
          });
        }
      });
    });
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error al obtener los datos',
      text: error.message,
    });
  }
};

obtenerProducts();

// se Guarda en el local Storage
const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

