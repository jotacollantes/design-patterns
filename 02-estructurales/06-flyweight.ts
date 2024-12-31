import { COLORS } from "../helpers/colors.ts";

/**
 * ! Patrón Flyweight
 * Es un patrón de diseño estructural que nos permite usar objetos compartidos
 * para soportar eficientemente grandes cantidades de objetos.
 *
 * * Es útil cuando necesitamos una gran cantidad de objetos y queremos reducir
 * * la cantidad de memoria que utilizan.
 *
 * https://refactoring.guru/es/design-patterns/flyweight
 */
interface Location {
  display(coordinates: { x: number; y: number }): void;
}
//Clase flightway
class LocationIcon implements Location {
  private type: string;//Escuela, hospital,parque
  private iconImage: string; //Imagen del costructor
  
  constructor(type: string, iconImage: string) {
    this.type = type;
    this.iconImage = iconImage;
  }
  display(coordinates: { x: number; y: number }): void {
    console.log(
      `Coords: ${this.type} en (${coordinates.x}, ${coordinates.y}) con icono %c${this.iconImage}`,
      COLORS.green
    );
  }
}
//Fabrica de Flyweights
// {
//     escuela: assets/school.png,
//     hospital: assets/hospital.png,
// }

class LocationFactory {
  //private iconsx { [key: string]: LocationIcon } = {};
  private icons: Record<string, LocationIcon> = {};
  //Escuela, hospital,parque
  getLocationIcon(type: string): LocationIcon {
    if (!this.icons[type]) {
      console.log(`%cCreando una nueva del icono de ${type}`,COLORS.red);
      //Si no existe el tipo de imgen la crea
      const iconImages = `imagen_de_${type.toLowerCase()}.png`;
      this.icons[type] = new LocationIcon(type, iconImages);
    }
    return this.icons[type];
  }
}

class MapLocation {
  private coordinates: { x: number; y: number };
  private icon: LocationIcon;
  
  constructor(x: number, y: number, icon: LocationIcon) {
    this.coordinates = { x, y };
    this.icon = icon;
  }

  display() {
    this.icon.display(this.coordinates);
  }
}

function main() {
  const factory = new LocationFactory();
  const locations = [
    new MapLocation(1, 2, factory.getLocationIcon("Hospital")),
    new MapLocation(10, 20, factory.getLocationIcon("Escuela")),
    new MapLocation(20, 30, factory.getLocationIcon("Hospital")),
    new MapLocation(30, 40, factory.getLocationIcon("Escuela")),
    new MapLocation(15, 25, factory.getLocationIcon("Parque")),
    new MapLocation(10, 20, factory.getLocationIcon("Escuela")),
  ];
  locations.forEach((location) => location.display());
}
main();
