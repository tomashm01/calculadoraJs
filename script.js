/**
 * Partiendo de un documento html vacío, crea los elementos HTML de una calculadora mediante los métodos del objeto predefinido document.
 * @author Tomás
 */
{
    let calculadora={
        signos:["CE","<-","%","+","7","8","9","-","4","5","6","x","1","2","3","÷","0","±",",","="],
        input:null,
        divPrincipal:null,
        realizarOperacion:null,
        valor1:0,
        valor2:0,
        sumar:false,
        restar:false,
        multiplicar:false,
        dividir:false,
        porcentaje:false,
        operacionActual:false,
        operacionPosterior:false,
        primerNumero:true,
        nuevoValor:false,
        init(){
            calculadora.crearInput();
            calculadora.crearDiv();
            calculadora.estructuraBotones();
            document.body.appendChild(calculadora.divPrincipal);            
        },
        comportamiento(valor){
            if(calculadora.input.value=="Error" && valor!="CE"){
                return null;
            }
            if(valor<="9" && valor>="1"){
                return()=>{
                    if((calculadora.input.value==0 && calculadora.input.value.length<=1)||calculadora.nuevoValor){
                        calculadora.input.value=valor;
                    }else{
                        calculadora.input.value+=valor;
                        calculadora.nuevoValor=false;
                    }
                }
            }
            switch(valor){
                case "0":
                    return ()=>{
                        if(calculadora.nuevoValor){
                            calculadora.input.value=valor;
                            calculadora.nuevoValor=false;
                        }else if(calculadora.input.value!=0||calculadora.input.value.length==0||calculadora.input.value.includes(".")){
                            calculadora.input.value+=valor;
                        }
                    }
                case "±":
                    return ()=>{
                        if(calculadora.input.value>0){
                            calculadora.input.value = -Math.abs(calculadora.input.value);
                        }
                        else{
                            calculadora.input.value=Math.abs(calculadora.input.value);
                        }
                    }
                case "&lt;-": //<-
                    return()=>{
                        calculadora.input.value=calculadora.input.value.substring(0,calculadora.input.value.length-1);
                        if(calculadora.input.value==""){
                            calculadora.input.value="0";
                        }
                    }
                case ",":
                    return()=>{
                        if(!calculadora.input.value.includes(".")){
                            calculadora.input.value+=".";
                        }
                    }
                case "CE":
                    return()=>{
                        calculadora.input.value="0";
                        calculadora.valor1=0;
                        calculadora.valor2=0;
                        calculadora.resetearOperadores();
                        calculadora.operacionActual=false;
                        calculadora.operacionPosterior=false;
                        calculadora.primerNumero=true;
                    }
                case "=":
                    return()=>{
                        if (calculadora.operacionActual == false && calculadora.operacionPosterior != "+" || calculadora.operacionPosterior != "-" || calculadora.operacionPosterior != "x" || calculadora.operacionPosterior != "/")
                            calculadora.asignarOperaciones(calculadora.operacionPosterior);
                        calculadora.comprobarOperacion(calculadora.input.value);
                        calculadora.nuevoValor = true;
                    }
                case "+":
                case "-":
                case "x":
                case "÷":
                case "%":
                    return()=>{
                        if (calculadora.primerNumero) {
                            calculadora.valor1 = calculadora.input.value;
                            calculadora.operacionPosterior = valor;
                            calculadora.primerNumero = false;
                        } else {
                            calculadora.valor2 = calculadora.input.value;
                            calculadora.realizarOperacion = true;
                            calculadora.operacionActual = calculadora.operacionPosterior;
                            calculadora.operacionPosterior = valor;
                        }
                        calculadora.asignarOperaciones(calculadora.operacionActual);
                        if (calculadora.realizarOperacion && !calculadora.nuevoValor)
                            calculadora.comprobarOperacion(calculadora.input.value);
                        calculadora.nuevoValor = true;
                    }
            }
        },
        comprobarOperacion(valor){
            if(calculadora.sumar||calculadora.restar||calculadora.multiplicar||calculadora.dividir||calculadora.porcentaje){
                calculadora.valor2=valor;
                calculadora.calcularOperacion();
            }
        },
        resetearOperadores(){
            calculadora.sumar=false;
            calculadora.restar=false;
            calculadora.multiplicar=false;
            calculadora.dividir=false;
            calculadora.porcentaje=false;
        },
        asignarOperaciones(valor) {
            calculadora.resetearOperadores();
            switch (valor) {
                case "+":
                    calculadora.sumar = true;
                    break;
                case "-":
                    calculadora.restar = true;
                    break;
                case "x":
                    calculadora.multiplicar = true;
                    break;
                case "÷":
                    calculadora.dividir = true;
                    break;
                case "%":
                    calculadora.porcentaje = true;
                    break;
            }
        },
        calcularOperacion(){
            if (calculadora.sumar) {
                calculadora.input.value = parseFloat(calculadora.valor1) + parseFloat(calculadora.valor2);
            } else if (calculadora.restar) {
                calculadora.input.value = parseFloat(calculadora.valor1) - parseFloat(calculadora.valor2);
            } else if (calculadora.multiplicar) {
                calculadora.input.value = parseFloat(calculadora.valor1) * parseFloat(calculadora.valor2);
            } else if (calculadora.dividir) {
                calculadora.input.value = parseFloat(calculadora.valor1) / parseFloat(calculadora.valor2);
            } else {
                calculadora.input.value = (parseFloat(calculadora.valor1) * parseFloat(calculadora.valor2)) / 100;
            }
            calculadora.valor1 = calculadora.input.value;
            calculadora.valor2 = 0;
            if (calculadora.errorResultado()){
                calculadora.input.value = "Error";
            }
        },
        errorResultado() {
            return calculadora.input.value == "Infinity" || calculadora.input.value == "NaN";
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
            boton.style.width="50px";
            boton.style.margin="5px";
            boton.textContent=valor;
            boton.addEventListener("click",calculadora.comportamiento(valor));
            return boton;
    
        }
    }
    
    document.addEventListener("DOMContentLoaded", calculadora.init);
    
}