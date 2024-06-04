import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideClientHydration(), 
    provideAnimationsAsync(), 
    provideFirebaseApp(() => initializeApp({"projectId":"clinicaonline-fd12b","appId":"1:592749841647:web:05b41b60dc0a80b618df1a","storageBucket":"clinicaonline-fd12b.appspot.com","apiKey":"AIzaSyDIZFEsoo8c7vOCHshzrIN0ninK7k4Gyno","authDomain":"clinicaonline-fd12b.firebaseapp.com","messagingSenderId":"592749841647"})), 
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
};
