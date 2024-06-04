import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { RouterModule } from '@angular/router';
import { Firestore, addDoc, collection, getDocs, orderBy, query } from '@angular/fire/firestore';
import { especialista } from '../../clases/especialista';

interface especialistaForm {
  nombre: FormControl<string>;
  apellido: FormControl<string>;
  edad: FormControl<number>;
  dni: FormControl<number>;
  especialidad: FormControl<string>;
  mail: FormControl<string>;
  password: FormControl<string>;
  img1: FormControl<string>;
}

interface pacienteForm {
  nombre: FormControl<string | "">;
  apellido: FormControl<string | "">;
  edad: FormControl<number | 0>;
  dni: FormControl<number | 0>;
  obraSocial: FormControl<string | "">;
  mail: FormControl<string | "">;
  password: FormControl<string | "">;
  img1: FormControl<string | "">;
  img2: FormControl<string | "">;
}

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [MatSelectModule, MatSelectModule, MatSnackBarModule, ReactiveFormsModule, MatFormFieldModule, ReactiveFormsModule, NgIf, NgFor, MatButtonModule, MatIconModule, MatInputModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export default class RegistroComponent {
  tiposPeliculas = [
    { value: 0, viewValue: 'Especialista'},
    { value: 1, viewValue: 'Paciente'}
  ]
  Especialista: especialista;

  selectedTipo: number = 0;
  constructor(private firestore: Firestore ) {
    this.Especialista = new especialista(0,"","",0,0,"","","","")
  }

  formBuilder = inject(FormBuilder);
  formGroup1: FormGroup<especialistaForm> = this.formBuilder.group({
    nombre: this.formBuilder.control('', {
      validators: [Validators.required],
      nonNullable: true
    }),
    apellido: this.formBuilder.control('', {
      validators: [Validators.required],
      nonNullable: true
    }),
    edad: this.formBuilder.control(0, {
      validators: [Validators.required],
      nonNullable: true
    }),
    dni: this.formBuilder.control(0, {
      validators: [Validators.required],
      nonNullable: true
    }),
    especialidad: this.formBuilder.control('', {
      validators: [Validators.required],
      nonNullable: true
    }),
    mail: this.formBuilder.control('', {
      validators: [Validators.required],
      nonNullable: true
    }),
    password: this.formBuilder.control('', {
      validators: [Validators.required],
      nonNullable: true
    }),
    img1: this.formBuilder.control('', {
      validators: [Validators.required],
      nonNullable: true
    })
  });

  formGroup2: FormGroup<pacienteForm> = this.formBuilder.group({
    nombre: this.formBuilder.control<string>('', {
      validators: [Validators.required],
      nonNullable: true
    }),
    apellido: this.formBuilder.control<string>('', {
      validators: [Validators.required],
      nonNullable: true
    }),
    edad: this.formBuilder.control<number>(0, {
      validators: [Validators.required],
      nonNullable: true
    }),
    dni: this.formBuilder.control<number>(0, {
      validators: [Validators.required],
      nonNullable: true
    }),
    obraSocial: this.formBuilder.control<string>('', {
      validators: [Validators.required],
      nonNullable: true
    }),
    mail: this.formBuilder.control<string>('', {
      validators: [Validators.required],
      nonNullable: true
    }),
    password: this.formBuilder.control<string>('', {
      validators: [Validators.required],
      nonNullable: true
    }),
    img1: this.formBuilder.control<string>('', {
      validators: [Validators.required],
      nonNullable: true
    }),
    img2: this.formBuilder.control<string>('', {
      validators: [Validators.required],
      nonNullable: true
    })
  });

  get isEmailValid(): string | boolean {
    const control = this.formGroup1.get('mail');
    const isInvalid = control?.invalid && control.touched;
    if (isInvalid){
      return control.hasError('required') ? 'Debe ingresar un mail' : 'Ingrese un mail valido';
    }
    return false;
  }

  onTipoChange(tipo: number) {
    this.selectedTipo = tipo;
  }

  async subirEspecialista(){
    if(this.formGroup1.invalid) return;
    
    this.Especialista.nombre = this.formGroup1.value.nombre || '',
    this.Especialista.apellido = this.formGroup1.value.apellido || '',
    this.Especialista.edad = this.formGroup1.value.edad || 0,
    this.Especialista.dni = this.formGroup1.value.dni || 0,
    this.Especialista.especialidad = this.formGroup1.value.especialidad || '',
    this.Especialista.mail = this.formGroup1.value.mail || '',
    this.Especialista.password = this.formGroup1.value.password || '',
    this.Especialista.img1 = this.formGroup1.value.img1 || ''

    let col = collection(this.firestore, 'especialistas');
    await addDoc(col, {
      // id: this.actor.id,
      // nombre : this.actor.nombre,
      // apellido: this.actor.apellido,
      // alias: this.actor.alias,
      // mailContacto: this.actor.mailContacto,
      // fechaNacimiento: this.form.value.fechaNacimiento ? this.formatDate(this.form.value.fechaNacimiento) : '',
      // fechaFallecimiento: this.actor.fechaFallecimiento ? this.formatDate(this.form.value.fechaFallecimiento) : '',
      // pais: this.actor.pais
    }).then( () => {
      // this.snackbar.snackbarOK("Actor dado de alta!")
      this.formGroup1.reset({
        // nombre: '',
        // apellido: '',
        // alias: '',
        // mailContacto: '',
        // fechaNacimiento: '',
        // fechaFallecimiento: ''
      });
    }).catch((e) =>{
      // this.snackbar.snackbarOK("Error: " + e)
      console.log(e)
    });

  }

  subirPaciente(){}
}
