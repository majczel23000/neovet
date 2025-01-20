import { Injectable, inject } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { ProductModel } from '../../models/shopping/shopping-list.model';
import { CategoryModel } from '../../models/shopping/category.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  protected firestore = inject(AngularFirestore);
  protected localName: { [key: string]: string } = {
    'krakow': 'Kraków, Zygmunta Glogera 21',
    'wegrzce': 'Węgrzce, os. Wojskowe 13',
  };

  // Get shopping list details
  getShoppingList(shoppingListName: string): Observable<ProductModel[]> {
    return this.firestore.collection(shoppingListName).snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => {
          return ({ ...(c.payload.doc.data() as ProductModel), id: c.payload.doc.id })
        });
      })
    );
  }

  // Update product in shopping list
  updateProduct(shoppingListName: string, product: ProductModel): Promise<void> {
    return this.firestore.collection(shoppingListName).doc(product.id).set(product, { merge: true });
  }

  // Update product from shopping list
  deleteProductFromShoppingList(shoppingListName: string, id: string): Promise<void> {
    return this.firestore.collection(shoppingListName).doc(id).delete();
  }

  // Create new product in shopping list
  createNewProductInList(shoppingListName: string, product: ProductModel): Promise<void | DocumentReference<unknown>> {
    return this.firestore.collection(shoppingListName).add(product).then(ref => {
      ref.set({ id: ref.id }, { merge: true });
    });
  }

  // Create new category
  createNewCategory(category: string): Promise<void | DocumentReference<unknown>> {
    return this.firestore.collection('categories').add({ name: category }).then(ref => {
      ref.set({ id: ref.id }, { merge: true });
    });
  }

  // Delete category
  deleteCategory(id: string): Promise<void> {
    return this.firestore.collection('categories').doc(id).delete();
  }

  // Get all categories (sorted)
  getCategories(): Observable<CategoryModel[]> {
    return this.firestore.collection('categories').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({id: c.payload.doc.id, ...(c.payload.doc.data() as CategoryModel)}))
        .sort((a, b) => a.name.localeCompare(b.name))
      )
    );
  }

  getLocalName(shoppingListName: string): string {
    return this.localName[shoppingListName];
  }
}
