import { Injectable } from '@angular/core';
import { APIResponse, Recipe, RecipeSearch, RecipeType } from '../models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment as env} from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  getRecipes(type?:string, search?:string, offset: number = 0): Observable<APIResponse<RecipeSearch>> {
    let params = new HttpParams();
    var url = env.BASE_URL + '/complexSearch';

    if (type)
      params = params.append('type', type);
    
    if (search)
      params = params.append('query', search);

    params = params.append('offset', offset);
    params = params.append('number', 16);

    return this.http.get<APIResponse<RecipeSearch>>(url, {params: params});
  }

  getRecipeDetails(id:string): Observable<Recipe> {
    var url = env.BASE_URL + '/' + id + '/information';

    return this.http.get<Recipe>(url);
  }
}
