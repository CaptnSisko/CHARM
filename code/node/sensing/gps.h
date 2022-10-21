// C headers
#include <stdio.h>
#include <stdint.h>
#include <unistd.h>
#include <string.h>

// Linux headers
#include <fcntl.h>
#include <errno.h>
#include <termios.h>
#include <unistd.h>

// Define a struct for GPS data
struct GPSData {
    float lat;
    float lon;
    uint8_t sats;
} GPSData;

// Device path in linux
#define GPS_FPATH "/dev/ttyACM0"

// Status of GPS read
#define GPS_READ_SUCCESS    0
#define GPS_MISSING_DATA    1
#define GPS_TIMEOUT         2
#define GPS_FAILED_OPEN     3

// Define a method to get latest GPS data
int get_gps_data(struct GPSData* data);
