/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */

import { COLORS } from "../helpers/colors.ts";

class DragonBalls {
//! Para crear el singleton necesitamos una propiedad estatica privada para poder almacenar la instancia.
//! Necesitaremos un metodo constructor privado para poder crear la instancia.
//! Necesitaremos un metodo estatico que nos permita obtener la this.instance o crear una instancia nueva.

  private static instance: DragonBalls;
  private ballsCollected: number;

  private constructor() {
    this.ballsCollected = 0;
  }

  public static getInstance(): DragonBalls {
    //! Si no existe una instancia creamos una nueva instancia caso contrario retornamos la instancia existente
    //! No hay que usar .this en el getInstance porque es un metodo estatico.
    if (!DragonBalls.instance) {
      DragonBalls.instance = new DragonBalls();
      console.log("%cLas pelotas de dragon ball han sido creadas", COLORS.red);
    }
    return DragonBalls.instance;
  }

  collectBalls() {
    if (this.ballsCollected < 7) {
      this.ballsCollected++;
      console.log(
        `Pelota recolectada. \nTotal de esferas:${this.ballsCollected}`
      );
      return;
    }
    console.log(`Ya se han recolectado las 7 pelotas de dragon ball`);
  }

  summonShenlong() {
    if (this.ballsCollected === 7) {
      console.log("Has invocado a Shenlong");
      this.ballsCollected = 0;
      return;
    }
    console.log(
      `\nAun faltan ${7 - this.ballsCollected} pelotas para invocar a Shenlong`
    );
  }
}

const gokuDragonBalls = DragonBalls.getInstance();
gokuDragonBalls.collectBalls();
gokuDragonBalls.collectBalls();
gokuDragonBalls.collectBalls();
gokuDragonBalls.summonShenlong();

const vegetaDragonBalls = DragonBalls.getInstance();
vegetaDragonBalls.collectBalls();
vegetaDragonBalls.collectBalls();
vegetaDragonBalls.collectBalls();
vegetaDragonBalls.collectBalls();
gokuDragonBalls.summonShenlong();
vegetaDragonBalls.summonShenlong();
