import { Injectable } from '@angular/core';
import { SharedVariable } from '../../../shared.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, Renderer2, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenDesignService {
  constructor(public sharedService: SharedVariable) { }

  Length: FormControl = new FormControl(null);
  DL: FormControl = new FormControl(null);
  LL: FormControl = new FormControl(null);

  SteelShapeServe: number = 0
  bf: number = 0; // depth minus flanges
  
  db: number = 0; //diameter of bolt
  n: number = 0;
  dh: number = 0; //diameter of hole (YUN LAHAT LAHAT NA)
  
  isholePunch :boolean= true;  //Punching standard hole (1/16)
  hPunch: number = 0;
  isholeDmg :boolean= true;    //Damaged hole edge (1/16)
  hDamage: number = 0;
  holeResults: number = 0;

  U: number = 0;
  An: number = 0;
  Ae: number = 0;
  Ubs:number = 1;

  noReloadPls(event: Event) {
    event.preventDefault();
  }
  

}
