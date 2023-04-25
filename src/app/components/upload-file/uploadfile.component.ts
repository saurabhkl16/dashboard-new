import { Component } from '@angular/core';
import { DashboardService } from 'src/app/dashboard.service';
import * as d3 from 'd3';

@Component({
  selector: 'uploadfile',
  templateUrl: './uploadfile.template.html',
  styleUrls: ['./uploadfile.component.scss'],
})
export class UploadfileComponent {
  public disableGenGraphBtn: boolean = true;
  constructor(private dashboardService: DashboardService) {}

  getFileDetails(event: any) {
    this.dashboardService.csvFileDetails = [];
    const file = event.target.files[0];
    if (file.name.endsWith('.csv')) {
      d3.selectAll("svg>*").remove();
      this.disableGenGraphBtn = false;
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        let csv = reader.result;
        let csvData = (<string>csv).split(/\r\n|\n/);
        for (let i = 1; i < csvData.length - 1; i++) {
          let s = csvData[i].split(',');
          let marks = { Subject: '', Marks: '', Total: '' };
          marks.Subject = s[0];
          marks.Marks = s[1];
          marks.Total = s[2];
          this.dashboardService.csvFileDetails.push(marks);
        }
      };
    } else {
      alert('Only CSV file supported');
    }
  }

  drawBarGraph() {
    if (this.dashboardService.csvFileDetails.length > 0) {
      this.dashboardService.createSvg();
      this.dashboardService.drawBars();
    }
  }
}
