import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

/// NgRx
import * as fromPosts from './store';
import { PostsEffects } from './store/posts.effects';

/// Components
import { PostsListComponent } from './posts-list/posts-list.component';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { EffectsModule } from '@ngrx/effects';
import { SinglePostComponent } from './single-post/single-post.component';

export const routes: Routes = [
  {
    path: '', component: PostsListComponent,
    children: [
      {
        path: 'create', component: AddPostComponent
      },
      {
        path: 'edit/:id', component: EditPostComponent
      }
    ]
  },
];

@NgModule({
  declarations: [
    PostsListComponent,
    AddPostComponent,
    EditPostComponent,
    SinglePostComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([PostsEffects]),
    StoreModule.forFeature(fromPosts.postsFeatureKey, fromPosts.reducer)
  ]
})
export class PostsModule { }
