
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator} from '@angular/material/paginator'
import {MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort';
import { Harvest } from '../../_models/harvest';
import { HarvestService } from '../../_services/harvest/harvest.service';
import { CityService } from '../../_services/city/city.service';
import { CropService } from '../../_services/crop/crop.service';

@Component({
  selector: 'app-harvest-view',
  templateUrl: './harvest-view.component.html',
  styleUrls: ['./harvest-view.component.css']
})
export class HarvestViewComponent implements OnInit {
  CityData: any = [];
  CropData: any = [];
  CityName: any ;
  CropName: any =[];
  HarvestData: any = [];
  dataSource!: MatTableDataSource<Harvest>;
  @ViewChild(MatSort,{ static: false }) sort!: MatSort;
  @ViewChild(MatPaginator,{ static: false }) paginator!: MatPaginator;
  displayedColumns: string[] = ['season','year','city','crops','action'];
  

  constructor(private harvestApi: HarvestService,
    public cityServices:CityService,
    public cropServices:CropService) {
    this.harvestApi.GetHarvests().subscribe(data => {
      this.cityServices.GetCities().subscribe(data => {
        this.CityData = data;
        console.log(this.CityData)
        this.cropServices.GetCrops().subscribe(data => {
          this.CropData = data;
          console.log(this.CropData)
        })
      })
      this.HarvestData = data;
    
      console.log(this.HarvestData)
      this.dataSource = new MatTableDataSource<Harvest>(this.HarvestData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 0);
    })    
  }

  ngOnInit() {
  
   }

  DeleteHarvest(index: number, e:any){
    if(window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.harvestApi.DeleteHarvest(e._id).subscribe()
    }
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
