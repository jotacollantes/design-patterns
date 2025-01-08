import { COLORS } from "../helpers/colors.ts";

/**
 * ! Patrón Command
 * Este patrón encapsula una solicitud como un objeto,
 * lo que le permite parametrizar otros objetos con diferentes solicitudes,
 * encolar solicitudes, o registrar solicitudes, y soporta operaciones que pueden deshacerse.
 *
 * Me gustó mucho la explicación de Refactoring Guru
 * https://refactoring.guru/es/design-patterns/command
 *
 * * Es útil cuando se necesita desacoplar el objeto que invoca
 * * la operación del objeto que sabe cómo realizarla.
 *
 *
 */
interface Command {
  execute(): void;
}

class Light {
  turnOn(): void {
    console.log("%cLight is on", COLORS.yellow);
  }

  turnOff(): void {
    console.log("%cLight is off", COLORS.yellow);
  }
}

class Fan {
  on(): void {
    console.log("%cFan is on", COLORS.green);
  }

  off(): void {
    console.log("%cFan is off", COLORS.green);
  }
}

//Comandos
class LightOnCommand implements Command {
  private light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  execute(): void {
    this.light.turnOn();
  }
}

//Comandos
class LightOffCommand implements Command {
  private light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  execute(): void {
    this.light.turnOff();
  }
}

class FanOnCommand implements Command {
  private fan: Fan;

  constructor(fan: Fan) {
    this.fan = fan;
  }

  execute(): void {
    this.fan.on();
  }
}

class FanOffCommand implements Command {
  private fan: Fan;

  constructor(fan: Fan) {
    this.fan = fan;
  }

  execute(): void {
    this.fan.off();
  }
}

//Control remoto
class RemoteControl {
  private commands: Record<string, Command> = {};

  setCommand(button: string, command: Command): void {
    this.commands[button] = command;
  }

  pressButton(button: string): void {
    if (this.commands[button]) {
      this.commands[button].execute();
      return;
    }
    console.log(`No se encontró el comando ${button}`, COLORS.red);
  }
}

(() => {
  const light = new Light();
  const fan = new Fan();
  const lightOnCommand = new LightOnCommand(light);
  const fanOnCommand = new FanOnCommand(fan);
  const lightOffCommand = new LightOffCommand(light);
  const fanOffCommand = new FanOffCommand(fan);

  const remoteControl = new RemoteControl();
  remoteControl.setCommand("1", lightOnCommand);
  remoteControl.setCommand("2", lightOffCommand);
  remoteControl.setCommand("3", fanOnCommand);
  remoteControl.setCommand("4", fanOffCommand);
  let continueProgram = true;
  do {
    console.clear();
    const buttonPressed =
      prompt(
        `Presiona un boton: \n1. Encender Luz \n2. Apagar Luz \n3. Encender Ventilador \n4. Apagar Ventilador `
      ) ?? "";
    remoteControl.pressButton(buttonPressed);
    const continueProgramResponse = prompt(
      `\n Desea continuar? (y/n):`
    )?.toLowerCase();
    continueProgram = continueProgramResponse === "y" ? true : false;
  } while (continueProgram);
})();
