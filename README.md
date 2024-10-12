# VSdisplay - VSCapture Data Visualization Tool

## Overview
This is a prototype to feed CSV data generated from VSCapture into a basic chart and an information display.

### Javascript functions
The Javascript functions are outlined below:

#### createFrame
It creates a row, called a "Frame", which contains a chart and an information display box. The info box displays the most recent numerical data recorded in the datastream by default.

#### createChart
It creates a javascript chartjs object to fit inside the specified frame.

#### renderData
This function receives 5 parameters. It receives CSV data and then pre-processes the timestamp of CSV into JavaScript Epoch Time (which is to be used by chartjs). The y-axis data is assumed to be numerical in nature. 
1. sourceObjectCSV refers to CSV data
2. xDataName is the x-axis variable. It is "Time" by default.
3. yDataName is the y-axis variable.
4. idnum is the chart id
5. param1 is the additional parameter for time manipulation, if set to "MMDDYYYY" it assume "MMDDYYY" as the input time format for the CSV data. Otherwise taken as "DDMMYYYY" by default.

#### customFunction
Currently, for Demo purposes, this generates the chart and info output based on the CSV data received.
