#include "adc.h"
#include <stdio.h>
#include <unistd.h>

int main(int argc, char **argv, char **envp) {
	// Initialize devices
	init_adc(0x48);
	sleep(1);

	// Read values from devices
	for (int i=0; i < 1; i++) {
		printf("Battery voltage: %f V\n", get_vbatt(0x48, 1));
		sleep(1);
	}
}
