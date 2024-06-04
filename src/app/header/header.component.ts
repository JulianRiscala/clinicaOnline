import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/sweetAlert.service';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatButtonModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  private _router = inject (Router)
  private authservice = inject(AuthService);
  private _sweet= inject(AlertService);
  currentUser: string | null | undefined;

  ngOnInit(): void {
    this.authservice.authState$.subscribe((user: { email: string | null | undefined; }) =>{
      this.currentUser = user ? user.email : null
    })
  }

  async logOut(): Promise<void> {
    try {
      await this.authservice.logOut();
      await this._sweet.mensajeOKEspera('Deslogeado')
      this._router.navigateByUrl('/')
    } catch (error) {
      console.log(error);
    }
  }

  async logIn():Promise<void>{
  }

  usuario(){
    const currentUser = this.authservice.currentUserValue?.email;
    console.log(currentUser);
  }
}
