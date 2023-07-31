import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { TvShowDetail } from "../type";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { TvShowDetailsService } from "../tv-show-details.service";

export const TvShowDetailResolver: ResolveFn<TvShowDetail | null> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot  
): Observable<TvShowDetail | null> => {
  const tvShowDetails = inject(TvShowDetailsService);
  return tvShowDetails.showInfoApi(+route.params['id']);
}
