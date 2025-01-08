import { COLORS } from "../helpers/colors.ts";

/**
 * ! Patrón mediator
 * Es un patrón de diseño de comportamiento que ayuda a reducir
 * las dependencias desordenadas entre objetos.
 * Este patrón limita la comunicación directa entre ellos,
 * haciendo que solo interactúen a través de un objeto mediador.
 *
 * * Es útil reducir la complejidad de las relaciones entre objetos
 *
 * https://refactoring.guru/es/design-patterns/mediator
 */
class ChatRoom {
  private users: User[] = [];
  public title: string;

  constructor(title: string) {
    this.title = title;
  }

  addUseruser(user: User) {
    this.users.push(user);
  }

  sendMessage(sender: User, message: string): void {
    //excluir al usuario que envia el mensaje para que no le llegue el mismo mensaje
    // const usersToSend = this.users.filter((user) => user !== sender);
    // for (const user of usersToSend) {
    //   //todo
    //   user.receiveMessage(sender, message);
    // }
    //! Otra manera de hacerlo con el foreach encadenado
    this.users.filter((user) => user !== sender).forEach(user =>user.receiveMessage(sender,message))
  }
}
class User {
  private username: string;
  private chatRoom: ChatRoom;
  constructor(username: string, chatroom: ChatRoom) {
    this.username = username;
    this.chatRoom = chatroom;
    //chatroom.addUseruser(this)
    this.chatRoom.addUseruser(this)
  }

  sendMessage(message: string): void {
    console.log(
      `%c${this.username} envia ${message}`,
      COLORS.blue,
      COLORS.white
    );
    this.chatRoom.sendMessage(this,message)
  }

  receiveMessage(sender: User, message: string): void {
    console.log(
      `%c${this.username} recibe de ${sender.username} %c${message}`,
      COLORS.blue,
      COLORS.white
    );
  }
}

(()=>{
    const chatRoom=new ChatRoom('Grupo de trabajo');

    const user1=new User('Fernando', chatRoom)
    const user2=new User('Gaston', chatRoom)
    const user3=new User('Mariangel', chatRoom)

    user1.sendMessage(`Hola a todos.`)
    user2.sendMessage(`Hola Fernando, Como estas ?`)
    user3.sendMessage(`Hola Fernando, Gaston, Como estan ?`)
    console.log(`\n\n`)
})()