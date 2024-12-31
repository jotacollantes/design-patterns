import { COLORS } from "../helpers/colors.ts";

/**
 * ! Patrón Facade
 * Este patrón proporciona una interfaz unificada para un conjunto de interfaces
 * en un subsistema.
 *
 * Facade define una interfaz de nivel más alto que hace que el subsistema
 * sea más fácil de usar.
 *
 * * Es útil cuando un subsistema es complejo o difícil de entender para
 * * proporcionar una interfaz simplificada para el cliente.
 *
 * https://refactoring.guru/es/design-patterns/facade
 */
class Projector {
  turnOn() {
    console.log("Proyector: Encendiendo proyector.");
  }
  turnOff() {
    console.log("Proyector: Apagando proyector.");
  }
}

class SoundSystem {
  on() {
    console.log("Sistema de Sonido: Encendiendo sistema de sonido.");
  }
  off() {
    console.log("Sistema de Sonido: Apagando sistema de sonido.");
  }
}

class VideoPlayer {
  on() {
    console.log("Reproductor de Video: %cEncendido.", COLORS.blue);
  }
  play(message: string) {
    console.log(
      `Reproductor de Video: %cReproduciendo %c${message}`,
      COLORS.green
    );
  }
  stop() {
    console.log("Reproductor de Video: %cDeteniendo.", COLORS.red);
  }

  off() {
    console.log("Reproductor de Video: %cDeteniendo.", COLORS.white);
  }
}

class PopcornMaker {
  poppingOn() {
    console.log("Máquina de Palomitas: Encendiendo máquina de palomitas.");
  }
  poppingOff() {
    console.log("Máquina de Palomitas: Apagando máquina de palomitas.");
  }
}

interface HomeTheaterOptions {
  projector: Projector;
  soundSystem: SoundSystem;
  videoPlayer: VideoPlayer;
  popcornMaker: PopcornMaker;
}

class HomeTheaterSystem {
  private projector: Projector;
  private soundSystem: SoundSystem;
  private videoPlayer: VideoPlayer;
  private popcornMaker: PopcornMaker;
  constructor({
    projector,
    soundSystem,
    videoPlayer,
    popcornMaker,
  }: HomeTheaterOptions) {
    this.projector = projector;
    this.soundSystem = soundSystem;
    this.videoPlayer = videoPlayer;
    this.popcornMaker = popcornMaker;
  }
  watchMovie(movie: string) {
    console.log(`\n%cIniciando la película ${movie}...`, COLORS.cyan);

    this.projector.turnOn();
    this.soundSystem.on();
    this.videoPlayer.on();
    this.videoPlayer.play(movie);
    this.popcornMaker.poppingOn();

    console.log(`Película ${movie} lista para disfrutar.\n`);
  }
  endWatchingMovie() {
    console.log(`\n%cFinalizando la película...`, COLORS.red);

    this.projector.turnOff();
    this.soundSystem.off();
    this.videoPlayer.stop();
    this.videoPlayer.off();
    this.popcornMaker.poppingOff();

    console.log(`Película finalizada.\n`);
  }
}

(() => {
  const projector = new Projector();
  const soundSystem = new SoundSystem();
  const videoPlayer = new VideoPlayer();
  const popcornMaker = new PopcornMaker();

  const pelicula = new HomeTheaterSystem({
    projector,
    soundSystem,
    videoPlayer,
    popcornMaker,
  });
  pelicula.watchMovie("The Lord of the Rings");
  pelicula.endWatchingMovie();
})();
