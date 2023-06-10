const drawCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
        <h1 class="modal-header-title">Tu Carrito</h1>
      `;
    modalContainer.append(modalHeader);
  
    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "Cerrar";
    modalbutton.className = "modal-header-button";
  
    modalbutton.addEventListener("click", () => {
      modalContainer.style.display = "none";
    });
  
    modalHeader.append(modalbutton);
  
    carrito.forEach((product) => {
      let carritoContent = document.createElement("div");
      carritoContent.className = "modal-content";
      carritoContent.innerHTML = `
        <img src="./img/${product.img}" alt="">
        <h3>${product.nombre}</h3>
        <p>${product.precio} $</p>
        <span class="restar"> ➖ </span>
        <p>${product.cantidad}</p>
        <span class="sumar"> ➕ </span>
        <p>Total: ${product.cantidad * product.precio} $</p>
        <span class="delete-product"> ❌ </span>
        `;
  
      modalContainer.append(carritoContent);
  
      let restar = carritoContent.querySelector(".restar");
  
      restar.addEventListener("click", () => {
        if (product.cantidad !== 1) {
          product.cantidad--;
        }
        saveLocal();
        drawCarrito();
      });
  
      let sumar = carritoContent.querySelector(".sumar");
      sumar.addEventListener("click", () => {
        product.cantidad++;
        saveLocal();
        drawCarrito();
      });
  
      let eliminar = carritoContent.querySelector(".delete-product");
  
      eliminar.addEventListener("click", () => {
        eliminarProducto(product.id);
      });
  
     
    });
    
    // Mostrar el Total
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
  
    const totalCompra = document.createElement("div");
    totalCompra.className = "total-content";
    totalCompra.innerHTML = `Total a pagar: $ ${total} `;
    modalContainer.append(totalCompra);

    // Boton de Finalizar compra
    const finalizarCompraBtn = document.createElement("button");
    finalizarCompraBtn.innerText = "Finalizar compra";
    finalizarCompraBtn.className = "finalizar-compra";

    const botonContainer = document.createElement("div");
    botonContainer.className = "boton-fincompra";
    botonContainer.appendChild(finalizarCompraBtn);

    modalContainer.appendChild(botonContainer);

  };
  
  verCarrito.addEventListener("click", drawCarrito);
  

  const eliminarProducto = (id) => {
    carrito = carrito.filter((carritoId) => carritoId.id !== id);
  
    carritoCounter();
    saveLocal();
    drawCarrito();
  };
  
  
  const carritoCounter = () => {
    cantidadCarrito.style.display = "block";
  
    const carritoLength = carrito.length;
  
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
  
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
  };
  
  carritoCounter();