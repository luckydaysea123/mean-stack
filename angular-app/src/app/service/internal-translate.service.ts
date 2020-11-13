import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InternalTranslateService {
  constructor(private translate: TranslateService) { }
  lang = 'en';
  translateResults: any;

  initTranslateResults() {
    return this.translate.getTranslation(this.lang)
    .pipe(map(res => {
      this.translateResults = res;
      return true;
    }));
  }
}
