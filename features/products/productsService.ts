import firebase from '@/firebase/firebase';
import { CollectionReference, DocumentData } from '@firebase/firestore-types';
import { Product } from './Product';

export default class ProductsService {
	productsCollection: CollectionReference<DocumentData>;

	constructor() {
		this.productsCollection = firebase.collection('products');
	}
	async getProducts(): Promise<Product[]> {
		return (await this.productsCollection.get()).docs.map((d) => {
			const data = d.data();
			return { id: d.id, name: data.name, category: data.category ?? null };
		});
	}
}
