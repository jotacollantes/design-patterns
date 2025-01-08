/**
 * ! Patrón Strategy
 *
 * El patrón Strategy es un patrón de diseño de software que define una
 * familia de algoritmos, los encapsula y los hace intercambiables.
 *
 *
 * * Es útil cuando se tiene una clase que tiene un comportamiento que puede
 * * cambiar en tiempo de ejecución y se quiere delegar la responsabilidad de
 * * la implementación a otra clase.
 *
 * https://refactoring.guru/es/design-patterns/strategy
 */

import { COLORS } from "../helpers/index.ts";

/**
 * !Objetivo: Explicar el patrón Strategy usando un ejemplo donde varios
 * ! patitos compiten en una carrera y cada uno tiene su propia
 * ! estrategia de movimiento (por ejemplo, nadar, volar o caminar).
 */
interface MovementStrategy {
  move(): void;
}
//Estrategia 1: Rapida pero costosa
class SwimFast implements MovementStrategy {
  move(): void {
    console.log(`%cEl pato nada rapidamente sobre el agua`, COLORS.blue);
  }
}
// Estrategia 2: No tan Rapida pero no tan costosa
class FlyOverWater implements MovementStrategy {
  move(): void {
    console.log(`%cEl pato vuela elegantemente en el aire`, COLORS.pink);
  }
}


// Estrategia 2: No tan Rapida pero no tan costosa
class WalkClumsily implements MovementStrategy {
  move(): void {
    console.log(`%cEl pato camina torpemente por la orilla`, COLORS.pink);
  }
}


//Cosumidor de la estrategia

class Duck {
    private name:string
    private movementStrategy: MovementStrategy

    constructor(name:string, movementStrategy:MovementStrategy){
        this.name=name;
        this.movementStrategy=movementStrategy
    }

    performeMove(){
        console.log(`${this.name} se prepara para moverse`)
    }

    setMovementStrategy(movementStrategy:MovementStrategy){
        this.movementStrategy=movementStrategy
        console.log(`${this.name} cambio de estrategia`)
    }
}