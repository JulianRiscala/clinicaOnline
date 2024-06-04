import { Injectable, inject } from '@angular/core';
import {
  Auth,
  User,
  UserCredential,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  user,
} from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

export interface Credential {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private auth: Auth = inject(Auth);
  public currentUserSubject: BehaviorSubject<User | null>

  constructor(auth: Auth){
    this.auth = auth
    this.currentUserSubject = new BehaviorSubject <User | null> (null);

    authState(this.auth).subscribe((user: User | null) =>{
      this.currentUserSubject.next(user);
    });
  }

  get currentUserValue(): User | null{
    return this.currentUserSubject.value;
  }

  readonly authState$ = authState(this.auth);
  signUpWithEmailAndPassword(credential: Credential): Promise<UserCredential> {
    return createUserWithEmailAndPassword(
      this.auth,
      credential.email,
      credential.password
    ).catch((error) =>{
      throw error;
    });
  }

  logInWithEmailAndPassword(credential: Credential): Promise<any> {
    return signInWithEmailAndPassword(
      this.auth,
      credential.email,
      credential.password
    ).catch((error) =>{
      throw error
    });
  }

  logOut(): Promise<void> {
    return this.auth.signOut();
  }

}