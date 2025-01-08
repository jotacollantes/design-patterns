/**
 * ! Patrón State
 * Este patrón permite a un objeto cambiar su comportamiento
 * cuando su estado interno cambia.
 *
 * * Es útil cuando un objeto tiene un comportamiento que depende de su estado
 * * y debe cambiar su comportamiento en tiempo de ejecución dependiendo de ese estado.
 *
 * https://refactoring.guru/es/design-patterns/state
 */

import { COLORS } from "../helpers/colors.ts";
import { sleep } from "../helpers/sleep.ts";

/**
 * * Objetivo: Implementar el patrón State para simular el funcionamiento
 * * de una máquina expendedora.
 * * La máquina tiene diferentes estados,
 *  * Como Esperando Dinero,
 *  * Seleccionando Producto,
 *  * Entregando Producto,
 * * y su comportamiento varía dependiendo del estado actual.
 */
interface State {
  name: string;
  insertMoney(): void;
  selectProduct(): void;
  dispenseProduct(): void;
}

class VendingMachine {
  private state: State;
  constructor() {
    //Todo estado inicial.
    this.state = new WaitingForMoney(this);
  }

  insertMoney() {
    this.state.insertMoney();
  }
  selectProduct() {
    this.state.selectProduct();
  }
  dispenseProduct() {
    this.state.dispenseProduct();
  }
  setState(newState: State) {
    this.state = newState;
    console.log(`Estado cambio a: %c${newState.name}`, COLORS.yellow);
  }
  getStateName(): string {
    return this.state.name;
  }
}
//States
class WaitingForMoney implements State {
  public name: string = "Esperando Dinero";
  private vendingMachine: VendingMachine;
  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }
  insertMoney(): void {
    console.log(
      `Dinero Insertado: %c Ahora puedes seleccionar un producto`,
      COLORS.green
    );
    //Todo
    this.vendingMachine.setState(new ProductSelected(this.vendingMachine));
  }
  selectProduct(): void {
    console.log(`%cPrimero debes de ingresar el dinero`, COLORS.red);
  }
  dispenseProduct(): void {
    console.log(`%cPrimero debes de ingresar el dinero`, COLORS.red);
  }
}

class ProductSelected implements State {
  public name: string = "Seleccionando Producto";
  private vendingMachine: VendingMachine;
  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }
  insertMoney(): void {
    console.log(
      `c%Por favor selecciona un producto - Dinero ya Insertado`,
      COLORS.red
    );
  }
  selectProduct(): void {
    //cambiamos el state
    this.vendingMachine.setState(new DispensingProduct(this.vendingMachine));
    console.log(`%cProducto seleccionado`, COLORS.green);
  }
  dispenseProduct(): void {
    console.log(`%cSelecciona un producto antes de despacharlo`, COLORS.red);
  }
}

class DispensingProduct implements State {
  public name: string = "Despachando Producto";
  private vendingMachine: VendingMachine;
  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }
  insertMoney(): void {
    console.log(
      `%cPor favor espere su producto - Dinero ya Insertado`,
      COLORS.red
    );
    //Todo
    //this.vendingMachine.setState()
  }
  selectProduct(): void {
    console.log(`%cProducto ya seleccionado y despachando`, COLORS.red);
  }
  dispenseProduct(): void {
    console.log(
      `%cProducto despachado, cambiando estado a Esperando dinero`,
      COLORS.green
    );
    this.vendingMachine.setState(new WaitingForMoney(this.vendingMachine));
  }
}
(async () => {
  const vendingMachine = new VendingMachine();
  let selectedOption: string | null = "4";

  do {
    console.clear();
    console.log(
      `Selecciona opcion: %c${vendingMachine.getStateName()}`,
      COLORS.blue
    );
    selectedOption = prompt(
      `1. Insertar dinero 2. Seleccionar producto 3. Dispensar producto 4. Salir \n opcion:`
    );

    switch (selectedOption) {
      case "1":
        vendingMachine.insertMoney();
        break;
      case "2":
        vendingMachine.selectProduct();
        break;
      case "3":
        vendingMachine.dispenseProduct();
        break;
      case "4":
        console.log(`Saliendo del sistema`);
        break;

      default:
        break;
    }
    await sleep(3000);
  } while (selectedOption !== "4");
})();
