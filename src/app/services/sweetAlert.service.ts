import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }
  // Método para mostrar una alerta de éxito
  success(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message
    });
  }

  // Método para mostrar una alerta de error
  error(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message
    });
  }

  // Método para mostrar una alerta de advertencia
  warning(message: string) {
    Swal.fire({
      icon: 'warning',
      title: 'Warning',
      text: message
    });
  }

  // Método para mostrar una alerta de información
  info(message: string) {
    Swal.fire({
      icon: 'info',
      title: 'Info',
      text: message
    });
  }

  successThen(message: string):Promise<void> {
    return Swal.fire({
      icon: 'success',
      text: message,
      confirmButtonText: 'OK'
    }).then((result) => {
        if (result.isConfirmed) {
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      });
  }

  mensajeOKEspera(message: string): Promise<void> {
    return new Promise((resolve) => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didClose: () => {
          resolve(); // Resuelve la promesa cuando se cierra el cuadro de diálogo
        }
      });
    });
  }
  
}