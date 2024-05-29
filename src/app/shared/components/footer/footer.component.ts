import { Component, inject  } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { Analytics } from '@angular/fire/analytics';
import { getAnalytics, logEvent } from '@angular/fire/analytics';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  private analytics = inject(Analytics);

  BackWords() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  reLoad(event: Event) {
    event.preventDefault();
    location.reload();
  }

  butclick(){
    const analytics = getAnalytics();
  logEvent(analytics, 'notification_received');
  }
}

