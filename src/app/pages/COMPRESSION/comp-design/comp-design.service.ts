import { Injectable } from '@angular/core';
import { SharedVariable } from '../../../shared.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, Renderer2, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompDesignService {
  constructor(public sharedService: SharedVariable) { }

  DL = new BehaviorSubject<number>(0);
  LL = new BehaviorSubject<number>(0);

  KFactor = new BehaviorSubject<number>(1);
  maxkLr = new BehaviorSubject<number>(0);
  maxKL = new BehaviorSubject<number>(0);

  chosenElem = new BehaviorSubject<string>("ABC");
  chosenkL = new BehaviorSubject<number>(0);
  chosenKFactor = new BehaviorSubject<number>(0);
  chosenElemLength = new BehaviorSubject<number>(0);

    Ag: FormControl = new FormControl(null);
    Load: FormControl = new FormControl(null);
    bf2tf: FormControl = new FormControl(null);
    htw: FormControl = new FormControl(null);
    
    rx: FormControl = new FormControl(null);
    ry: FormControl = new FormControl(null);

    E = new BehaviorSubject<number>(0);
    Fy = new BehaviorSubject<number>(0);

  Fe: number = 0
  Fcheck: number = 0
  FeResult: string = '';
  FcrResult: string = '';
  PcrResult: string = '';
  PnResult: string = '';
  LRFDResult: string = '';
  ASDResult: string = '';
  displayLRFDResult: string = '';
  displayASDResult: string = '';
  result: string = '';

  
}
