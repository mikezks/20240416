import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { NextFlightsModule } from './next-flights/next-flights.module';

@Component({
  standalone: true,
  imports: [
    SidebarComponent,
    NavbarComponent,
    FlightSearchComponent,
    NextFlightsModule
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Hello World!';

  setTitle(): void {
    this.title = 'Hello Angular! :)';
  }
}
