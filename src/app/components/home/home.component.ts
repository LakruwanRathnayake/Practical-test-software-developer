import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'epfNumber'];
  isMultiple: boolean = true;
  dataSource = new MatTableDataSource<any>([]);
  sections: string[] = ['All', 'IT', 'HR', 'Finance', 'Production', 'Manufacturing'];
  selectedSection: string = 'All';
  dropdownOpen = false;
  responsiblePersons: string[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('dropdownContainer', { static: false }) dropdownContainer!: ElementRef;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/api/fetchData')
      .subscribe(
        (exampleData) => {
          this.dataSource.data = exampleData;
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }

  onSectionSelect(event: any): void {
    this.selectedSection = event.target.value;
    this.applyFilter();
    this.dropdownOpen = false;
  }

  applyFilter(): void {
    if (this.selectedSection === 'All') {
      this.dataSource.filter = '';
    } else {
      this.dataSource.filter = this.selectedSection;
    }
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event): void {
    if (this.dropdownContainer && !this.dropdownContainer.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
    }
  }

  addResponsiblePerson(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value.trim();

    if (value) {
      this.responsiblePersons.push(value);
    }

    if (input) {
      input.value = '';
    }
  }
  editEmployee(data: any): void {

    console.log('Edit employee:', data);

  }

  removeEmployee(data: any): void {
    const index = this.dataSource.data.indexOf(data);
    if (index > -1) {
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
    }
    console.log('Remove employee:', data);

  }

}
