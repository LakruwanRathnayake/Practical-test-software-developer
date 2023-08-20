import { Component } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

export interface ResponsiblePerson {
  name: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isMultiple: boolean = false;
  formData: any = {
    responsiblePersons: [],
    gender: '',
    section: ''
  };
  sections: string[] = ['IT', 'HR', 'Finance', 'Production', 'Manufacturing'];

  separatorKeysCodes: number[] = [13, 188]; // Enter and comma

  addResponsiblePerson(input: HTMLInputElement): void {
    const value = input.value.trim();
    if (value) {
      this.formData.responsiblePersons.push({ name: value });
      input.value = '';
    }
  }

  removeResponsiblePerson(person: ResponsiblePerson): void {
    const index = this.formData.responsiblePersons.indexOf(person);
    if (index >= 0) {
      this.formData.responsiblePersons.splice(index, 1);
    }
  }

  submitForm(): void {
    // Handle form submission logic here
    console.log(this.formData);
  }
}
