import { FormsModule } from '@angular/forms'; // Add this line at the top
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
  ],
  imports: [
    FormsModule, BrowserModule, CommonModule,
    DragDropModule, HttpClientModule, MatSortModule
    

  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
