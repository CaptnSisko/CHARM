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

// Post via curl 
int post_telemetry(struct GPSData* data, float vbatt) {
	CURL* curl;
	CURLcode res;

	// Intialization
  	curl_global_init(CURL_GLOBAL_ALL);
	curl = curl_easy_init();

	if(curl) {
		// Set URL and parameters
		curl_easy_setopt(curl, CURLOPT_URL, "http://postit.example.com/moo.cgi");
		curl_easy_setopt(curl, CURLOPT_POSTFIELDS, "name=daniel&project=curl");

		// Check for success	
		res = curl_easy_perform(curl);
		if(res != CURLE_OK)
			fprintf(stderr, "curl_easy_perform() failed: %s\n", curl_easy_strerror(res));
	
		// Clean up after request
		curl_easy_cleanup(curl);
	}

	// Clean up global init
	curl_global_cleanup();

	// Return value
	return res != CURLE_OK;
}

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

	// TODO: Send out the data via curl
	printf("Attempting to push data via curl!\n");
	return post_telemetry(&gps_data, vbatt);
}
