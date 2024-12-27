import { COLORS } from "../helpers/colors.ts";
/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 *
 */
interface Hamburger {
  prepare(): void;
}

class ChickenHamburger implements Hamburger {
  prepare(): void {
   console.log("Preparando hamburguesa de %cpollo", COLORS.yellow);
  }
}

class BeefHamburger implements Hamburger {
  prepare(): void {
    console.log("Preparando hamburguesa de %ccarne", COLORS.red);
  }
}

class BeanHamburger implements Hamburger {
  prepare(): void {
    console.log("Preparando hamburguesa de %cbean", COLORS.red);
  }
}

//La clase abstract no se instancia sino que se hereda
abstract class Restaurant {
  //Creamos un metodo abstracto
  //Con protected se asegura que solo las clases hijas puedan acceder a este metodo.
  protected abstract createHamburger(): Hamburger;
  orderHambuger() {
    const hamburguer = this.createHamburger();
    hamburguer.prepare();
  }
}

class ChickenRestaurant extends Restaurant {
  //Sobre escribimos el metodo createHamburger de la clase padre abstracta con el metodo createHamburger
  override createHamburger(): Hamburger {
    return new ChickenHamburger();
  }
}

class BeefRestaurant extends Restaurant {
  //Sobre escribimos el metodo createHamburger de la clase padre abstracta con el metodo createHamburger
  override createHamburger(): Hamburger {
    return new BeefHamburger();
  }
}

class BeanRestaurant extends Restaurant {
  //Sobre escribimos el metodo createHamburger de la clase padre abstracta con el metodo createHamburger
  override createHamburger(): Hamburger {
    return new BeanHamburger();
  }
}

(() => {
  let restaurante: Restaurant;
  const burgerType = prompt("Que hamburguesa desea? (chicken/beef/bean)");
  switch (burgerType) {
    case "chicken":
      restaurante = new ChickenRestaurant();
      break;
    case "beef":
      restaurante = new BeefRestaurant();
      break;
    case "bean":
      restaurante = new BeanRestaurant();
      break;
    default:
      throw new Error("Tipo de hamburguesa no soportado");
  }
  restaurante.orderHambuger();
})();
