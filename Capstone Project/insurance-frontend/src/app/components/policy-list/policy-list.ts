import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-policy-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './policy-list.html',
  styleUrl: './policy-list.css'
})
export class PolicyListComponent {

  @Input() policies: any[] = [];
  @Input() isAdmin = false;

}
