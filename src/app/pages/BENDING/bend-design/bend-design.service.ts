import { Injectable } from '@angular/core';
import { SharedVariable } from '../../../shared.service';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BendDesignService {
  constructor(public sharedService: SharedVariable) { }

  DL = new BehaviorSubject<number>(0);
  LL = new BehaviorSubject<number>(0);

  beamCase = new BehaviorSubject<number>(0);
  defLimit:number = 0
  chosenElemLength = new BehaviorSubject<number>(0);

    bf2tf: FormControl = new FormControl(null);
    htw: FormControl = new FormControl(null);
    
    rx: FormControl = new FormControl(null);
    ry: FormControl = new FormControl(null);

    E = new BehaviorSubject<number>(0);
    Fy = new BehaviorSubject<number>(0);

  result: string = '';

  noReloadPls(event: Event) {
    event.preventDefault();
  }
  

}
