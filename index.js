class ChartComponent extends HTMLElement {
	connectedCallback() {
		let num = this.id.slice(7);
		this.innerHTML = `
		<div class="chart-outer">
			<div class="chart-left">
				<div class='chart-header' id='chart-header-${num}'>
					Element ${num}
				</div>
				<div class='chart-container' id='chart-container-${num}'>
					<canvas id="chart${num}">
				</div>
			</div>
			<div class="chart-right">
				<div class="chart-right-upper" id="chart-info-${num}">31</div>
				<div class="chart-right-lower" id="chart-desc-${num}">Lorem ipsum</div>
			</div>
		</div>
		`;
	}
}

customElements.define("x-chart-component", ChartComponent);

chartObjects = {};

infoObjects = {};

function createChart(param, inputData) {
	if (inputData == undefined) { 
		inputData = {};
	}
	ctx = document.getElementById("chart" + param).getContext('2d');
	chartObjects[param] = new Chart(ctx, {
		type: 'line',
		data: {inputData},
		options: commonChartOptions
	})
}

function updateInfo(param1,param2) {

}

commonChartOptions = {

	    	maintainAspectRatio: false,
	    	interaction: {

	    	},
	    	scales: {
	    		y: {
	    			display: true,
	    			min: 0,
	    			max: 5,
	    			grid: {
	    				color: "rgba(255,255,255,0.2)",
	    				borderColor: "rgba(255,255,255,0.2)"
	    			},
	    			ticks: {
	    				color: "rgba(255,255,255,0.6)"
	    			},
					title: {
						display: true,
						text:'Concentration'
					}
	    		},
	    		x: {
	    			type: 'linear',
	    			display: true,
	    			position:'bottom',
	    			min:0,
	    			max:20,
	    			grid: {
	    				color: "rgba(255,255,255,0.2)",
	    				borderColor: "rgba(255,255,255,0.2)"
	    			},
	    			ticks: {
	    				color: "rgba(255,255,255,0.6)"
	    			},
					title: {
						display: true,
						text:'Time (minutes)'
					}
	    		}
	    	},
	        animation: {
	        	duration: 200
	        },
	        transitions: {
	        	active: {
	        		animation: {
	        			duration: 200
	        		}
	        	}
	        },

		    plugins: { //start plugins
		    	//shadingArea,
			    legend: {
			    		onClick: null,
				    	labels: {
				    	boxWidth: 20,
				    	filter: function(item, chart) {
				    		var index = item.datasetIndex;
				    		if ((index <= 1) || (index >= drug_sets.length*2+2)) {
				    			return false;
				    		} else {
				    			return true;
				    		}
				    	}
			    	}
			    },
			    tooltip: {
			    	mode: 'index',
			    	intersect: false,
			    	footerFont: {
			    		weight: 'normal',
			    		size: 10
			    	},
	            	filter: function(tooltipItem, data) {
	            		var index = tooltipItem.datasetIndex;
	            		if ((index >= 2) && (index <=5)) {
	            			return true;
	            		} else {
	            			return false;
	            		}
	            	},
	            	position: 'nearest',
	            	caretSize: 0,
	            	backgroundColor: 'rgba(0,0,0,0.5)',
					callbacks: {
						title: function(context) {
							var title = context[0].parsed.x || "";
							if (title) {
								title = title*60; //to s
								return converttime(title);
							}
						},
						
	                	label: function(context) {
	                		
	                    	var label = context.dataset.label || '';

	                    	if (label) {
	                    		if ((label == "Cp-Prop") || (label == "Cp-Remi") || (label == "Cp-Fen") || (label == "Cp-Alfen")) label = "Cp:";
	                    		if ((label == "Ce-Prop") || (label == "Ce-Remi") || (label == "Ce-Fen") || (label == "Ce-Alfen")) label = "Ce:";
		                    	label += Math.round(context.parsed.y * 100) / 100;
		                    	return label;
	                    	}
	                	},

	                	footer: function(tooltipItems) {

	                		var infrate = "Inf rate: ";

	                		var vitext = "VI: ";

	                		var parsedx = tooltipItems[0].parsed.x;

	                		infrate = infrate + getinfusionrate(parsedx * 60,active_drug_set_index) + "ml/h";

	                		vitext = vitext + Math.round(drug_sets[active_drug_set_index].volinf[Math.round(parsedx*60)]*10)/10 + "ml";

	                		if ((PD_mode == 1) && (active_drug_set_index == 0)) {
	                			PD_text = "eBIS: " + BIS_array[Math.round(parsedx*60)];
	                			return [infrate, vitext, PD_text];
	                		} else if ((PD_mode == 2) && (ptolcouplesarray.length>0)) {
	                			temp_ptol_elem = ptolcouplesarray[Math.round(parsedx*2)];
	                			if (temp_ptol_elem == undefined) {
	                				PD_text = "";
	                			} else {
	                				PD_text = "PTOL: " + Math.round(temp_ptol_elem.meta_ptol * 100);
	                			}
	                			return [infrate, vitext, PD_text];
	                		} else {
	                			return [infrate, vitext];	
	                		}

	                		

	                	}
	                	
	                }
			    },
		    	crosshair: {
		    		line: {
		    			color: '#66F',
		    			width: 1,
		    			//dashPattern: [20,5]
		    		},
			        sync: {
			          enabled: true,            // enable trace line syncing with other charts
			          group: 1,                 // chart group
			          suppressTooltips: false   // suppress tooltips when showing a synced tracer
			        },
			        zoom: {
			        	enabled: false,
			        }
		    	},
		    	/*
		    	annotation: {
		    		annotations: {
		    			line0: {
		    				type: 'line',
		    				drawTime: 'beforeDatasetsDraw',
		    				xMin: getEventLine(0),
		    				xMax: getEventLine(0),
		    				borderColor: 'rgba(255,0,0,0.2)',
		    				borderWidth: 2,
		    				label: {
		    					content: getEventLabel(0),
		    					enabled: true
		    				}
		    			}
		    		}
		    	}
		    	*/
		    } //endplugins
}