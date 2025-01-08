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

import { COLORS } from "../helpers/colors.ts";

// Interfaz Observer
interface Observer {
  update(weatherData: string): void;
}

// Clase Subject - WeatherStation
// TODO: Terminal la implementación
class WeatherStation {
  // observers = [];
  // weatherData = 'Soleado';
  private appSubscribers: Observer[] = [];
  private weatherData: string;

  constructor(weatherData: string) {
    this.weatherData = weatherData;
  }
  // Agregar un Observer
  subscribe(observer: Observer): void {
    // TODO: añadir observer
    this.appSubscribers.push(observer);
    //Tan pronto se suscriba reciba notificacion
    //observer.update(this.weatherData);
    console.log(
      "%cNueva aplicación suscrita al sistema meteorológico.",
      COLORS.green
    );
  }

  // Eliminar un Observer
  unsubscribe(observer: Observer): void {
    // TODO: eliminar observer
    this.appSubscribers = this.appSubscribers.filter(
      (appSubscriber) => appSubscriber !== observer
    );
    console.log(`%cUna aplicación se ha dado de baja`, COLORS.red);
  }

  // Actualizar el clima y notificar a todos los Observers
  setWeather(weatherData: string): void {
    console.log(`\nClima actualizado: %c${weatherData}`, COLORS.blue);
    // TODO: actualizar clima y notificar a todos los Observers con el método notifyObservers
    this.notifyObservers();
    this.weatherData = weatherData;
  }

  // Notificar a todos los Observers
  private notifyObservers(): void {
    // TODO: implementar método
    this.appSubscribers.forEach((appSubscriber) =>
      appSubscriber.update(this.weatherData)
    );
  }
}

// Clase Observer - WeatherApp
class WeatherApp implements Observer {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  // Recibir actualización del clima
  update(weatherData: string): void {
    console.log(
      `%c${this.name} %cha recibido notificación del clima: %c${weatherData}`,
      COLORS.red,
      COLORS.white,
      COLORS.yellow
    );
  }
}

// Código Cliente para Probar
function main(): void {
  const weatherStation = new WeatherStation("Climas de Invierno");

  // Crear aplicaciones
  const flutterWeatherApp = new WeatherApp("Flutter WeatherApp");
  const reactNativeWeatherApp = new WeatherApp("React Native WeatherApp");
  const weatherTrackerApp = new WeatherApp("Weather Tracker App");

  // Suscribir aplicaciones a la estación meteorológica
  weatherStation.subscribe(flutterWeatherApp);
  weatherStation.subscribe(reactNativeWeatherApp);

  // Actualizar el clima
  weatherStation.setWeather("Lluvioso");

  // Agregar una nueva aplicación
  weatherStation.subscribe(weatherTrackerApp);
  weatherStation.setWeather("Nublado");

  // Una aplicación se da de baja
  weatherStation.unsubscribe(reactNativeWeatherApp);
  weatherStation.setWeather("Tormenta eléctrica");
}

main();
