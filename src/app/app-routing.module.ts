import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchViewComponent } from './search-view/search-view.component';
import { FavoritesViewComponent } from "./favorites-view/favorites-view.component";
import { TvShowDetailsComponent } from './tv-show-details/tv-show-details.component';
import { TvShowDetailResolver } from './tv-show-details/tv-show-details.resolver';

const routes: Routes = [
  {path: "", component: SearchViewComponent},
  {path: "details/:id", component: TvShowDetailsComponent, resolve: { tvShowResult: TvShowDetailResolver }},
  {path: "favorites", component: FavoritesViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {bindToComponentInputs: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
