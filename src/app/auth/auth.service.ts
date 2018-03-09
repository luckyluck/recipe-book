import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    token: string;

    constructor(private router: Router) {}

    signupUser(email: string, password: string) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }

    signinUser(email: string, password: string) {
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                response => {
                    firebase.auth().currentUser.getIdToken()
                        .then(
                            (token: string) => {
                                this.token = token;
                            }
                        );
                    this.router.navigate(['/']);
                }
            )
            .catch(
                error => {
                    console.log(error);
                }
            );
    }

    logout() {
        firebase.auth().signOut();
        this.token = undefined;
    }

    // Firebase will check if the token is valid or not and/or return new one
    getToken() {
        firebase.auth().currentUser.getIdToken()
            .then(
                (token: string) => {
                    this.token = token;
                }
            );

        return this.token;
    }

    isAuthenticated() {
        return this.token !== undefined;
    }

}
