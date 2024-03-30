import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SharedVariable {
    Ag: FormControl = new FormControl(null);
    E: number = 0; 
    Fy: number = 0; 
    F_Lamda: number = 0; 
    W_Lamda: number = 0; 
    flangeStatus: string = 'Flange Status';
    WebStatus: string = 'Web Status';
  
  constructor() { }
}
