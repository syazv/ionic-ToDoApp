import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, where, query, orderBy, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore, private auth: Auth) { }

  async addTask(task: string) {
    const user = this.auth.currentUser;
    if (!user) {
      throw new Error('User not authenticated');
    }
    const tasksRef = collection(this.firestore, 'tasks');

    //Insert into the table
    await addDoc(tasksRef, {
      task,
      completed: false,
      createdAt: new Date(),
      userId: user.uid  
    });
  }

  getTasks(): Observable<any> {
    const user = this.auth.currentUser;
    if (!user) {
      throw new Error('User not authenticated');
    }
    const tasksRef = collection(this.firestore, 'tasks');
    const q = query(tasksRef, where('userId', '==', user.uid), orderBy('createdAt', 'desc'));
    return collectionData(q, { idField: 'id' });
  }

  async updateTask(id: string, completed: boolean) {
    const taskDocRef = doc(this.firestore, `tasks/${id}`);
    await updateDoc(taskDocRef, { completed });
  }

  async deleteTask(id: string) {
    const taskDocRef = doc(this.firestore, `tasks/${id}`);
    await deleteDoc(taskDocRef);
}

}
