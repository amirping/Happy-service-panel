import { TestBed, inject } from '@angular/core/testing';

import { RtSocketService } from './rt-socket.service';

describe('RtSocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RtSocketService]
    });
  });

  it('should be created', inject([RtSocketService], (service: RtSocketService) => {
    expect(service).toBeTruthy();
  }));
});
