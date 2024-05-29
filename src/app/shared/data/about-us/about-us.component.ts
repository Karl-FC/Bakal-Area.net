import { Component, OnInit } from '@angular/core';
import { SharedVariable } from '../../../shared.service';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent implements OnInit {  


  constructor(private sharedService: SharedVariable) {
  }

  ngOnInit() {
    this.sharedService.mainTitle = 'About';
    this.sharedService.subTitle = '';
    this.sharedService.instructions = '';
    this.sharedService.extrainstructions = '';
  }
}
