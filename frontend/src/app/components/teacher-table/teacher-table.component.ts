import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { faTrash, faPlus, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { AppServiceService } from '../../app-service.service';

@Component({
  selector: 'app-teacher-table',
  templateUrl: './teacher-table.component.html',
  styleUrls: ['./teacher-table.component.css']
})
export class TeacherTableComponent implements OnInit {

  faTrash = faTrash;
  faPlus = faPlus;
  faPenSquare = faPenSquare;
  teacherData: any;
  allTeacherData: any; // தேடுவதற்காக ஒரிஜினல் டேட்டாவை சேமிக்கப் பயன்படும்
  selected: any;

  constructor(private service: AppServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getTeacherData();
  }

  addNewTeacher() {
    this.router.navigate(['addTeacher'])
  }

  editTeacher(id) {
    const navigationExtras: NavigationExtras = {
      state: {
        id: id
      }
    };
    this.router.navigate(['editTeacher'], navigationExtras)
  }

  initializeDB(){
    this.service.initializeDB().subscribe((response) => {
      console.log('DB is Initialized')
    }, (error) => {
      console.log('ERROR - ', error)
    })
  }

  getTeacherData() {
    this.selected = 'Teachers';
    this.service.getTeacherData().subscribe((response) => {
      // டேட்டாவை அப்படியே அரே-வாக (Array) மாற்றுகிறோம்
      this.teacherData = Object.keys(response).map((key) => response[key]);
      // பேக்கப் எடுத்து வைக்கிறோம்
      this.allTeacherData = [...this.teacherData];
    }, (error) => {
      console.log('ERROR - ', error)
    })
  }

  getStudentData() {
    this.selected = 'Students';
    this.service.getStudentData().subscribe((response) => {
      this.teacherData = response;
      this.allTeacherData = [...this.teacherData]; // மாணவர்களுக்கும் பேக்கப்
    }, (error) => {
      console.log('ERROR - ', error)
    })
  }

  search(value) {
    const searchTerm = value.toLowerCase();
    
    if (searchTerm.length <= 0) {
      // தேடல் காலி என்றால் பேக்கப்பில் இருக்கும் எல்லா டேட்டாவையும் காட்டு
      this.teacherData = [...this.allTeacherData];
    } else {
      // பேக்கப்பில் இருந்து மட்டும் தேடு (இதுதான் சரியான முறை)
      this.teacherData = this.allTeacherData.filter((teacher) => {
        return teacher.name.toLowerCase().includes(searchTerm);
      });
    }
  }

  deleteTeacher(itemid) {
    const test = {
      id: itemid
    }
    this.service.deleteTeacher(test).subscribe((response) => {
      this.getTeacherData()
    })
  }
}
