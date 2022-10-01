import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Recipe, RecipeSearch, RecipeType } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';
import data from './demo.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  recipesTypes: Array<string>;
  recipes: Array<RecipeSearch> = new Array<RecipeSearch>;
  selectedRecipeType: string | undefined;
  prevSearch: string = '';
  currentOffset: number = 0;
  totalResult: number = 0;

  private routeSub: Subscription | undefined;
  private recipesSub: Subscription | undefined;

  constructor(private activatedRouter: ActivatedRoute, private httpService: HttpService) {
    this.recipesTypes = Object.keys(RecipeType).filter((item) => isNaN(Number(item)));
    console.log(this.recipesTypes);
    //this.recipes = data;
    //console.log(this.recipes);
  }

  ngOnInit(): void {
    this.routeSub = this.activatedRouter.params.subscribe((params: Params)=>{
      if (params['search']) {
        this.searchRecipes(this.selectedRecipeType, params['search']);
      }
      else
      {
        this.searchRecipes(this.selectedRecipeType);
      }
    });
  }

  searchRecipes(type?: string, search?: string) {
    if (search)
      this.prevSearch = search;

    this.recipesSub = this.httpService
    .getRecipes(type, this.prevSearch)
    .subscribe((recipesFound: APIResponse<RecipeSearch>)=>{
      console.log(recipesFound);
      this.recipes = recipesFound.results;
      this.currentOffset += recipesFound.number;
      this.totalResult = recipesFound.totalResults;
    });
  }

  loadMoreRecipes() {
    if (this.currentOffset > this.totalResult)
      return;

    this.recipesSub = this.httpService
    .getRecipes(this.selectedRecipeType, this.prevSearch, this.currentOffset)
    .subscribe((recipesFound: APIResponse<RecipeSearch>)=>{
      console.log(recipesFound);
      this.recipes?.push(...recipesFound.results);
      this.currentOffset += recipesFound.number;
      this.totalResult = recipesFound.totalResults;
    });
  }

  selectType(type:string) {
    this.selectedRecipeType = type;
    this.prevSearch = '';
    this.searchRecipes(this.selectedRecipeType, this.prevSearch);
  }

  ngOnDestroy() {
    if (this.routeSub)
      this.routeSub.unsubscribe();
    if (this.recipesSub)
      this.recipesSub.unsubscribe();
  }

}
