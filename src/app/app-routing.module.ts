import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupportComponent } from './support/support.component';

const routes: Routes = [
  { path: '', redirectTo: '/all', pathMatch: 'full' },
  { path: 'all', component: SupportComponent },
  { path: 'code/:code', component: SupportComponent },
  { path: 'character/:character', component: SupportComponent },
  { path: '**', redirectTo: '/all' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
