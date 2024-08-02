import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './components/auth/auth.guard';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { contentRoutes } from './shared/routes/content.routes';
import { LoginComponent } from './components/auth/login/login.component';


const routes: Routes = [
  { path: 'dashboard/default', component: LayoutComponent, children: contentRoutes,canActivate : [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: '**', redirectTo:'dashboard/default'},


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
