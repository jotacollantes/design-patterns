/**
 * ! Patrón Composite
 * Es un patrón de diseño estructural que permite componer objetos
 * en estructuras de árbol para representar jerarquías.
 *
 * El patrón permite a los clientes tratar de manera uniforme a los objetos
 * individuales y a sus composiciones.
 *
 * * Es útil cuando necesitas tratar a los objetos individuales
 * * y a sus composiciones de manera uniforme, y la estructura
 * * de los objetos forma una jerarquía en árbol.
 *
 * https://refactoring.guru/es/design-patterns/composite
 *
 */
interface FileSystemComponent {
  showDetails(ident?: string): void;
}

class File implements FileSystemComponent {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }
  showDetails(ident?: string): void {
    console.log(`${ident}- Archivo: ${this.name}`);
  }
}

class Folder implements FileSystemComponent{

    private name: string;
    private contents: FileSystemComponent[] = [];
    
    constructor(name: string) {
        this.name = name;
    }
  //Se puede usar de tipo File|Folder o FileSystemComponent
  add(content: File|Folder): void {
    this.contents.push(content);
  }
  showDetails(ident: string=''): void {
    console.log(`${ident}+ Carpeta: ${this.name}`);
    this.contents.forEach((content)=>content.showDetails(ident + ' '))
  }
}

(()=>{
    const file1 = new File('file1.txt');
    const file2 = new File('file2.txt');
    const file3 = new File('file3.txt');
    const file4 = new File('file4.txt');
    const file5 = new File('file5.txt');
    const file6 = new File('file6.txt');
    const file7 = new File('file7.txt');

    const folder1 = new Folder('folder1');
    const folder2 = new Folder('folder2');
    const folder3 = new Folder('folder3');

    folder1.add(file1);
    folder1.add(file2);
    folder1.add(file3);

    folder2.add(file4);
    folder2.add(file5);

    folder3.add(file6);
    folder3.add(file7);

    const mainFolder = new Folder('mainFolder');
    mainFolder.add(folder1);
    mainFolder.add(folder2);
    mainFolder.add(folder3);

    mainFolder.showDetails();
})()
