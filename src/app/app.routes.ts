import { Routes } from '@angular/router';
import { Login } from './components/auth/login/login';
import { Register } from './components/auth/register/register';
import { authGuard } from './guards/auth-guard';
import { TeamsList } from './components/teams-list/teams-list';
import { AddMemberComponent } from './components/add-member/add-member';
import { ProjectsList } from './components/projects-list/projects-list';
import { TasksList } from './components/tasks-list/tasks-list';
import { TasksAllDetails } from './components/tasks-all-details/tasks-all-details';

export const routes: Routes = [
{ 
    path: 'login', 
    component: Login 
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: Register },
  { path: 'teams', canActivate: [authGuard] ,component:TeamsList},
  {path:'teams/:id/member', canActivate: [authGuard] ,component:AddMemberComponent},
  { path: 'projects', canActivate: [authGuard] ,component: ProjectsList }, 
  { path: 'teams/:teamId/projects', canActivate: [authGuard] ,component: ProjectsList },
  {path:'projects/:id',canActivate: [authGuard] , component: TasksList},
  {path:'projects/:id/tasks/:taskId', canActivate: [authGuard] ,component: TasksAllDetails},

];
