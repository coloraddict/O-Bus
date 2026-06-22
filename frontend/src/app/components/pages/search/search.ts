import { Component, inject, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SearchService } from '../../../services/search-service';
import { SeatDetail } from './seat-detail/seat-detail';
import { PassengerDetail } from './passenger-detail/passenger-detail';
import { TravelService } from '../../../services/travel.service';
import { DatePipe, JsonPipe } from '@angular/common';
import { TravelDetail } from '../../../models/travel';
import { Router } from '@angular/router';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { ApiLoaderService } from '../../../services/api-loader.service';

@Component({
  selector: 'app-search',
  imports: [
    TableModule,
    ButtonModule,
    DialogModule,
    SeatDetail,
    PassengerDetail,
    // JsonPipe,
    DatePipe,
    GoogleMapsModule,
  ],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  statuses!: any[];
  loading: boolean = true;
  activityValues: number[] = [0, 100];
  value!: string;
  buses!: any[];
  visible: boolean = false;

  searchService = inject(SearchService);
  travelService = inject(TravelService);

  visible2: boolean = false;

  travelDetail!: TravelDetail;

  isTravelConfirm: boolean = false;

  center: google.maps.LatLngLiteral = {
    lat: 19.076,
    lng: 72.8777,
  };

  zoom = 5;

  markerPositions: google.maps.LatLngLiteral[] = [{ lat: 19.076, lng: 72.8777 }];

  mapsReady = false;

  @ViewChild(GoogleMap)
  map!: GoogleMap;

  directionsService!: google.maps.DirectionsService;

  directionsRenderer!: google.maps.DirectionsRenderer;

  distance = '';
  duration = '';

  apiLoader = inject(ApiLoaderService);

  constructor(private router: Router) {}

  async ngOnInit() {
    await this.apiLoader.loadGoogleMapsApi();
    this.mapsReady = true;
    this.loading = false;

    if ((window as any).google?.maps) {
      this.mapsReady = true;
    }
    this.loading = false;

    this.searchService.getBuses().subscribe((res: any) => {
      this.buses = JSON.parse(res);
    });

    this.travelService.getInitialTravelPlan().subscribe((travel: TravelDetail) => {
      console.log(travel);
      if (!travel.fromCity || !travel.toCity) {
        return;
      }

      this.markerPositions = [
        {
          lat: Number(travel.fromCity.lat),
          lng: Number(travel.fromCity.lon),
        },
        {
          lat: Number(travel.toCity.lat),
          lng: Number(travel.toCity.lon),
        },
      ];

      this.center = {
        lat: (Number(travel.fromCity.lat) + Number(travel.toCity.lat)) / 2,
        lng: (Number(travel.fromCity.lon) + Number(travel.toCity.lon)) / 2,
      };

      const bounds = new google.maps.LatLngBounds();

      this.markerPositions.forEach((marker) => bounds.extend(marker));

      if (this.map) {
        this.map.fitBounds(bounds);
      }

      this.directionsService = new google.maps.DirectionsService();

      this.directionsRenderer = new google.maps.DirectionsRenderer();

      if (!this.map?.googleMap) {
        console.warn('Google Map not ready');
        return;
      }

      this.directionsRenderer.setMap(this.map.googleMap!);

      this.directionsService
        .route({
          origin: {
            lat: travel.fromCity.lat,
            lng: travel.fromCity.lon,
          },

          destination: {
            lat: travel.toCity.lat,
            lng: travel.toCity.lon,
          },

          travelMode: google.maps.TravelMode.DRIVING,
        })
        .then((result) => {
          this.directionsRenderer.setDirections(result);

          const leg = result.routes[0].legs[0];

          this.distance = leg.distance?.text ?? '';
          this.duration = leg.duration?.text ?? '';
        })
        .catch((error) => {
          console.error('Directions API error', error);
        });
    });
  }

  clear(table: Table) {
    table.clear();
  }

  onViewSeats(bus: any) {}

  showDialog(busDetail: any) {
    this.visible = true;
    this.travelService.updateTravelInfo(busDetail);
  }

  onConfirm() {
    this.isTravelConfirm = true;
  }

  onHidePassengerDetail() {
    this.isTravelConfirm = false;
  }
}
