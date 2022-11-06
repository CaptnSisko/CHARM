#include "gps.h"
#include "adc.h"
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

#define ADC_ADDRESS    0x48
#define ADC_WEIGHT     2.415
#define ADC_BIAS	   2.119

int main(int argc, char **argv, char **envp) {
	// Initialize the ADC
	init_adc(ADC_ADDRESS);

	// Validate arguments
	if (argc < 2) {
		printf("Please provide an input file with GPS data to parse!\n");
		return -1;
	}

	// Open the input file
	FILE* inf = fopen(argv[1], "r");
	if (inf == NULL) {
		printf("Filepath passed is invalid!\n");
		return -1;
	}

	// Read the file lines
	ssize_t read;
	char line[MAX_NMEA_LEN+2];
	char* lineptr = line;
	size_t len = MAX_NMEA_LEN+2;
	while ((read = getline(&lineptr, &len, inf)) != -1) {
		// Line is too short to do anything with
		if (read < NMEA_PRE_LEN) continue;

		// Valid line
		int check;
		check = check_checksum(line);
		if (check) {
			char prefix[NMEA_PRE_LEN+1];
			if (get_prefix(line, prefix) == SUCCESS) {
				if (strcmp("GNGGA", prefix) == 0) {
					struct GPSData res;
					enum GPSParseStatus stat;
					if ((stat = parse_gngga(line, &res))==SUCCESS) {
						// Output ADC values and GPS data values
						printf("--- GPS Data ---\n    %f\n    %f\n", res.lat, res.lon);
						printf("ADC Battery Voltage: %fV\n", get_vbatt(ADC_ADDRESS, ADC_WEIGHT, ADC_BIAS));
						return 0;
					}
				}
			}
		}
    }

	// Close the input file
	fclose(inf);
}
