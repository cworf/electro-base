import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PostsComponent } from './posts/posts.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { AuthGuard } from './core/auth.guard';


const appRoutes: Routes = [
	{
  		path: '',
  		component: UserProfileComponent
	},
	{
  		path: 'my-posts',
  		component: MyPostsComponent
	},
	{
  		path: 'posts',
  		component: PostsComponent,
		canActivate: [AuthGuard]
	},

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
