import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { CategoryModel } from '../../../shared/models/shopping/category.model';
import { ShoppingListService } from '../../../shared/services/shopping/shopping-list.service';

@Component({
  selector: 'app-categories-add',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect
  ],
  templateUrl: './categories-add.component.html',
  styleUrl: './categories-add.component.scss'
})
export class CategoriesAddComponent {
  @Input() categories: CategoryModel[] = [];

  protected shoppingListService = inject(ShoppingListService);

  public category: string = '';

  public addNewCategory(): void {
    if (this.isAddButtonDisabled()) {
      return;
    }
    this.shoppingListService.createNewCategory(this.category).then(() => {
      this.category = '';
    });
  }

  public isAddButtonDisabled(): boolean {
    return !this.category.length;
  }
}
