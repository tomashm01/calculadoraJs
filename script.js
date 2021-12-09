/**
 * Partiendo de un documento html vacío, crea los elementos HTML de una calculadora mediante los métodos del objeto predefinido document.
 * @author Tomás
 */
{
document.addEventListener("DOMContentLoaded", function(){

    //Boton para introducir un número
    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("value", "0");
    input.style.width="230px";
    input.style.textAlign="right";
    input.style.margin="5px";
    input.disabled = true;

    //Div donde está todo
    let divPrincipal= document.createElement("div");
    divPrincipal.appendChild(input);
    divPrincipal.appendChild(document.createElement("br"));

    //Array con los signos
    let signos=["CE","<-","%","+",7,8,9,"-",4,5,6,"x",1,2,3,"÷",0,"±",",","="];
    let contador=0;

    for(signo of signos){
        divPrincipal.appendChild(crearBoton(signo));
        contador++;
        if(contador===4){
            divPrincipal.appendChild(document.createElement("br"));
            contador=0;
        }
    }

    //Insertar interfaz
    document.open();
    document.appendChild(divPrincipal);
    

    //Agregar funcionalidad
    let botones=document.getElementsByTagName("button");

    //Recorro cada boton y veo si ha sido pulsado para ejecutar la funcion correspondiente
    // botones.forEach(boton=>{
    //     boton.addEventListener("click", function(){
    //         input.value=this.value;
    //     });
    // });


    document.close();
});

//Funcion para crear un boton
const crearBoton=(valor)=>{

    let boton = document.createElement("button");
    boton.setAttribute("type", "button");
    boton.setAttribute("id", valor);

    boton.style.width="50px";
    boton.style.margin="5px";
    boton.innerHTML=valor;

    return boton;

}
}