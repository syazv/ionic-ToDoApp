import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Default to add
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';

//Firestore
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

// Auth
import { provideAuth, getAuth } from '@angular/fire/auth';

//Cloud storage
import { getStorage } from 'firebase/storage';
import { provideStorage } from '@angular/fire/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCU_bTRcZVkSUwOmvGERPOunZTNxzmt4PQ",
  authDomain: "todo-app-class-3c94b.firebaseapp.com",
  projectId: "todo-app-class-3c94b",
  storageBucket: "todo-app-class-3c94b.appspot.com",
  messagingSenderId: "881678862533",
  appId: "1:881678862533:web:35d6e6c6ead97d089a08ac",
  measurementId: "G-FZMF1EMPEZ"
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideFirebaseApp(() => initializeApp(firebaseConfig)), //All project need this
    provideFirestore(() => getFirestore()), //Using Firestore
    provideAuth(() => getAuth()), // Using Auth
    provideStorage(()=>getStorage()) // Using Cloud Storage
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
