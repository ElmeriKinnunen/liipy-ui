import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { inject } from '@vercel/analytics';


@Component({
  selector: 'app-cookie-banner',
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.scss']
})
export class CookieBannerComponent {
  cookiesAccepted = this.cookieService.get('cookiesAccepted') === 'true';
  cookiesSettingSaved = this.cookieService.get('cookiesAccepted') === 'false'

  constructor(private cookieService: CookieService) {}

  acceptCookies() {
    this.cookieService.set('cookiesAccepted', 'true');
    this.loadGoogleTagManager(); // Add your GTM script loading logic here
    this.cookiesAccepted = true;
    this.cookiesSettingSaved = true;
    inject();
  }

  rejectCookies() {
    this.cookieService.set('cookiesAccepted', 'false');
    console.log('Rejected cookies')
    // You can prevent the loading of GTM scripts here if necessary
    this.cookiesAccepted = false;
    this.cookiesSettingSaved = true;
  }

  loadGoogleTagManager() {
    // Create the GTM script element
    const gtmScript = document.createElement('script');
    gtmScript.async = true;
    gtmScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-QEL95JZETR';
  
    // Define a callback function to be executed once the GTM script is loaded
    gtmScript.onload = () => {
      // Add your GTM configuration script here
      const gtmConfigScript = document.createElement('script');
      gtmConfigScript.text = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-QEL95JZETR');
      `;
  
      // Append the GTM configuration script to the <head>
      document.head.append(gtmConfigScript);
    };
  
    // Append the GTM script to the <head>
    document.head.append(gtmScript);
  }
}