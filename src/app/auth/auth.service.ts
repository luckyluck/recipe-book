import * as firebase from 'firebase';

export class AuthService {
    token: string;

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
