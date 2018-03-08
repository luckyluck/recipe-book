import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Globals } from './shared/globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(private globals: Globals) {}
    ngOnInit() {
        // Initialize Firebase
        firebase.initializeApp(this.globals.FIREBASE_CONFIG);
    }
}
