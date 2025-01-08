import { COLORS } from "../helpers/colors.ts";

/**
 * !Patrón Memento
 * Permite capturar y externalizar un estado interno de un objeto,
 * de manera que el objeto pueda ser restaurado a ese estado más tarde.
 *
 * * Es útil cuando se necesita guardar el estado de un objeto para poder
 * * volver a él en un futuro.
 *
 * https://refactoring.guru/es/design-patterns/memento
 */
class GameMemento {
  private level: number;
  private health: number;
  private position: string;
  constructor(level: number, health: number, position: string) {
    this.level = level;
    this.health = health;
    this.position = position;
  }
  getLevel() {
    return this.level;
  }

  getHealth() {
    return this.health;
  }
  getPosition() {
    return this.position;
  }
}

class Game {
  private level: number = 1;
  private health: number = 100;
  private position: string = "inicio";
  constructor() {
    console.log(
      `Jugando en el nivel ${this.level} salud:${this.health} position: ${this.position}`
    );
  }
  save() {
    return new GameMemento(this.level, this.health, this.position);
  }
  //Comenzamos a jugar y modificamos las propiedades del juego
  play(level: number, health: number, position: string): void {
    this.level = level;
    this.health = health;
    this.position = position;
    console.log(
      `Jugando en el nivel ${this.level} salud:${this.health} position: ${this.position}`
    );
  }

  restore(memento: GameMemento): void {
    this.level = memento.getLevel();
    this.health = memento.getHealth();
    this.position = memento.getPosition();
    console.log(
      `%cProgreso restaurado \n%cRestauracion en el nivel %c${this.level} salud:${this.health} position: ${this.position}`,
      COLORS.yellow,
      COLORS.blue,
      COLORS.white
    );
  }
}

class GameHistory {
  private mementos: GameMemento[] = [];
  push(memento: GameMemento) {
    this.mementos.push(memento);
  }
  pop(): GameMemento | null {
    //si el array mementos ya es undefined devolvemos null
    return this.mementos.pop() ?? null;
  }
}

(()=>{
    const game= new Game()
    const history= new GameHistory()
    history.push(game.save())

    //Jugador avanza en el juego
    game.play(2,90,'Bosque encantado')
    history.push(game.save())

    game.play(3,70,'Cueva Oscura')
    history.push(game.save())
    //Aqui no salvo el juego
    game.play(4,50,'Castillo del dragon')
    console.log(`%c \n Estado actual`,COLORS.green)

    game.restore(history.pop()!)

    console.log(`%c \n Despues de restaurar el ultimo estado guardado`,COLORS.green)

    


})()