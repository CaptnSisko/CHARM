#include "adc.h"
#include "gps.h"
#include <stdio.h>
#include <unistd.h>

// Program constants
#define ADC_ADDRESS 0x48

int main(int argc, char **argv, char **envp) {
	// Initialize ADC
	init_adc(ADC_ADDRESS);
	sleep(1);

	// Read values from devices
	struct GPSData gps_data;
	int status = get_gps_data(&gps_data);

	for (int i=0; i < 1; i++) {
		printf("Battery voltage: %f V\n", get_vbatt(ADC_ADDRESS, 1));
		sleep(1);
	}
}
