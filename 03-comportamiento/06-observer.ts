import { COLORS } from "../helpers/colors.ts";

/**
 * ! Patrón Observer
 * El patrón Observer es un patrón de diseño de comportamiento que establece
 * una relación de uno a muchos entre un objeto, llamado sujeto,
 * y otros objetos, llamados observadores, que son notificados
 * y actualizados automáticamente por el sujeto
 * cuando se producen cambios en su estado.
 *
 * * Es útil cuando necesitamos que varios objetos estén
 * * pendientes de los cambios
 *
 * !No confundirlo con RXJS Observables
 *
 * https://refactoring.guru/es/design-patterns/observer
 */
interface Observer {
  notify(videoTitle: string): void;
}

class YouTubeChannel {
  private subscribers: Observer[] = [];
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  subscribe(observer: Observer): void {
    this.subscribers.push(observer);
    console.log(`Nuevo suscriptor al canal %c${this.name}`, COLORS.green);
  }

  unSubscribe(observer: Observer): void {
    this.subscribers = this.subscribers.filter(
      (subscriber) => subscriber !== observer
    );
    console.log(
      `Un suscriptor se ha dado del baja en el canal %c${this.name}`,
      COLORS.red
    );
  }
  uploadVideo(videoTitle: string) {
    console.log(
      ` Canal ${this.name} ha subido un nuevo video llamado %c${videoTitle}`,
      COLORS.orange
    );
    this.subscribers.forEach((subscriber) => subscriber.notify(videoTitle));
  }
}

class Subscriber implements Observer {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }
  notify(videoTitle: string): void {
    console.log(
      `%c${this.name} ha sido notificado: %cNuevo video ${videoTitle}`,
      COLORS.blue,
      COLORS.yellow
    );
  }
}
(() => {
  const channel = new YouTubeChannel("Cocinando con Fernando");
  const melissa = new Subscriber("Melissa");
  const cesar = new Subscriber("Cesar");
  const emin = new Subscriber("Emin");

  channel.subscribe(melissa);
  channel.subscribe(cesar);
   channel.uploadVideo("Recetas de tamales con React");
   channel.subscribe(emin);
   channel.uploadVideo("Recetas de React al Pastor");
   channel.unSubscribe(cesar)
   channel.uploadVideo("Recetas de View a la barbacoa");
   channel.unSubscribe(emin)
   channel.uploadVideo("Parrillada de NodeJS");
   channel.unSubscribe(melissa)
   channel.uploadVideo("Docker a la Plancha");


})();
