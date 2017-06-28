import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseProvider {

	constructor() {
		let config = {
			apiKey: "AIzaSyD9YmVYDpRgRaPYKU0Lq-EU8itEeB5gMpY",
	    authDomain: "lucasoliveiraalves-lista-4-bd.firebaseapp.com",
	    databaseURL: "https://lucasoliveiraalves-lista-4-bd.firebaseio.com",
	    projectId: "lucasoliveiraalves-lista-4-bd",
	    storageBucket: "lucasoliveiraalves-lista-4-bd.appspot.com",
	    messagingSenderId: "131182106297"
		};
		firebase.initializeApp(config);
	}

    database() {
        return firebase.database();
    }

    auth() {
        return firebase.auth();
    }

}
