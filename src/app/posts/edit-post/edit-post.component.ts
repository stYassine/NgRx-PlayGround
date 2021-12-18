import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
/// NgRx
import { select, Store } from '@ngrx/store';
import { Post } from 'src/app/models/posts.model';
import { updatePost } from '../../posts/store/posts.actions';
import { getPostById } from '../../posts/store/posts.selectors';
import { AppState } from 'src/app/store/app.state';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  form: FormGroup;
  public selectedPost: Post ={
    id: '',
    title: '',
    description: ''
  };

  constructor(
    public store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.initForm();
    this.getSelectedPost();
  }
  private initForm(){
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)]),
    });
  }
  public showDescriptionErrors(){
    const descriptionForm = this.form.get('description');
    if(descriptionForm.touched && !descriptionForm.valid){
      if(descriptionForm.errors.required){
        return 'Description is Required';
      }
      if (descriptionForm.errors.minlength){
        return 'Description Should be minimum 10 Characters Long';
      }
    }
  }

  public onUpdatePost(){
    if(!this.form.valid) return;
    const post: Post = {
      id: this.selectedPost.id,
      title: this.form.value.title,
      description: this.form.value.description,
    }

    this.store.dispatch(updatePost({post}));
    this.router.navigate(['/posts']);
  }

  public getSelectedPost(){
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if(id){
        this.store.pipe(select(getPostById, {id})).subscribe(post => {
          this.selectedPost['id'] = post.id;
          this.selectedPost['title'] = post.title;
          this.selectedPost['description'] = post.description;
        });
      }
    });
  }

}
