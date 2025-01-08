import { COLORS } from "../helpers/colors.ts";

/**
 * ! Patron Chain of Responsibility
 * Es un patrón de diseño de comportamiento que te permite pasar solicitudes
 * a lo largo de una cadena de manejadores.
 *
 * * Es útil cuando se necesita procesar datos de diferentes maneras, pero no
 * * se sabe de antemano qué tipo de procesamiento se necesita o en qué orden
 * * pero se sabe que se necesita procesar en una secuencia.
 *
 * https://refactoring.guru/es/design-patterns/chain-of-responsibility
 */
interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: string): void;
}
abstract class baseHandler implements Handler {
  //lo definimos como una propiedad opcional para que no se inicialice en el constructor
  private nextHandler?: Handler;
  setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }
  handle(request: string): void {
    if (this.nextHandler) {
      this.nextHandler.handle(request);
    }
  }
}
//Soporte basico
class BasicSupport extends baseHandler {
  override handle(request: string): void {
    if (request === "basico") {
      console.log("%cSoporte básico", COLORS.green);
      return;
    }
    console.log("%cEscalando el problema a soporte avanzado", COLORS.red);
    super.handle(request);
  }
}

//Soporte Avanzado
class AdvancedSupport extends baseHandler {
  override handle(request: string): void {
    if (request === "avanzado") {
      console.log(
        "%cSoporte avanzado: Resolviendo el problema avanzado",
        COLORS.blue
      );
      return;
    }
    console.log(
      `%cSoporte avanzado Escalando el problema a soporte experto`,
      COLORS.red
    );
    super.handle(request);
  }
}
class ExpertSupport extends baseHandler {
  override handle(request: string): void {
    if (request === "experto") {
      console.log(
        "%cSoporte expert: Resolviendo el problema experto",
        COLORS.yellow
      );
      return;
    }
    console.log(`%cHasta ahi llego bye bye`, COLORS.red);
    super.handle(request);
  }
}

(() => {
  const basic = new BasicSupport();
  const advanced = new AdvancedSupport();
  const expert = new ExpertSupport();

  basic.setNext(advanced).setNext(expert);
  basic.handle("advanced");
})();
