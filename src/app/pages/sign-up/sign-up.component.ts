import { Component, inject } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { RouterModule, Router } from '@angular/router';
import { AuthService, Credential } from '../../services/auth.service';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { AlertService } from '../../services/sweetAlert.service';

interface SingUpForm {
  names: FormControl<string>;
  lastname: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule, RouterModule, NgIf, MatSnackBarModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export default class SignUpComponent {
  hide = true;
  public miObservable: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private authService = inject(AuthService);
  private _router = inject(Router);
  public Serror: string = "";
  private _sweet= inject(AlertService);

  constructor(private firestore: Firestore) {
    this.miObservable.subscribe((res) => {
      console.log("Se ha logueado el usuario: " + res);
    })
  }

  formBuilder = inject(FormBuilder);

  form: FormGroup<SingUpForm> = this.formBuilder.group({
    names: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    lastname: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    email: this.formBuilder.control('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    })
  })

  get isEmailValid(): string | boolean {

    const control = this.form.get('email');
    const isInvalid = control?.invalid && control.touched;

    if (isInvalid) {
      return control.hasError('required') ? 'Debe ingresar un mail' : 'Ingrese un mail valido';
    }

    return false;
  }

  async signUp(): Promise<void> {
    if (this.form.invalid) return;

    const credential: Credential = {
      email: this.form.value.email || "",
      password: this.form.value.password || "",
    };

    await this.authService.signUpWithEmailAndPassword(credential).then( () =>{

      //Registro correcto
      let col = collection(this.firestore, 'usuarios');
      addDoc(col, { apellido: this.form.value.lastname, fechaRegistro: new Date(), email: credential.email, nombre: this.form.value.names })

      this._sweet.successThen('Cuenta registrada').then(()=>{
        this._router.navigateByUrl('/');
      })

    }).catch((e) =>{
      //Error
      switch(e.code){
        case "auth/email-already-in-use":
          this._sweet.warning('El mail ya se cuentra registrado, intente otro mail')
          break;
        default:
          console.log(e.error);
          break;
      }
    });
  }

}