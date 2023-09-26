import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { TvShowDetailResult } from "../type";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { TvShowDetailsService } from "../tv-show-details.service";

export const TvShowDetailResolver: ResolveFn<TvShowDetailResult | null> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot  
): Observable<TvShowDetailResult | null> => {
  const tvShowDetails = inject(TvShowDetailsService);
  return tvShowDetails.showInfoApi(+route.params['id']);
}
