import { Component, OnInit } from '@angular/core';
import { DoctorService } from './doctor.service';
import { Doctor } from './doctor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Sharp Code Challenge';
  familyPracticeDoctors: Doctor[] = [];
  pediatricDoctors: Doctor[] = [];

  constructor(private doctorService: DoctorService) { }

  ngOnInit() {
    this.getDoctors();
  }

  getDoctors(): void {
    this.doctorService.getDoctors()
      .subscribe(doctors => {
        // the member variables below will hold collections of doctors that are bound to the app.component.html template
        this.familyPracticeDoctors = this.processDoctorArray(doctors, 'FamilyPractice');
        this.pediatricDoctors = this.processDoctorArray(doctors, 'Pediatrics');
      });
  }

 /**
  * Sort array of doctor objects based on review count in ascending or descending order
  * @param doctors - array to sort
  * @param {string} [order]- order in which to sort 'asc' or 'desc'
  */
  sortDoctorArrayOnReviewCoun(doctors, order) {

    // If the proper value for odering is not provided return unsorted list
    const allowedValues = ['desc', 'asc']
    if (!allowedValues.includes(order.toLocaleLowerCase())) { return doctors; }

    if (order.toLocaleLowerCase() === 'desc') {
      doctors.sort((a, b) => {
        if (a.reviewCount < b.reviewCount) { return 1; }
        else {return -1; }
      })
    } 
    else if (order.toLocaleLowerCase() === 'asc') {
      doctors.sort((a, b) => {
        if (a.reviewCount > b.reviewCount) { return 1; }
        else {return -1 ;}
      })
    }
  }

  /**
   * Filter Doctor Array on a specific property
   * @param doctors - array to sort
   * @param filter - 
   */
  filterDoctorArraybyPractice(doctors, practiceToFilter) {
    // If no filter is provided, return unfiltered array
    if (practiceToFilter === '') { return doctors; }

    return doctors.filter(practice => practiceToFilter === practice.specialty)
  }


  processDoctorArray(doctors, practiceType): Doctor[] {
    //console.log(doctors);

    var docs = doctors
    if (practiceType !== '') {
      docs = this.filterDoctorArraybyPractice(docs, practiceType)
    } 
    
    console.log(docs)
    this.sortDoctorArrayOnReviewCoun(docs, 'desc');

    return docs;
  }
}
