import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TvShowDetailResolver } from './tv-show-details/tv-show-details.resolver';

const routes: Routes = [
  {path: "", loadComponent: () => import('./search-view/search-view.component')},
  {path: "details/:id", loadComponent: () => import('./tv-show-details/tv-show-details.component'), resolve: { tvShowResult: TvShowDetailResolver }},
  {path: "favorites", loadComponent: () => import('./favorites-view/favorites-view.component')}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {bindToComponentInputs: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
