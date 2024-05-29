import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Flight 42</h2>
      </div>

      <div class="card-body">
        <p>
          Welcome to the leading travel platform.
        </p>
      </div>
    </div>
  `
})
export class HomeComponent {

}
