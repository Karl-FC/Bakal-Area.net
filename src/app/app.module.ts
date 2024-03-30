import { FormsModule } from '@angular/forms'; // Add this line at the top

@NgModule({
  declarations: [
    // ...
  ],
  imports: [
    // ...
    FormsModule, // Add this line
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
