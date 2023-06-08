import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { CarttableComponent } from './carttable/carttable.component';

const routes: Routes = [
  {path: 'home', component: SearchComponent},
  {path: 'cart', component: CarttableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
