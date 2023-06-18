//Mandar llamar a la api para crear una categoria
let idSeleccionadoParaEliminar=0;
let idSeleccionadoParaActualizar=0;

function crearCategoria(){
  const descripcionCategoria = document.getElementById('descripcionCategoriaAlta').value
  const observacionesCategoria = document.getElementById('observacionesCategoriaAlta').value
  $.ajax({
    method: 'POST', //metodo
    url: window.location.origin+'/api/categorias',
    data: { //body
      descripcion:descripcionCategoria,
      observaciones:observacionesCategoria
    },
    success: function( result ) {
      if(result.estado==1){
        let categoria = result.categoria;
        let tabla = $('#tabla-categorias').DataTable();
        let Botones = generarBotones(categoria.id);
        let nuevoRenglon = tabla.row.add([categoria.descripcion,Botones]).node()

        //Linea agregada para el ID del renglon
        $(nuevoRenglon).attr('id', 'renglon_'+categoria.id);
        $(nuevoRenglon).find('td').addClass('table-td')
        tabla.draw(false)
        alert(result.mensaje)
      }else{
        alert(result.mensaje)
      }
    
    }
  });
}

//Una funcion para listar las categorias
function getCategorias(){
    $.ajax({
      method:"GET", //Metodo
        url: window.location.origin+"/api/categorias", //url + Params
        data: { },
        success: function( result ) {
          if(result.estado==1){
            const categorias=result.categorias
            let tabla = $('#tabla-categorias').DataTable();
            categorias.forEach(categoria => {
              let Botones = generarBotones(categoria.id);
              //alert(categoria.descripcion);
              //tabla.row.add([categoria.descripcion, Botones]).node().id='renglon_' + categoria;
              //Para darle formato
              let nuevoRenglon = tabla.row.add([categoria.descripcion,Botones]).node()
              
              //Linea agregada para el ID del renglon
              $(nuevoRenglon).attr('id', 'renglon_'+categoria.id);

              $(nuevoRenglon).find('td').addClass('table-td');
              tabla.draw(false);
              
            });
          }else{
            alert(result.mensaje)
          }
        }
      });
}

function borrarCategoria(){
  $.ajax({
    method: "DELETE",
    url: window.location.origin+ "/api/categorias/"+idSeleccionadoParaEliminar,
    data: {},
    success: function( result ) {
      if(result.estado==1){
        //debemos de eliminar el renglon de la DataTable(tabla)
        let tabla = $('#tabla-categorias').DataTable();
        tabla.row('#renglon_'+idSeleccionadoParaEliminar).remove().draw()
      }else{
        alert(result.mensaje)
      }
    
    }
  });
}

function actualizarCategoria(){
  let descripcionCategoria = document.getElementById('descripcionCategoriaActualizar').value;
  let observacionesCategoria=document.getElementById( 'observacionesCategoriaActualizar').value;
  $.ajax({
    method: "PUT",
    url: window.location.origin+"/api/categorias/"+idSeleccionadoParaActualizar,
    data: {
      descripcion:descripcionCategoria,
      observaciones:observacionesCategoria
    },
    success: function( result ) {
      if(result.estado==1){
        //Debemos alctyualizar la tabla
        let tabla = $('#tabla-categorias').DataTable();
        //Paso 1
        let renglonTemporal = tabla.row('#renglon_'+idSeleccionadoParaActualizar).data();
        //Paso 2
        renglonTemporal[0]=descripcionCategoria
        //Paso 3
        tabla.row('#renglon_'+idSeleccionadoParaActualizar).data(renglonTemporal).draw();
        alert(result.mensaje);
      }else{
        alert(result.mensaje);
      }
    }
  });
}

function generarBotones(id){
  let Botones='<div class="flex space-x-3 rtl:space-x-reverse">';
    Botones+='<button class="action-btn" type="button">';
      Botones+='<iconify-icon icon="heroicons:eye"></iconify-icon>';
      Botones+='</button>'
    
      Botones+='<button onclick="identificaActualizar('+id+')" data-bs-toggle="modal" data-bs-target="#updateModal" class="action-btn" type="button">';
      Botones+='<iconify-icon icon="heroicons:pencil-square"></iconify-icon>'
      Botones+='</button>'
      Botones+='<button onclick="identificaEliminar('+id+');" data-bs-toggle="modal" data-bs-target="#deleteModal" class="action-btn" type="button">';
      Botones+='<iconify-icon icon="heroicons:trash"></iconify-icon>';
      Botones+='</button>';
      Botones+='</div>';
  return Botones;
}

function identificaActualizar(id){
  idSeleccionadoParaActualizar=id;
  $.ajax({
    method: "GET",
    url: window.location.origin+"/api/categorias/"+idSeleccionadoParaActualizar,
    data: {},
    success: function( result ) {
      if(result.estado==1){
        let categoria = result.categorias
        //Mostramos en la ventanda los datos 
        alert(categoria.descripcion);
        document.getElementById('descripcionCategoriaActualizar').value=categoria.descripcion;
        //document.getElementById('observacionesCategoriaActualizar').value=categoria.observaciones;
        

      }else{
        alert(result.mensaje);
      }
    }
  });
}

function identificaEliminar(id){
  // Debemos de guardar ese id de manera global
  idSeleccionadoParaEliminar=id;
  //alert(id);
}
//La mandamos llamar sin condicion
getCategorias();

//Una funcion para ver solo una categoria
//Dos funciones para actualizar una categoria 
//Dos funciones para eliminar una categoria
//Una funcion para crear una categoria 
//Una funcion que nos regrese el URL independientemente: local o de railway o render

