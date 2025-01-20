import { Component, inject, OnInit } from '@angular/core';
import { CurrentLocationComponent } from '../../current-location/current-location.component';
import { ShoppingListService } from '../../../shared/services/shopping/shopping-list.service';
import { MatListModule } from '@angular/material/list';
import { CategoryModel } from '../../../shared/models/shopping/category.model';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CategoriesAddComponent } from '../categories-add/categories-add.component';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfirmDialogComponent
} from '../../../shared/components/confirm-dialog.component.ts/confirm-dialog.component.ts.component';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [
    CurrentLocationComponent,
    MatListModule,
    MatIconButton,
    MatIcon,
    CategoriesAddComponent,
  ],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss'
})
export class CategoriesListComponent implements OnInit {

  protected shoppingListService = inject(ShoppingListService);
  protected dialog = inject(MatDialog);
  public categories: CategoryModel[] = [];

  ngOnInit(): void {
    this.shoppingListService.getCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

  public removeItem(id: string, name: string): void {
    this.dialog.open(ConfirmDialogComponent, { data: {
      title: `Na pewno usunąć kategorię ${name}?`
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.shoppingListService.deleteCategory(id);
      }
    });
  }
}
