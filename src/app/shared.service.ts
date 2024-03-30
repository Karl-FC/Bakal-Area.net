import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedVariable {
    Ag: number = 0; // Shared variable
  
  constructor() { }
}
