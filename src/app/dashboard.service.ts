import { Injectable } from '@angular/core';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  public csvFileDetails: any = [];
  private svg: any;
  private margin = 50;
  private width = 750 - this.margin * 2;
  private height = 400 - this.margin * 2;

  public createSvg(): void {
    this.svg = d3
      .select('figure#bar')
      .append('svg')
      .attr('width', this.width + this.margin * 2)
      .attr('height', this.height + this.margin * 2)
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  public drawBars(): void {
    const x = d3
      .scaleBand()
      .range([0, this.width])
      .domain(this.csvFileDetails.map((d: any) => d.Subject))
      .padding(0.2);

    this.svg
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    const y = d3.scaleLinear().domain([0, 100]).range([this.height, 0]);

    this.svg.append('g').call(d3.axisLeft(y));

    this.svg
      .selectAll('bars')
      .data(this.csvFileDetails)
      .enter('fjjfjjf')
      .append('rect')
      .attr('x', (d: any) => x(d.Subject))
      .attr('y', (d: any) => y(d.Marks))
      .attr('width', x.bandwidth())
      .attr('height', (d: any) => this.height - y(d.Marks))
      .attr('fill', '#d04a35');
  }
}
