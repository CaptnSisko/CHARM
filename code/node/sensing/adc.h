#include <stdio.h>
#include <stdlib.h>
#include <onion-i2c.h>

// Initialize ADC at I2C address addr
void init_adc(const uint8_t addr);

// Read battery voltage from ADC at I2C address addr, with the PCB conversion constant
float get_vbatt(const uint8_t addr, const float conv_weight, const float conv_bias);
