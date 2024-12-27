/**
 * ! Patrón Builder:
 * Es un patrón de diseño creacional que nos permite construir objetos complejos
 * paso a paso.
 *
 * El patrón nos permite producir distintos tipos y representaciones
 * de un objeto empleando el mismo código de construcción.
 *
 * * Es útil cuando necesitamos construir un objeto complejo con muchas partes
 * * y queremos que el proceso de construcción sea independiente de las partes
 * * que lo componen.
 *
 * https://refactoring.guru/es/design-patterns/builder
 */

import { COLORS } from "../helpers/colors.ts";

class Computer {
    public cpu:string='cpu - not Defined'
    public ram:string='ram - not Defined'
    public storage:string='storage - not Defined'
    public gpu?:string

    displayConfiguration() {
        console.log(`first configuration: CPU: ${this.cpu} RAM: ${this.ram} STORAGE: ${this.storage} GPU: ${this.gpu ||"No tiene GPU"}`);
    }
}

class ComputerBuilder {
    private computer: Computer;

    constructor(){
        this.computer = new Computer();
    }
    setRam(ram:string):ComputerBuilder {
        this.computer.ram=ram
        return this
    }
    setCpu(cpu:string):ComputerBuilder {
        this.computer.cpu=cpu
        return this
    }

    setStorage(storage:string):ComputerBuilder {
        this.computer.storage=storage
        return this
    }
    build() {
        return this.computer
    }
}

(()=>{
  const computerBasic: Computer = new ComputerBuilder().setCpu('i5').setRam('8GB').setStorage('256GB').build()
  console.log('%cComputadora basica',COLORS.cyan)
  computerBasic.displayConfiguration();

  const computerGamer:Computer= new ComputerBuilder().setCpu('i7').setRam('16GB').setStorage('1TB').build()
  console.log('%cComputadora Gamer',COLORS.red)
  computerGamer.displayConfiguration()

})()