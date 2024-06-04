import { Component, inject, OnInit, OnDestroy} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export default class HomeComponent {
  private _router = inject(Router)
  private _snackbar = inject (MatSnackBar);
  private authservice = inject(AuthService);

  async logOut(): Promise<void> {
    try {
      await this.authservice.logOut();

       const snackBarRef = this.openSnackBar();

      snackBarRef.afterDismissed().subscribe(() => {
        this._router.navigateByUrl('/auth/log-in');
      })
    } catch (error) {
      console.log(error);
    }
  }

  async logIn():Promise<void>{
    
  }

  openSnackBar(){
    return this._snackbar.open('chau chau', 'Close',{
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'end'
    });
  }
}