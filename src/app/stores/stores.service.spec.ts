import { HttpClientModule } from '@angular/common/http';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoresService } from './stores.service';

describe('StoresService', () => {
  let service: StoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoresService]
    });

    service = TestBed.get(StoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set the local', () => {
    // * act
    service.setLocal('fr');
    // * assert
    expect(service.getLocal()).toBe('fr');
  });
});

