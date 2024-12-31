import { COLORS } from '../../helpers/colors.ts';

// TODO: Implementar el LocalLogger Class
export  class LocalLogger {
    private file:string
    constructor(file:string) {
        this.file = file
    }

    writeLog(msg:string){
        console.log(`[${this.file} Log] ${msg}`);
    }

    writeError(msg:string):void{
        console.log(`[${this.file} Error] %c${msg}`,COLORS.red);
    }

    writeWarning(msg:string):void{
        console.log(`[${this.file} Warning] %c${msg}`,COLORS.yellow);
    }
}