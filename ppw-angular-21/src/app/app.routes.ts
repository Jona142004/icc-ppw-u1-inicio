import { Routes } from '@angular/router';
import { HomePage } from './features/home/pages/home-page';
import { ProfilePage } from './features/profile/pages/profile-page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'profile',
    component: ProfilePage,
  },
  {
    path: '**',
    redirectTo: '',
  },
];