import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAnalytics, getAnalytics } from '@angular/fire/analytics';

const firebaseConfig = {

  apiKey: "AIzaSyDP_ZlH8J_583JWRRrHJLzZ-RH5tY3e-tY",
  authDomain: "bakal-areanet.firebaseapp.com",
  projectId: "bakal-areanet",
  storageBucket: "bakal-areanet.appspot.com",
  messagingSenderId: "990730367254",
  appId: "1:990730367254:web:928e22ea602d948f9e6037",
  measurementId: "G-NZ21RMSBVE"
  
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAnalytics(() => getAnalytics()),
    provideRouter(routes),
    provideHttpClient(),
  ],
};


;
