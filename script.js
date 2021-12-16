/**
 * Partiendo de un documento html vacío, crea los elementos HTML de una calculadora mediante los métodos del objeto predefinido document.
 * @author Tomás
 */
{
    let calculadora={
        signos:["CE","<-","%","+",7,8,9,"-",4,5,6,"x",1,2,3,"÷",0,"±",",","="],
        input:null,
        divPrincipal:null,
        resultado:null,
        init(){
            calculadora.crearInput();
            calculadora.crearDiv();
            calculadora.estructuraBotones();
        },
        crearInput(){
            calculadora.input = document.createElement("input");
            calculadora.input.setAttribute("type", "text");
            calculadora.input.setAttribute("value", "0");
            calculadora.input.style.width="230px";
            calculadora.input.style.textAlign="right";
            calculadora.input.style.margin="5px";
            calculadora.input.disabled = true;
        },
        crearDiv(){
            calculadora.divPrincipal= document.createElement("div");
            calculadora.divPrincipal.appendChild(calculadora.input);
            calculadora.divPrincipal.appendChild(document.createElement("br"));
        },
        estructuraBotones(){
            let contador=0;

            for(valor of calculadora.signos){
                calculadora.divPrincipal.appendChild(calculadora.crearBoton(valor));
                contador++;
                if(contador===4){
                    calculadora.divPrincipal.appendChild(document.createElement("br"));
                    contador=0;
                }
            }
        },
        crearBoton(valor){

            let boton = document.createElement("button");
            boton.setAttribute("type", "button");
            boton.setAttribute("id", valor);
    
            boton.style.width="50px";
            boton.style.margin="5px";
            boton.innerHTML=valor;
    
            return boton;
    
        }
    }

    document.addEventListener("DOMContentLoaded", function(){

        calculadora.init();
        document.body.appendChild(calculadora.divPrincipal);
        document.close();

        
    });

    //Realiza la operación correspondiente
    // const operacion=(valor,input)=>{
    //     switch(valor){
    //         case "CE": //Borrar todo

    //             input.value="0";
    //             break;
    //         case "&lt;-": //Borrar un caracter

    //             if(input.value.length===0){
    //                 input.value="0";
    //             }else{
    //                 input.value=valorInput.substring(0,valorInput.length-1);
    //             }              

    //             break;
    //         case "%": //Hacer modulo
    //             if(input.value.length===0){
    //                 break;
    //             }else{
    //                 input.value=input.value%100;
    //             }   
    //             break;
    //         case "+":
    //             input.value=parseFloat(valorInput)+parseFloat(input.value);
    //             break;
    //         case "-":
    //             input.value=parseFloat(valorInput)-parseFloat(input.value);
    //             break;
    //         case "x":
    //             input.value=parseFloat(valorInput)*parseFloat(input.value);
    //             break;
    //         case "÷":
    //             input.value=parseFloat(valorInput)/parseFloat(input.value);
    //             break;
    //         case "=":
    //             input.value=eval(input.value);
    //             break;
    //     }
    // }

    //Funcion para crear un boton
    
}