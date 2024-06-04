export class especialista {
    id:number;
    nombre: string;
    apellido: string;
    edad: number;
    dni: number;
    especialidad: string;
    mail: string;
    password: string;
    img1: string;

    constructor(id: number, nombre: string, apellido: string, edad: number, dni: number, especialidad: string,
                mail: string, password: string, img1: string){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.dni = dni;
        this.especialidad = especialidad;
        this.mail = mail;
        this.password = password;
        this.img1 = img1
    }
}