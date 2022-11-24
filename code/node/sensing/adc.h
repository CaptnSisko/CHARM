#include <stdio.h>
#include <stdlib.h>
#include <onion-i2c.h>

// Initialize ADC at I2C address addr
void init_adc(const uint8_t addr);

// Read battery voltage from ADC at I2C address addr, with the PCB conversion constant
double get_vbatt(const uint8_t addr, const double conv_weight, const double conv_bias);
