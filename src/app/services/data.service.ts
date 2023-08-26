import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Timestamp } from '@firebase/firestore';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
// import {admin}
// import { collection } from '@firebase/firestore';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private firestore: Firestore, private afs: AngularFirestore) {}
  getEvents() {
    const events = collection(this.firestore, 'events');
    const eve = this.afs.collection('events');
    return eve;
  }

  getEventOnDate(date: any[] = ['2023-08-25']) {
    return this.afs.collection('events', (ref) => {
      return ref.where('date', 'in', date);
    });
  }
}
