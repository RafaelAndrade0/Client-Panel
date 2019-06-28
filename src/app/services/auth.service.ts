import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private fireAuth: AngularFireAuth) {}

  login(email: string, password: string) {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  // Return the actual user logged in
  getAuth(): Observable<firebase.User> {
    return this.fireAuth.authState.pipe(map(auth => auth));
  }
}
