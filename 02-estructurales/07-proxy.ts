import { COLORS } from "../helpers/colors.ts";

/**
 * ! Patrón Proxy
 * Este patrón se utiliza para controlar el acceso a un objeto, es decir,
 * se crea un objeto que actúa como intermediario entre el cliente y el objeto real.
 *
 * * Es útil cuando necesitamos controlar el acceso a un objeto,
 * * por ejemplo, para verificar si el cliente tiene permiso
 * * para acceder a ciertos métodos o propiedades.
 *
 * https://refactoring.guru/es/design-patterns/proxy
 *
 */
class Player {
  name: string;
  level: number;
  constructor(name: string, level: number) {
    this.name = name;
    this.level = level;
  }
}

interface Room {
  enter(player: Player): void;
}

class SecretRoom implements Room {
  enter(player: Player): void {
    console.log(`%cBienvenido a la sala secreta ${player.name}`, COLORS.blue);
    console.log(`%cUn gran enemigo te espera`, COLORS.green);
  }
}

//Clase Proxy
class MagicPortal implements Room {
  private secretRoom: Room;
  constructor(room: Room) {
    this.secretRoom = room;
  }
  enter(player: Player): void {
    if (player.level >= 10) {
      this.secretRoom.enter(player);
      return;
    }
    console.log(
      `%c${player.name} tu nivel ${player.level} no suficiente para entrar a la sala secreta`,
      COLORS.red
    );
  }
}
(()=>{
   const portal= new MagicPortal(new SecretRoom());
   const player1= new Player('Jhon', 5);
   const player2= new Player('Doe', 10);
   portal.enter(player1);
   portal.enter(player2);
})()