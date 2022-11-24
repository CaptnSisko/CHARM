#include "adc.h"
#include "gps.h"
#include <stdio.h>
#include <unistd.h>
#include <curl/curl.h>

// Program constants
// TODO: Change to read these from a file
#define ADC_ADDRESS    0x48
#define ADC_WEIGHT     2.415
#define ADC_BIAS	   2.119

int main(int argc, char **argv, char **envp) {
	// Read from GPS
	struct GPSData gps_data;
	enum GPSParseStatus status = get_gps_data(&gps_data);
	if (status != SUCCESS) {
		printf("Failed to retrieve GPS Data! Error code: %d\n", status);
		return -1;
	}

	// Initialize ADC
	init_adc(ADC_ADDRESS);
	sleep(1);

	// Read from ADC
	float vbatt = get_vbatt(ADC_ADDRESS, ADC_WEIGHT, ADC_BIAS);

	// Print the data for POST script
	printf("lat=%f&lon=%f&voltage=%f\n", gps_data.lat, gps_data.lon, vbatt);
	return 0;
}
