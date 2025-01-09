/**
 * !Patrón Visitor
 *
 * El patrón Visitor es un patrón de diseño de comportamiento
 * que te permite separar algoritmos de los objetos sobre
 * los que operan.
 *
 * * Es útil cuando necesitas añadir nuevas operaciones a
 * * clases estables sin cambiar su código.
 *
 * https://refactoring.guru/es/design-patterns/visitor
 */

import { COLORS } from "../helpers/colors.ts";

/**
 * Contexto: Imagina que estás diseñando un sistema para un parque
 * temático con diferentes tipos de atracciones:
 * montañas rusas, casas del terror y ruedas de la fortuna.
 *
 * Cada atracción tiene su propio precio de entrada y ofrece un descuento
 * dependiendo del tipo de visitante (niño, adulto o adulto mayor).
 *
 * Aquí es donde entra el patrón Visitor, que permite aplicar operaciones
 * específicas (como calcular el precio con descuento) dependiendo tanto
 * de la atracción como del tipo de visitante,
 * sin modificar las clases originales.
 */
interface Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void;
  visitHauntedHouse(hauntedHouse: HauntedHouse): void;
  visitFerrisWheel(ferrisWheel: FerrisWheel): void;
}

interface Attraction {
  accept(visitor: Visitor): void;
  getPrice(): number;
  getName(): string;
}

//Atracciones

class RollerCoaster implements Attraction {
  private price: number = 10;
  private name: string = "Montana Rusa";
  getName(): string {
    return this.name;
  }
  getPrice() {
    return this.price;
  }
  accept(visitor: Visitor): void {
    visitor.visitRollerCoaster(this);
  }
}

class HauntedHouse implements Attraction {
  private price: number = 15;
  private name: string = "Casa del Terror";
  getName(): string {
    return this.name;
  }
  getPrice() {
    return this.price;
  }
  accept(visitor: Visitor): void {
    visitor.visitHauntedHouse(this);
  }
}

class FerrisWheel implements Attraction {
  private price: number = 30;
  private name: string = "Rueda de la fortuna";
  getName(): string {
    return this.name;
  }
  getPrice() {
    return this.price;
  }
  accept(visitor: Visitor): void {
    visitor.visitFerrisWheel(this);
  }
}

//Visitors

class ChildVisitor implements Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(
      `Nino en montana Rusa: Precio con descuento: $${
        rollerCoaster.getPrice() - rollerCoaster.getPrice() * 0.5
      }`
    );
  }
  visitHauntedHouse(hauntedHouse: HauntedHouse): void {
    console.log(
      `Nino en casa del terror: Precio con descuento: $${
        hauntedHouse.getPrice() - hauntedHouse.getPrice() * 0.7
      }`
    );
  }
  visitFerrisWheel(ferrisWheel: FerrisWheel): void {
    console.log(
      `Nino en la rueda de la fortuna: Precio con descuento: $${
        ferrisWheel.getPrice() - ferrisWheel.getPrice() * 0.6
      }`
    );
  }
}

class AdultVisitor implements Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(
      `Adulto en montana Rusa: Precio con descuento: $${rollerCoaster.getPrice()}`
    );
  }
  visitHauntedHouse(hauntedHouse: HauntedHouse): void {
    console.log(
      `Adulto en casa del terror: Precio con descuento: $${hauntedHouse.getPrice()}`
    );
  }
  visitFerrisWheel(ferrisWheel: FerrisWheel): void {
    console.log(
      `Adulto en la rueda de la fortuna: Precio con descuento: $${ferrisWheel.getPrice()}`
    );
  }
}

class SeniorVisitor implements Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(
      `Senior en montana Rusa: Precio con descuento: $${
        rollerCoaster.getPrice() - rollerCoaster.getPrice() * 0.85
      }`
    );
  }
  visitHauntedHouse(hauntedHouse: HauntedHouse): void {
    console.log(
      `Senior en casa del terror: Precio con descuento: $${
        hauntedHouse.getPrice() - hauntedHouse.getPrice() * 0.85
      }`
    );
  }
  visitFerrisWheel(ferrisWheel: FerrisWheel): void {
    console.log(
      `Senior en la rueda de la fortuna: Precio con descuento: $${
        ferrisWheel.getPrice() - ferrisWheel.getPrice() * 0.85
      }`
    );
  }
}

(() => {
  const attractions: Attraction[] = [
    new RollerCoaster(),
    new HauntedHouse(),
    new FerrisWheel(),
  ];

  console.log(`\n%cPrecios referenciales:`, COLORS.red);
  attractions.forEach((attraction) =>
    console.log(`Atraccion ${attraction.getName()}: ${attraction.getPrice()}`)
  );
  console.log(`\n%cVisitante Nino`, COLORS.green);
  const childVisitor = new ChildVisitor();
  attractions.forEach((attraction) => attraction.accept(childVisitor));

  console.log(`\n%cVisitante Adulto`, COLORS.orange);
  const adultVisitor = new AdultVisitor();
  attractions.forEach((attraction) => attraction.accept(adultVisitor));

  console.log(`\n%cVisitante Senior`, COLORS.orange);
  const seniorVisitor = new SeniorVisitor();
  attractions.forEach((attraction) => attraction.accept(seniorVisitor));
})();
