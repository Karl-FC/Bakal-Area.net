import { FormsModule } from '@angular/forms'; // Add this line at the top
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    // ...
  ],
  imports: [
    // ...
    FormsModule,
    CommonModule,
    DragDropModule, // Add this line
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
