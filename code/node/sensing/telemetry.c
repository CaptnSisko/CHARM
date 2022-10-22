#include "adc.h"
#include "gps.h"
#include <stdio.h>
#include <unistd.h>

// Program constants
#define ADC_ADDRESS    0x48

int main(int argc, char **argv, char **envp) {
	// Initialize ADC
	init_adc(ADC_ADDRESS);
	sleep(1);

	// Read values from devices
	struct GPSData gps_data;
	int status = get_gps_data(&gps_data);
}
