import { FormsModule } from '@angular/forms'; // Add this line at the top
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
  ],
  imports: [
    FormsModule, BrowserModule, CommonModule,
    DragDropModule, HttpClientModule
    

  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
