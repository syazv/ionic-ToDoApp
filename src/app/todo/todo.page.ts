import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Observable } from 'rxjs';
import { Auth, User } from '@angular/fire/auth'
import { Router } from '@angular/router';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {
  tasks$: Observable<any> = new Observable();
  newTask: string = '';
  user:User | null = null

  constructor(private firestoreService:FirestoreService,private auth:Auth ,private router:Router) { }

  ngOnInit() {
    this.tasks$ = this.firestoreService.getTasks();
    this.user = this.auth.currentUser
    if(this.user == null){
      this.router.navigate(['/'])
    }
  }
 
  addTask() {
    if (this.newTask.trim().length > 0) {
      this.firestoreService.addTask(this.newTask).then(() => {
        this.newTask = '';
      });
    }
  }

  updateTask(id: string, completed: boolean) {
    this.firestoreService.updateTask(id, completed);
  }
 
  deleteTask(id: string) {
    this.firestoreService.deleteTask(id);
  }
 
}