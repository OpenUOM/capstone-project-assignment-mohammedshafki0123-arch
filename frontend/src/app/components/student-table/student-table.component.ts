import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { faTrash, faPlus, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { AppServiceService } from '../../app-service.service';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {

  faTrash = faTrash;
  faPlus = faPlus;
  faPenSquare = faPenSquare;
  studentData: any;
  allStudentData: any; // தேடுவதற்கு ஒரிஜினல் டேட்டாவை சேமிக்க
  selected: any;

  constructor(private service: AppServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getStudentData();
  }

  addNewStudent() {
    this.router.navigate(['addStudent'])
  }

  editStudent(id) {
    const navigationExtras: NavigationExtras = {
      state: {
        id: id
      }
    };
    this.router.navigate(['editStudent'], navigationExtras)
  }

  getStudentData() {
    this.service.getStudentData().subscribe((response) => {
      // டேட்டாவை அரே-வாக மாற்றி studentData-வில் சேமிக்கிறோம்
      this.studentData = Object.keys(response).map((key) => response[key]);
      // பேக்கப் எடுத்து வைக்கிறோம்
      this.allStudentData = [...this.studentData];
    }, (error) => {
      console.log('ERROR - ', error)
    })
  }

  deleteStudent(itemid) {
    const student = {
      id: itemid
    }
    this.service.deleteStudent(student).subscribe((response) => {
      this.getStudentData()
    })
  }

  search(value: string) {
    const searchTerm = value.toLowerCase();

    if (searchTerm.length <= 0) {
      // தேடல் காலி என்றால் பழைய எல்லா டேட்டாவையும் காட்டு
      this.studentData = [...this.allStudentData];
    } else {
      // பேக்கப் லிஸ்ட்டில் இருந்து தேடுகிறோம்
      this.studentData = this.allStudentData.filter((student: any) => {
        return student.name.toLowerCase().includes(searchTerm);
      });
    }
  }
}
