import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { HarvestService } from '../../_services/harvest/harvest.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CityService } from '../../_services/city/city.service';
import { CropService } from '../../_services/crop/crop.service';

@Component({
  selector: 'app-harvest-add',
  templateUrl: './harvest-add.component.html',
  styleUrls: ['./harvest-add.component.css']
})
export class HarvestAddComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  @ViewChild('chipList') chipList: any;
  @ViewChild('resetHarvestForm') myNgForm: any;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  harvestForm!: FormGroup;
  
  CityData: any = [];
  CropData: any = [];
  crops: string[] = [];

  constructor(public fb: FormBuilder,
    public router: Router,
    public harvestApi: HarvestService,
    public cityServices:CityService,
    public cropServices:CropService) {
      this.cityServices.GetCities().subscribe(data => {
        this.CityData = data;
        console.log(this.CityData)
        this.cropServices.GetCrops().subscribe(data => {
          this.CropData = data;
          console.log(this.CropData)
        })
      })} 

      ngOnInit(): void {
        this.submitForm();
      }
  
  submitForm() {
    this.harvestForm = this.fb.group({
      season: ['', [Validators.required]],
      year:[,[Validators.required]],
      city: [[Validators.required]],
      crops: [this.crops],
    })
  }

  changeOutputCrops(event:any) {
    console.log(event);
    if (event.checked) {
      this.crops.push(event.source.value)
      console.log(this.crops);
    } else {
      this.crops = this.crops.filter((p) => p !== event.source.value)
      console.log(this.crops);
    }
  }
  
 
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.harvestForm.controls[controlName].hasError(errorName);
  }
  
  submitHarvestForm() {
    if (this.harvestForm.invalid) {
      return;
    }
    if (this.harvestForm && this.crops.length>=1) {
      this.harvestApi.AddHarvest(
        this.harvestForm.value.season,
        this.harvestForm.value.year,
        this.harvestForm.value.city,
        this.harvestForm.value.crops,
      )
    }
  }
}
