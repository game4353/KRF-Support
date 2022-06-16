import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupportComponent } from './support/support.component';

const reuse = {reuse: true}

const routes: Routes = [
  { path: '', redirectTo: '/all', pathMatch: 'full' },
  { path: 'all', component: SupportComponent, data: reuse },
  { path: 'code/:code', component: SupportComponent, data: reuse },
  { path: 'character/:character', component: SupportComponent, data: reuse },
  { path: '**', redirectTo: '/all' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
