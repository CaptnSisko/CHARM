#include "gps.h"
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int main(int argc, char **argv, char **envp) {
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
        printf("Retrieved line of length %zu:\n", read);
        printf("   - %s", line);
		int check;
		printf("   - Line checksum: %i\n", (check = check_checksum(line)));
		if (check) {
			char prefix[NMEA_PRE_LEN+1];
			if (get_prefix(line, prefix) == SUCCESS) {
				printf("   - Prefix: %s\n", prefix);
			}
		}
    }

	// Close the input file
	fclose(inf);
}
