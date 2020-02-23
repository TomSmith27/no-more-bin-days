import firebase from '@/firebase/firebase';
import { CollectionReference, DocumentData } from '@firebase/firestore-types';
import { Shop } from '@/features/shops/Shop';

export default class ShopsService {
  shopsCollection: CollectionReference<DocumentData>;

  constructor() {
    this.shopsCollection = firebase.collection('places');
  }
  async get(): Promise<Shop[]> {
    return (await this.shopsCollection.get()).docs.map(d => {
      let shopData = d.data() as Shop;
      return { id: d.id, ...shopData };
    });
  }
  async getById(id: string): Promise<Shop> {
    return { id: id, ...((await this.shopsCollection.doc(id).get()).data() as Shop) };
  }

  async add(shop: Shop) {
    await this.shopsCollection.add(shop);
  }

  async update(id: string, shop: Shop) {
    await this.shopsCollection.doc(id).update(shop);
  }

  async delete(id: string) {
    await this.shopsCollection.doc(id).delete();
  }
}
