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

// General GPS Data
struct GPSData {
    float lat;
    float lon;
    uint8_t sats;
} GPSData;

// Parsing function return value
enum ParseStatus {
    MISSING_DATA, 
    SUCCESS,
    FAILURE
};

// Device path in linux
#define GPS_FPATH "/dev/ttyACM0"

// Status of GPS read
#define GPS_READ_SUCCESS    0
#define GPS_FAILURE         1
#define GPS_TIMEOUT         2

// NMEA Constants
#define MAX_NMEA_LEN        82
#define NMEA_PRE_LEN        5

// Define a method to get latest GPS data
int get_gps_data(struct GPSData* data);

// Parsing logic
enum ParseStatus splitter(const char* str, char** fields, size_t* field_sizes);
enum ParseStatus parse_gngga(const char* str, struct GPSData* res);
enum ParseStatus parse_gngll(const char* str, struct GPSData* res);
enum ParseStatus parse_gngsa(const char* str, struct GPSData* res);
enum ParseStatus get_prefix(const char* str, char* res);
int check_checksum(const char* str);
