/**
 * ! Patrón Prototype:

 * Es un patrón de diseño creacional que nos permite copiar objetos existentes sin hacer
 * que el código dependa de sus clases.
 * 
 * * Es útil cuando queremos duplicar el contenido, 
 * * el título y el autor de un documento, por ejemplo o cualquier objeto complejo.
 * 
 * https://refactoring.guru/es/design-patterns/prototype
 */
class Document {
    public title: string;
    private content: string;
    public author:string;
    constructor(title:string, content:string, author:string){ 
        this.title = title;
        this.content = content;
        this.author = author;
    }
    
    dispalyInfo() {
        console.log(`Title: ${this.title}, Content: ${this.content}, Author: ${this.author}`);
    }
    clone():Document{
        return new Document(this.title, this.content, this.author)
    }
}
(()=>{
    const document1= new Document('Document 1', 'Content 1', 'Author 1');
    console.log({document1})
    document1.dispalyInfo();
    //const document2={...document1}
    //const document2=structuredClone(document1)
    const document2=document1.clone()
    document2.title='Nueva contizacion'
    console.log({document2})
    document2.dispalyInfo()
    

})()