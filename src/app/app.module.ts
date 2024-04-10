import { FormsModule } from '@angular/forms'; // Add this line at the top
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    // ...
  ],
  imports: [
    // ...
    FormsModule,
    CommonModule // Add this line
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
