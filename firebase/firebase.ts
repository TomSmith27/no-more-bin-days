import * as firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/analytics';
import 'firebase/firestore';
import 'firebase/performance';
let firebaseConfig = {};
if (!firebase.apps.length) {
	if (process.env.NODE_ENV == 'development') {
		firebaseConfig = {
			apiKey: 'AIzaSyBL86-Tdgy08hGdTauUbF53_1qVPvIGrcE',
			authDomain: 'recycle-dev-7cf5f.firebaseapp.com',
			databaseURL: 'https://recycle-dev-7cf5f.firebaseio.com',
			projectId: 'recycle-dev-7cf5f',
			storageBucket: 'recycle-dev-7cf5f.appspot.com',
			messagingSenderId: '517490912042',
			appId: '1:517490912042:web:c113d543df4425d629cc53',
			measurementId: 'G-TBRGN9VP4J'
		};
	} else {
		firebaseConfig = {
			apiKey: 'AIzaSyDtlqeARjKr9xAENfapfqSb3s7iDq2WYMQ',
			authDomain: 'recycler-99415.firebaseapp.com',
			databaseURL: 'https://recycler-99415.firebaseio.com',
			projectId: 'recycler-99415',
			storageBucket: 'recycler-99415.appspot.com',
			messagingSenderId: '475097617401',
			appId: '1:475097617401:web:39d109085b3c8c5291a328',
			measurementId: 'G-FYRZ1GWRX2'
		};
	}
	// Your web app's Firebase configuration

	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
	if (process.client) {
		firebase.analytics();
		firebase.performance();
	}
}

export default firebase.firestore();
