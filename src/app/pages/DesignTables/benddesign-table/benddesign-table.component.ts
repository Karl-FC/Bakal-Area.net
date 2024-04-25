import { Component, Renderer2, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompressionbeamshapesComponent } from '../../../shared/data/compressionbeamshapes/compressionbeamshapes.component';
import { SharedVariable } from '../../../shared.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { Sort,MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { BenddesignTableService, BeamShape} from './benddesign-table.service';

@Component({
  selector: 'app-Benddesign-table',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSortModule],
  templateUrl: './benddesign-table.component.html',
  styleUrl: './benddesign-table.component.scss'
})


export class BenddesignTableComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<any>;
  beamShapes$ = this.updater.beamShapes$;
  beamFilters = new FormControl('');

  constructor(public updater: BenddesignTableService) {
    this.updater.updateTable$.subscribe(() => {
      this.updater.loadTable();
      console.log("updater worked on designtablecomponent");
    });
  }
  
  onFilterChange() {
    let beamFilters = Number(this.beamFilters.value);
    this.updater.beamFilter.next(beamFilters);
    if (this.beamFilters.value !== null) {
        this.updater.setBeamFilter(Number(this.beamFilters.value));
    }
    // or assign a default value if this.beamFilters.value is null
    else {
        this.updater.setBeamFilter(0); // replace 0 with your default value
    }
}
  

  ngOnInit() {
    this.updater.loadTable();
   
    this.updater.beamShapes$.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
  });
  };

  get beamShapes() {
    return this.updater.beamShapes$;
  }

  sortData(sort: Sort) {
    const data = this.updater._beamShapes.getValue().slice();
    if (!sort.active || sort.direction === '') {
        return;
    }
  
    const sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'AISC_Manual_Label':
              return compare(a.AISC_Manual_Label, b.AISC_Manual_Label, isAsc);
        case 'W':
          return compare(a.W, b.W, isAsc);
        case 'Zx':
          return compare(a.Zx, b.Zx, isAsc);
        case 'ZU':
          return compare(a.ZU, b.ZU, isAsc);
        case 'MuDemand':
          return compare(a.MuDemand, b.MuDemand, isAsc);
        case 'MuCapacity':
          return compare(a.MuCapacity, b.MuCapacity, isAsc);
        case 'LRFDstatus':
          return compare(a.LRFDstatus, b.LRFDstatus, isAsc);
        case 'MaDemand':
          return compare(a.MaDemand, b.MaDemand, isAsc);
        case 'MaCapacity':
          return compare(a.MaCapacity, b.MaCapacity, isAsc);
        case 'ASDstatus':
          return compare(a.ASDstatus, b.ASDstatus, isAsc);
        case 'Ix':
          return compare(a.Ix, b.Ix, isAsc);
        case 'Sx':
          return compare(a.Sx, b.Sx, isAsc);
        case 'Fcondition':
          return compare(a.Fcondition, b.Fcondition, isAsc);
        case 'Wcondition':
          return compare(a.Wcondition, b.Wcondition, isAsc);
        case 'bf2tf':
          return compare(a['bf/2tf'], b['bf/2tf'], isAsc);
        case 'htw':
          return compare(a['h/tw'], b['h/tw'], isAsc);
        default:
          return 0;
      }
    });
    this.updater._beamShapes.next(sortedData);
  }

  
}
  
function compare(a: number | string, b: number | string, isAsc: boolean) {
  let numA = Number(a);
  let numB = Number(b);

  if (!isNaN(numA) && !isNaN(numB)) {
    // Both a and b are valid numbers or can be converted to valid numbers
    return (numA < numB ? -1 : 1) * (isAsc ? 1 : -1);
  } else {
    // Either a or b is a string that can't be converted to a number
    return String(a).localeCompare(String(b)) * (isAsc ? 1 : -1);
  }
}




