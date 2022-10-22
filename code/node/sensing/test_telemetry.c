#include "gps.h"
#include "adc.h"
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

#define ADC_ADDRESS    0x48
int main(int argc, char **argv, char **envp) {
	// init adc
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
        // printf("Retrieved line of length %zu:\n", read);
        // printf("   - %s", line);
		int check;
		check = check_checksum(line);
		if (check) {
			char prefix[NMEA_PRE_LEN+1];
			if (get_prefix(line, prefix) == SUCCESS) {
				if (strcmp("GNGGA", prefix) == 0) {
					struct GPSData res;
					enum ParseStatus stat;
					stat = parse_gngga(line, &res);
					if (stat==SUCCESS) {
						// Output query
						printf("&lat=%f&lon=%f&id=test-1sd4&voltage=%f\n", res.lat, res.lon, get_vbatt(0x48, 1));
						return 0;
					}
				}
			}
		}
    }

	// Close the input file
	fclose(inf);
}
