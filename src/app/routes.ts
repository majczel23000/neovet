import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoggedInGuard } from './shared/guards/logged-in.guard';

export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [LoggedInGuard],
        component: LoginComponent,
    },
    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadComponent: () => import('./views/dashboard/dashboard.component').then(mod => mod.DashboardComponent),
    },
    {
        path: 'shopping/:id',
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                loadComponent: () => import('./views/shopping/shopping-list/shopping-list.component').then(mod => mod.ShoppingListComponent),
            },
        ]
    },
    {
      path: 'categories',
      canActivate: [AuthGuard],
      loadComponent: () => import('./views/categories/categories-list/categories-list.component').then(mod => mod.CategoriesListComponent),
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
