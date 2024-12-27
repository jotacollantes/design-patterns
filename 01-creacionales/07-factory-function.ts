import { COLORS } from "../helpers/colors.ts";

/**
 * ! Factory Function
 * Es un patrón de diseño que nos permite crear objetos o funciones de manera dinámica que serán
 * usados posteriormente en el código.
 *
 * * Es útil cuando necesitamos crear objetos o funciones de manera dinámica,
 * * es decir, en tiempo de ejecución y no en tiempo de compilación.
 *
 */
type Language ='es'|'en'|'fr'

function createGreeter(lang:Language) {
return function (name:string) {
    const message ={
        'es':`%cHola +${name}`,
        'en':`%cHello +${name}`,
        'fr':`%cBonjour ${+name}`
    }
    //return console.log(message[lang],COLORS.blue)
    return message[lang]
}
}

const clg=(gretting:string)=>{
    console.log(gretting,COLORS.orange)
}
(()=>{
    const spanishGretter = createGreeter('es')
    const englishGretter = createGreeter('en')
    const frenchGretter = createGreeter('fr')
    clg(spanishGretter('Tito'))
    clg(englishGretter('Juanito'))
    clg(frenchGretter('Panchito'))
    
})()