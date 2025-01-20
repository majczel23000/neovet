import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { ShoppingListService } from '../../shared/services/shopping/shopping-list.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  protected router = inject(Router);
  protected shoppingListService: ShoppingListService = inject(ShoppingListService);

  public goTo(route: string): void {
    this.router.navigateByUrl(route);
  }

}
