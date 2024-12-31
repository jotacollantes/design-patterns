import { COLORS } from "../helpers/colors.ts";

/**
 * ! Patrón decorador
 * Es un patrón de diseño estructural que permite añadir
 * funcionalidades a objetos, colocando estos objetos dentro de
 * objetos encapsuladores especiales que contienen estas funcionalidades.
 *
 * No confundirlo con los decoradores de TypeScript que son anotaciones.
 *
 * * Es útil cuando necesitas añadir funcionalidades a objetos
 *  * de manera dinámica y flexible.
 *
 * https://refactoring.guru/es/design-patterns/decorator
 */
interface Notification {
  send(message: string): void;
}

class BasicNotification implements Notification {
  send(message: string): void {
    console.log(`Sending basic notification: %c${message}`, COLORS.blue);
  }
}
//Clase decoradora
abstract class NotificationDecorator implements Notification {
  protected notification: Notification;
  constructor(notification: Notification) {
    this.notification = notification;
  }

  send(message: string): void {
    this.notification.send(message);
  }
}
// Crear difertentyes decoradores
class EmailDecorator extends NotificationDecorator {
  private sendEmail(message: string) {
    console.log(`Enviando notificacion por correo %c${message}`, COLORS.green);
  }
  override send(message: string): void {
    //Enviamos la notificacion basica
    super.send(message);
    //Enviamos la notificacion anadida
    this.sendEmail(message);
  }
}

class SMSDecorator extends NotificationDecorator {
  private sendSMS(message: string) {
    console.log(`Enviando notificacion por SMS %c${message}`, COLORS.orange);
  }
  override send(message: string): void {
    //Enviamos la notificacion basica
    super.send(message);
    //Enviamos la notificacion anadida
    this.sendSMS(message);
  }
}

function main() {
  //Es de tipo Notificaction porque se la va a expandir con varios tipo sde notificaciones.
  let notification: Notification = new BasicNotification();
  notification = new EmailDecorator(notification);
  notification= new SMSDecorator(notification);
  notification.send("Mensaje de Alerta")
}
main()