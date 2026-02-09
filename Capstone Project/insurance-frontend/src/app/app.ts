import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageComponent } from './components/message/message'; // ✅ ADD

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MessageComponent // ✅ REGISTER COMPONENT
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {}
