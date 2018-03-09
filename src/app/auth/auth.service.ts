import * as firebase from 'firebase';

export class AuthService {

    signupUser(email: string, password: string) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }

    signinUser(email: string, password: string) {
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                response => {
                    console.log(response);
                }
            )
            .catch(
                error => {
                    console.log(error);
                }
            );
    }

}
