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
} GPSData;

// Parsing function return value
enum ParseStatus {
    CORRUPT,
    MISSING_DATA, 
    SUCCESS,
    FAILURE
};

// Device path in linux
#define GPS_FPATH "/dev/ttyACM0"

// NMEA Constants
#define MAX_NMEA_LEN        82
#define NMEA_PRE_LEN        5

// Number of fields for sentence types
#define GGA_FIELD_CNT     14
#define GGA_LAT           1
#define GGA_LAT_DIR       2
#define GGA_LON           3
#define GGA_LON_DIR       4
#define GGA_FIX_QUAL      5

// Define a method to get latest GPS data
enum ParseStatus get_gps_data(struct GPSData* data);

// General parsing functions
int check_checksum(const char* str);
enum ParseStatus get_prefix(const char* str, char* res);
enum ParseStatus splitter(char* str, const int field_count, char** fields);

// Sentence-specific parsers
enum ParseStatus parse_gngga(char* str, struct GPSData* res);
enum ParseStatus parse_gngll(const char* str, struct GPSData* res);
enum ParseStatus parse_gngsa(const char* str, struct GPSData* res);
