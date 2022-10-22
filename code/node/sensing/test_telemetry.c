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
	char* line = NULL;
	ssize_t read;
	size_t len = 0;
	while ((read = getline(&line, &len, inf)) != -1) {
        printf("Retrieved line of length %zu:\n", read);
        printf("%s", line);
    }

	// Close the input file
	fclose(inf);

	// Free memory for line
	if (line) free(line);

	// Read values from devices
	struct GPSData gps_data;
	int status = get_gps_data(&gps_data);
}
