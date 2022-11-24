#include "adc.h"
#include "gps.h"
#include <stdio.h>
#include <unistd.h>
#include <curl/curl.h>

// Program constants
#define ADC_ADDRESS    0x48

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

	// Read ADC parameters (line 1 is weight)
	char buf[128];
	double params[2];
	FILE* fp = fopen("/root/adc_params.txt", "r");
	if (fp == NULL) return -1;
	for (int idx = 0; fgets(buf, 128, fp) && idx < 2; idx++) params[idx] = atof(buf);

	// Read from ADC
	float vbatt = get_vbatt(ADC_ADDRESS, params[0], params[1]);

	// Print the data for POST script
	printf("lat=%f&lon=%f&voltage=%f\n", gps_data.lat, gps_data.lon, vbatt);
	return 0;
}
