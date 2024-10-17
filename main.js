//item se refiere a la opción que elige el usuario, y lo usamos para identificar al producto

let item = 0
//cantProducto lo usamos para guardar la cantidad que el usuario quiere del producto elegido

let cantProducto = 0
//en el carrito vamos a tener una lista con todos los productos, y su respectivo detalle (cantidad y subtotal)

let carrito = []


//la funcion buscarProducto toma el número que el usuario introduce en el prompt, y lo usa para buscar si existe algun producto, teniendo en cuenta eses valor como indice. Returna un booleano, si es true existe el producto, sino no

function buscarProducto(numProducto){
    return numProducto <= productos.length && numProducto > 0
}


//esta función se encarga de verificar si hay stock disponible del producto elegido. Toma como parámetros el item correspondiente al producto, y la cantidad ingresada.

function verStockProducto(cant, itemProducto){
    if(cant <= parseInt(productos[(itemProducto-1)][2])){
        alert('Tenemos stock!')
        return true
    }else{
        alert('No nos quedó stock!')
    }
}

//añadirItem lo que hace es, valga la redundancia, añadir el item al carrito

function añadirItem(cantProducto, item){
        carrito.push([productos[(item-1)][0], cantProducto, (cantProducto * (productos[(item-1)][1]))])
        alert('Producto añadido al carrito!!!')
}


//la función mostrar ticket informa al usuario mediante un alert, todos los productos que compró, con subtotales y total de toda la compra

function mostrarTicket(){
    let precioTotal = 0
    let ticket = 'TICKET'
    for(i=0; i<carrito.length; i++){
        ticket = ticket + '\nItem ' + (i+1) + ': ' + carrito[i][0] + ' - cantidad: ' + carrito[i][1] + ' - subtotal: ' + carrito[i][2]
        precioTotal = precioTotal + carrito[i][2]
    }
    ticket = ticket + '\nEl precio final es de: ' + parseInt(precioTotal)
    return ticket
}


//Creamos los productos, y una lista para mostrarlos en un string

let productos = [['monitor', '2000', '10'], ['auricular', '1200', '30'], ['teclado', '1000', '45']]
let listaProductos = ''

//la función comprar engloba todas las funciones mencionada

function comprar(){

    let seguirComprando = true
    //el do while lo usamos para que el usuario decida si quiere seguir añadiendo productos al carrito o no

    do{

        listaProductos = ''

        //Acá llenamos el string con los productos, el stock, y el precio (se va a llenar cada vez que repitamos al proceso para que vaya actualizando el stock de los productos, y muestre la cantidad real)

        for (i = 0; i < productos.length; i++) {
            listaProductos = listaProductos + (i+1) + ')Producto: ' + productos[i][0] + ' - Precio: ' + productos[i][1] + ' - Stock disponbible: ' + productos[i][2] + '\n'
        }

            item = prompt('Seleccione un producto.\n' + listaProductos)
           
        //si la función retorna un valor false, entonces el producto no existe

        if(!buscarProducto(item)){
            alert('No se encontró el producto!')
        }
        else{

            let cantValida = false
            while(!cantValida){
              
              cantProducto = prompt('Ingrese la cantidad deseada')
              
            }
            //acá verificamos que haya stock del producto

            if(verStockProducto(cantProducto, item)){
                let respuestaAñadirItem = confirm('¿Desea añadir al carrito: producto(' + productos[(item-1)][0] + ') cantidad (' + cantProducto + ') subtotal de: $' + productos[(item-1)][1] * cantProducto + '\n1) Sí\n2) No')
                //Si hay stock, pide la confirmación al usuario para agregar el producto al carrito, sino puede volver a elegir otro

                if(respuestaAñadirItem){
                    añadirItem(cantProducto, item)
                    productos[(item-1)][2] = productos[(item-1)][2] - cantProducto
                    //descontamos al stock principal

                }
            }
        }

        //preguntamos si desesa seguir añadiendo productos al carrito
        
        let seguir = confirm('Desea seguir añadiendo productos al carrito?\n1) Sí\n2) No')
        if(!seguir){
            seguirComprando = false
        }

        //si es no, seguirComprando se setea a false, y sale del while.

    }while(seguirComprando)
    
    if(carrito != ''){
        alert(mostrarTicket())
    }
    else{
        alert('no se encontraron pedidos en el carrito, proceso finalizado!')
    }
}
    
comprar()

//function añadirProducto() {
//  
//  const tipoNuevoProducto = prompt('Tipo del nuevo producto')
//  const precioNuevoProducto = prompt('Precio del nuevo producto')
//  const stockNuevoProducto = prompt('Stock del nuevo producto')
//  let existeProducto = false
//
//  productos.forEach(producto => {
//    if(producto.tipo === tipoNuevoProducto){
//      existeProducto = true
//      throw new Error('error, ya existe un producto con este tipo')
//    }
//  });
//
//  if(!existeProducto){
//    productos.push({
//      "tipo": tipoNuevoProducto,
//      "precio": precioNuevoProducto,
//      "stockDisponible": stockNuevoProducto
//    })
//  }
//};