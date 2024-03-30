<<<<<<< HEAD
import { FormsModule } from '@angular/forms'; // Add this line at the top

@NgModule({
  declarations: [
    // ...
  ],
  imports: [
    // ...
    FormsModule, // Add this line
=======
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
>>>>>>> fa38da51d8686245a1bbb2f9dda78a0dbfbfb915
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
