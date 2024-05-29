import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { FlightSearchComponent } from './flight-search.component';
import { FlightService } from '../../data-access/flight.service';
import { DummyFlightService } from '../../data-access/dummy-flight.service';
import { By } from '@angular/platform-browser';

describe('Unit test: flight-search.component', () => {
  let component: FlightSearchComponent;
  let fixture: ComponentFixture<FlightSearchComponent>;
  let flightService: FlightService;

  function setInput(selector: string, value: string): void {
    const input = fixture.debugElement.query(By.css(selector)).nativeElement;
    input.value = value;
    input.dispatchEvent(new Event('input'));
    tick();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightSearchComponent],
      providers: [
        provideHttpClient(),
        {
          provide: FlightService,
          useClass: DummyFlightService
        }
      ]
    }).compileComponents();

    flightService = TestBed.inject(FlightService);
    spyOn(flightService, 'find').and.callThrough();

    fixture = TestBed.createComponent(FlightSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not have any flights loaded initially', () => {
    expect(component.flights.length).toBe(0);
  });

  it('should load flights when user entered from and to', () => {
    component.from.set('Graz');
    component.to.set('Hamburg');
    component.search();

    expect(component.flights.length).toBe(1);
    expect(flightService.find).toHaveBeenCalled();
  });

  it('should *not* load flights when user did not enter from and to', () => {
    component.from.set('');
    component.to.set('');
    component.search();

    expect(component.flights.length).toBe(0);
    expect(flightService.find).not.toHaveBeenCalled();
  });
});
