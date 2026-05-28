import { TestBed } from '@angular/core/testing';

import { BookingPanelService } from './booking-panel.service';

describe('BookingPanelService', () => {
  let service: BookingPanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
