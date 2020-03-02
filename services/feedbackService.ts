import firebase from '@/firebase/firebase';
import { CollectionReference, DocumentData } from '@firebase/firestore-types';
import { Feedback } from '~/features/feedback/Feedback';

export default class ShopsService {
	feedbackCollection: CollectionReference<DocumentData>;

	constructor() {
		this.feedbackCollection = firebase.collection('feedback');
	}

	async add(feedback: Feedback) {
		await this.feedbackCollection.add(feedback);
	}
}
