import { COLORS } from "../helpers/colors.ts";

/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 *
 */
class CodeEditorState {
  readonly content: string;
  readonly cursorPosition: number;
  readonly unsavedChanges: boolean;
  constructor(
    content: string,
    cursorPosition: number,
    unsavedChanges: boolean
  ) {
    this.content = content;
    this.cursorPosition = cursorPosition;
    this.unsavedChanges = unsavedChanges;
  }

  copyWith({content, cursorPosition, unsavedChanges}:Partial<CodeEditorState>): CodeEditorState {
    //! se uso Nullish coalescing operator (??) para asignar el valor de las propiedades en caso de que el operador de la izquierda sea null o undefined
    return new CodeEditorState(this.content ?? content, this.cursorPosition ?? cursorPosition, this.unsavedChanges ?? unsavedChanges);
  }

  displayState() {
    console.log(`\n%cEstado del Editor: `, COLORS.green);
    console.log(
      `Contenido: ${this.content} Cursor: ${this.cursorPosition} Unsaved Changes: ${this.unsavedChanges} `
    );
  }
}

class CodeEditorHistory {
    private history: CodeEditorState[]=[]
    private currentIndex: number=-1

    save(state: CodeEditorState) : void{
        //antes de grabar borramos el historial de states
        if (this.currentIndex < this.history.length) {
            this.history.splice(0,this.currentIndex +1)
        }
        this.history.push(state)
        this.currentIndex++
    }
    reado(): CodeEditorState | null{
        if (this.currentIndex < this.history.length -1) {
            this.currentIndex++
            return this.history[this.currentIndex]
        }
        return null
    }
    
}