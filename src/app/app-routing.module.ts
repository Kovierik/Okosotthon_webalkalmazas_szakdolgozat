import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent } from './application/application.component';
import { HomePageComponent } from './application/home-page/home-page.component';
import { HouseGroundPlanComponent } from './application/house-ground-plan/house-ground-plan.component';
import { MainPageAboutComponent } from './main-page/main-page-about/main-page-about.component';
import { MainPageContentComponent } from './main-page/main-page-content/main-page-content.component';
import { MainPageServicesComponent } from './main-page/main-page-services/main-page-services.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  {
    path: 'main-page',
    component: MainPageComponent,
    children: [
      { path: 'home', component: MainPageContentComponent },
      { path: 'about', component: MainPageAboutComponent },
      { path: 'services', component: MainPageServicesComponent },
    ],
  },
  { path: '', redirectTo: 'main-page/home', pathMatch: 'full' },
  {
    path: 'app-home',
    component: ApplicationComponent,
    children: [
      { path: 'home-page', component: HomePageComponent },
      { path: 'house-ground-plan', component: HouseGroundPlanComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
