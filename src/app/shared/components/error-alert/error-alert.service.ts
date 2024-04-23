import { Injectable } from '@angular/core';
import { ErrorAlertComponent } from './error-alert.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorAlertService {

  constructor() {  }

  
errorAlert(ErrMsg:string, allDuration = 2500, fadeDuration = 500) {
  const ErrAlert = document.getElementById('ErrAlert'); /* //Check muna kung yun error is noBeam, noLength, o noTable
  const ErrorMessage = ErrAlert?.querySelector('div div span #Errormessage')
          if (ErrMsg == 'noBeam') {
                  if (ErrAlert) 
                    {ErrAlert.style.display = 'block',
                  ErrAlert.style.transition = 'opacity 0.5s'
                    ErrAlert.style.opacity = '1';
                    if (ErrorMessage) ErrorMessage.textContent = 'HA'

                  // Fade out
                  setTimeout(() => {
                    ErrAlert.style.opacity = '0';

                              // After mag fade out, display = none
                                    setTimeout(() => {
                                      ErrAlert.style.display = 'none';
                                    }, fadeDuration);  // 0.5s = 500 miliseconds
                                  }, allDuration);

                    };
              }*/

              if (ErrAlert) 
                {ErrAlert.style.display = 'block',
              ErrAlert.style.transition = 'opacity 0.5s'
                ErrAlert.style.opacity = '1';

              // Fade out
              setTimeout(() => {
                ErrAlert.style.opacity = '0';

                          // After mag fade out, display = none
                                setTimeout(() => {
                                  ErrAlert.style.display = 'none';
                                }, fadeDuration);  // 0.5s = 500 miliseconds
                              }, allDuration);

                };

}



}
