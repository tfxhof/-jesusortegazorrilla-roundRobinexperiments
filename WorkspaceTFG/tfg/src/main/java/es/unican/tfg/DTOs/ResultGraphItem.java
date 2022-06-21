package es.unican.tfg.DTOs;

public class ResultGraphItem {

	private double xAxisValue;
	private double yAxisValue;

	
	/**
	 * @param xAxisValue
	 * @param yAxisValue
	 */
	public ResultGraphItem(double xAxisValue, double yAxisValue) {
		super();
		this.xAxisValue = xAxisValue;
		this.yAxisValue = yAxisValue;
	}


	public double getxAxisValue() {
		return xAxisValue;
	}


	public void setxAxisValue(double xAxisValue) {
		this.xAxisValue = xAxisValue;
	}


	public double getyAxisValue() {
		return yAxisValue;
	}


	public void setyAxisValue(double yAxisValue) {
		this.yAxisValue = yAxisValue;
	}
		
}
