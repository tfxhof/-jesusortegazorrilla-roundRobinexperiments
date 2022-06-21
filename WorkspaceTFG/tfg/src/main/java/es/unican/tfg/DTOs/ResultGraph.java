package es.unican.tfg.DTOs;

import java.util.ArrayList;
import java.util.List;

public class ResultGraph {

	private String xAxisName;
	private String yAxisName;
	private List<ResultGraphItem> values = new ArrayList<ResultGraphItem>();
	
	
	/**
	 * @param xAxisName X axis name
	 * @param yAxisName Y axis name
	 * @param values: list of values of both axis
	 */
	public ResultGraph(String xAxisName, String yAxisName, List<ResultGraphItem> values) {
		super();
		this.xAxisName = xAxisName;
		this.yAxisName = yAxisName;
		this.values = values;
	}

	
	public String getxAxisName() {
		return xAxisName;
	}

	public void setxAxisName(String xAxisName) {
		this.xAxisName = xAxisName;
	}

	public String getyAxisName() {
		return yAxisName;
	}

	public void setyAxisName(String yAxisName) {
		this.yAxisName = yAxisName;
	}

	public List<ResultGraphItem> getValues() {
		return values;
	}

	public void setValues(List<ResultGraphItem> values) {
		this.values = values;
	}
	
}
