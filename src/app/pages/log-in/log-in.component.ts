import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { NgIf } from '@angular/common';
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
import { RouterModule, Router } from '@angular/router';
import { AuthService, Credential } from '../../services/auth.service';
import { AlertService } from '../../services/sweetAlert.service';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

interface LogInForm{
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, RouterModule, ReactiveFormsModule, NgIf],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export default class LogInComponent implements OnInit {
  hide = true;
  private router = inject(Router)
  public miObservable: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private authService = inject(AuthService);
  private _sweet= inject(AlertService);

  constructor(private firestore: Firestore) {
    this.miObservable.subscribe((res) => {
      console.log("Se ha logueado el usuario: " + res);
    })
  }

  formBuilder = inject(FormBuilder);
  form: FormGroup<LogInForm> = this.formBuilder.group({
    email: this.formBuilder.control('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: this.formBuilder.control('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  get isEmailValid(): string | boolean {
    const control = this.form.get('email');

    const isInvalid = control?.invalid && control.touched;

    if (isInvalid){
      return control.hasError('required') ? 'Debe ingresar un mail' : 'Ingrese un mail valido';
    }

    return false;
  }

  async logIn(): Promise<void>{ 
  if(this.form.invalid) return;

    const credential: Credential = {
      email: this.form.value.email || '',
      password: this.form.value.password || ''
    };

    await this.authService.logInWithEmailAndPassword(credential).then( () =>{
      this._sweet.successThen('Bienvenido').then(()=>{
        let col = collection(this.firestore, 'usuariosLogeados');
        addDoc(col, { fecha: new Date(), mail: credential.email})
        this.router.navigateByUrl('/')
      })
    }).catch((e) => {
        this._sweet.warning('La cuenta no está registrada')
        console.log(e)
    });
  }

  rellenarDatos(){
    this.form.patchValue({
      email: 'julian@test.com',
      password: 'asasas'
    })
  }

  ngOnInit(): void {
    
  }

  OnDestroy() {
    this.miObservable.unsubscribe();
  }

}