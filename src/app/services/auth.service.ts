import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  async register({ email, password }: { email: string, password: string }) {
    return await createUserWithEmailAndPassword(this.auth, email, password);
  }

  async login({ email, password }: { email: string, password: string }) {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth)
  }
}
