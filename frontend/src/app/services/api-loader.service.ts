import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiLoaderService {
  loadGoogleMapsApi(): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((window as any).google?.maps) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}`;

      script.async = true;
      script.defer = true;

      script.onload = () => {
        console.log('Google Maps loaded');
        resolve();
      };

      script.onerror = (error) => {
        reject(error);
      };

      script.onload = () => resolve();
      document.head.appendChild(script);
    });
  }
}
