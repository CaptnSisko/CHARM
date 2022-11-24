#include "adc.h"

// Initialize the ADC
void init_adc(const uint8_t addr) {
	// Configure ADC for continuous conversion mode
	uint8_t CONFIG_BUFFER[] = {0x84, 0x83};
	int status = i2c_writeBuffer(0, addr, 1, CONFIG_BUFFER, 2);

	// Check success
	if (status != EXIT_SUCCESS) printf("ADC configuration failure!\n");

	// Point to conversion register
	status = i2c_writeBuffer(0, addr, 0, NULL, 0);

	// Check success
	if (status != EXIT_SUCCESS) printf("ADC address re-assignment failure!\n");
}

// Get the voltage of the battery
double get_vbatt(const uint8_t addr, const double conv_weight, const double conv_bias) {
	// Get value in the conversion register
	uint8_t buf[2];
	int status = i2c_read(0, addr, 0, buf, 2);

	// Check success
	if (status != EXIT_SUCCESS) printf("ADC Read Failure!\n");

	// Process value in register
	int16_t reg_val = buf[0];
	reg_val = (reg_val <<= 8) + buf[1];

	// Compute voltage
	return (reg_val * 0.0001875 * conv_weight) + conv_bias;
}
