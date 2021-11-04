import { HttpClientModule } from '@angular/common/http';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoresListComponent } from './stores-list.component';

describe('StoresListComponent', () => {
  let fixture: ComponentFixture<StoresListComponent>;
  let component: StoresListComponent;
  let element: HTMLElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        StoresListComponent
      ]
    });

    fixture = TestBed.createComponent(StoresListComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
