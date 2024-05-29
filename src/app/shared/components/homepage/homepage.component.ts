import { SharedVariable } from '../../../shared.service';
import { CommonModule } from '@angular/common';
import { Component,Renderer2, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterModule, RouterOutlet, FormsModule, CommonModule, FooterComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {  


  constructor(public sharedService: SharedVariable,
              private router: Router) {  }

  ngOnInit() {
    setTimeout(() => {
      this.sharedService.mainTitle = ' ';
      this.sharedService.instructions = ' ';
      this.sharedService.extrainstructions = '';
      this.sharedService.showExtras = true;
    });
    console.log('hehe')
  }
  

}