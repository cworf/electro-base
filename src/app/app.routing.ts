import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PostsComponent } from './posts/posts.component';

const appRoutes: Routes = [
	{
  		path: '',
  		component: UserProfileComponent
	},
	{
  		path: 'posts',
  		component: PostsComponent
	},

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
