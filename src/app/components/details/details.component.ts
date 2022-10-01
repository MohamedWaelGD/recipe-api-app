import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  recipe: Recipe | undefined;

  constructor(private route: Router, private activatedRoute: ActivatedRoute, private httpService:HttpService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params:Params)=>{
      if (params['id']) {
        this.getRecipe(params['id']);
      }
      else
      {
        this.route.navigate(['']);
      }
    })
  }

  getRecipe(id:string) {
    this.httpService
    .getRecipeDetails(id)
    .subscribe((recipeDetails: Recipe) => {
      console.log(recipeDetails);
      this.recipe = recipeDetails;
    });
  }

  getHealthColor(recipeHealth: number) : string {
    if (recipeHealth > 80)
      return "bg-success";
    else if (recipeHealth > 30)
      return "bg-warning";

    return "bg-danger";
  }
}
