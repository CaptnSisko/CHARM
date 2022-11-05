#include "gps.h"

enum ParseStatus splitter(char* str, const int field_count, char** fields) {
    // Iterate through the string, populating fields with pointers
    int field = 0;
    for (int i=0; str[i] != '\0' && str[i] != '\n' && field < field_count; i++) {
        if (str[i] == ',') {
            fields[field] = &str[i+1];
            field++;
        }
    }
    if (field == field_count) return SUCCESS;
    return CORRUPT;
}

float dms2decimal(char* str) {
    // Find the position of the decimal
    int i; for(i = 0; str[i] != '.'; i++);

    // Parse the minutes
    float minutes; sscanf(&str[i-2], "%f", &minutes);

    // Parse the degrees
    char deg[4];
    for (int j = 0; j < i-2; j++) deg[j] = str[j];
    deg[i-2] = '\0';
    int degrees; sscanf(deg, "%d", &degrees);

    // Compute decimal
    return degrees + (minutes / 60);
}

enum ParseStatus parse_gngga(char* str, struct GPSData* res) {
    // Split the input string
    enum ParseStatus status;
    char* fields[GGA_FIELD_CNT];
    if ((status = splitter(str, GGA_FIELD_CNT, fields) != SUCCESS)) return status;

    // Data validation
    if (
        fields[GGA_LAT][0]      == ',' ||
        fields[GGA_LAT_DIR][0]  == ',' ||
        fields[GGA_LON][0]      == ',' ||
        fields[GGA_LON_DIR][0]  == ',' ||
        fields[GGA_FIX_QUAL][0] == ','
    ) return MISSING_DATA;
    if (fields[GGA_FIX_QUAL][0] == ',') return FAILURE;

    // Parse latitude and longitude
    res->lat = dms2decimal(fields[GGA_LAT_DIR]);
    res->lat = fields[GGA_LAT_DIR][0] == 'S' ? -1 * res->lat : res->lat;

    res->lon = dms2decimal(fields[GGA_LON_DIR]);
    res->lon = fields[GGA_LON_DIR][0] == 'W' ? -1 * res->lon : res->lon;

    // Success in parsing
    return SUCCESS;
}

enum ParseStatus parse_gngll(const char* str, struct GPSData* res) {
    // TODO: Stretch, parse GNGLL packets
}

enum ParseStatus parse_gngsa(const char* str, struct GPSData* res) {
    // TODO: Stretch, parse GNGSA packets
}

enum ParseStatus get_prefix(const char* str, char* res) {
    // Validate start of string
    if (str[0] != '$') return CORRUPT;

    // Try and populate the output buffer
    for (int i=0; i<5; i++) {
        if (str[i] == '\0') return CORRUPT;
        res[i] = str[i+1];
    }
    res[5] = '\0';
    return SUCCESS;
}

int check_checksum(const char* str) {
    // Validate start of string
    if (str[0] != '$') return 0;

    // Compute checksum
    int i;
    char checksum = 0;
    for(i=1; str[i] != '*' && str[i] != '\0'; i++) checksum ^= str[i];

    // No asterisk
    if (str[i] != '*') return 0;

    // Validate string ending format
    if (str[i+1] == '\0' || str[i+2] == '\0') return 0;

    // Check checksum
    char given_checksum;
    sscanf(&str[i+1], "%2hhx", &given_checksum);
    return given_checksum == checksum;
}

// Get the GPS data
// Reference: https://blog.mbedded.ninja/programming/operating-systems/linux/linux-serial-ports-using-c-cpp/
enum ParseStatus get_gps_data(struct GPSData* data) {
    // Open serial port with GPS
    int serial_port = open(GPS_FPATH, O_RDWR);
    if (serial_port < 0) {
        printf("Error %i from open: %s\n", errno, strerror(errno));
        return FAILURE;
    }

    // Import settings for the USB port (baud rate, etc.)
    struct termios tty;
    if (tcgetattr(serial_port, &tty) != 0) {
        printf("Error %i from tcgetattr: %s\n", errno, strerror(errno));
        return FAILURE;
    }

    // Clear USB parity bit
    tty.c_cflag &= ~PARENB;

    // One stop bit in communication
    tty.c_cflag &= ~CSTOPB;

    // 8 bits per byte across serial port
    tty.c_cflag &= ~CSIZE;
    tty.c_cflag |= CS8;

    // Disable RTS/CTS flow control
    tty.c_cflag &= ~CRTSCTS;

    // Allows data reading
    tty.c_cflag |= CREAD | CLOCAL;

    // Enable canonical mode (diff than tutorial)
    tty.c_lflag |= ICANON;

    // Disable echoin
    tty.c_lflag &= ~ECHO;
    tty.c_lflag &= ~ECHOE;
    tty.c_lflag &= ~ECHONL;

    // Disable interruption signals
    tty.c_lflag &= ~ISIG;

    // Miscellaneous I/O settings
    tty.c_iflag &= ~(IXON | IXOFF | IXANY);
    tty.c_iflag &= ~(IGNBRK|BRKINT|PARMRK|ISTRIP|INLCR|IGNCR|ICRNL);
    tty.c_oflag &= ~OPOST;
    tty.c_oflag &= ~ONLCR;

    // Blocking read for 2 seconds with timeout
    tty.c_cc[VTIME] = 20;
    tty.c_cc[VMIN] = 0;

    // Set in/out baud rate to be 38400
    cfsetispeed(&tty, B38400);
    cfsetospeed(&tty, B38400);

    // Save tty settings
    if (tcsetattr(serial_port, TCSANOW, &tty) != 0)
        printf("Error %i from tcsetattr: %s\n", errno, strerror(errno));

    // Read buffer
    int n;
    char line[MAX_NMEA_LEN+2];
    while ((n=read(serial_port, &line, sizeof(line))) >= 0) {
        line[n] = '\0';

        // Check sentence checksum
        int check = check_checksum(line);
        if (!check) return CORRUPT;

        // Execute parsing function based on prefix
        enum ParseStatus stat;
        char prefix[NMEA_PRE_LEN+1];
        if ((stat = get_prefix(line, prefix)) == SUCCESS) {
            if (strcmp("GNGGA", prefix) == 0) {
                return parse_gngga(line, data);
            }
        }
        return stat;
    }
    if (n < 0) {
        printf("Error reading: %s", strerror(errno));
        return FAILURE;
    }

    // Close the serial port
    close(serial_port);
    return FAILURE;
}
