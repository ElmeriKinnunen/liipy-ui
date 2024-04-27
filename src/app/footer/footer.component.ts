import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(@Inject(DOCUMENT) private _document: Document){} 

  refreshPage() {
    this._document.defaultView?.location.reload();
  }

}
