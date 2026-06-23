import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
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

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.searchService.getBuses().subscribe((res: any) => {
      this.buses = JSON.parse(res);
    });

    this.travelService.getInitialTravelPlan().subscribe((travel: TravelDetail) => {
      this.travelDetail = travel;
      if (travel && travel.fromCity && travel.toCity) {
        this.loadDuration(travel);
        this.loadGoogleMaps(travel);
      }
    });
  }

  ngAfterViewInit(travel: TravelDetail) {
    // this.loadDuration(travel);
  }

  loadGoogleMaps(travel: TravelDetail) {
    this.mapsReady = true;

    if ((window as any).google?.maps) {
      this.mapsReady = true;
    }
    this.loading = false;

    if (travel && travel.fromCity && travel.toCity) {
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
        .then((result: any) => {
          this.directionsRenderer.setDirections(result);

          const leg = result.routes[0].legs[0];

          this.distance = leg.distance?.text ?? '';
          this.duration = leg.duration?.text ?? '';
        })
        .catch((error: any) => {
          console.error('Directions API error', error);
        });
    }
  }

  loadDuration(travel: any) {
    const coordinates = {
      locations: [
        [travel.fromCity.lon, travel.fromCity.lat],
        [travel.toCity.lon, travel.toCity.lat],
      ],
      metrics: ['distance', 'duration'],
    };
    this.travelService.getRouteDuration(coordinates).subscribe((res: any) => {
      this.distance = res.distanceKm + ' Kms';
      this.duration = res.durationHours + ' Hrs : ' + res.durationMinutes + ' Mins';
      this.cdr.detectChanges();
    });
  }

  clear(table: Table) {
    table.clear();
  }

  onViewSeats(bus: any) {}

  showDialog(busDetail: any) {
    this.travelService.updateTravelInfo(busDetail).subscribe((res) => {
      this.visible = true;
    });
  }

  onConfirm() {
    this.isTravelConfirm = true;
  }

  onHidePassengerDetail() {
    this.isTravelConfirm = false;
  }
}
