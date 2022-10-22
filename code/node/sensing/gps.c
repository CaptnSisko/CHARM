#include "gps.h"

enum ParseStatus splitter(const char* start, char** fields, size_t* field_sizes) {

}

enum ParseStatus parse_gngga(const char* start, struct GPSData* res) {

}

enum ParseStatus parse_gngll(const char* start, struct GPSData* res) {

}

enum ParseStatus parse_gngsa(const char* start, struct GPSData* res) {

}

enum ParseStatus get_prefix(const char* str, char* res) {
    // Validate start of string
    if (str[0] != '$') return CORRUPT;

    // Try and populate the output buffer
    for (int i=0; i<5; i++) {
        if (str[i] == '\0') return CORRUPT;
        res[i] = str[i+1];
    }
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
    if (str[i+1] == '\0' || str[i+2] == '\0' || str[i+3] != '\n') return 0;

    // Check checksum
    char given_checksum;
    sscanf(&str[i+1], "%2hhx", &given_checksum);
    return given_checksum == checksum;
}

// Get the GPS data
// Reference: https://blog.mbedded.ninja/programming/operating-systems/linux/linux-serial-ports-using-c-cpp/
int get_gps_data(struct GPSData* data) {
    // Open serial port with GPS
    int serial_port = open(GPS_FPATH, O_RDWR);
    if (serial_port < 0)
        printf("Error %i from open: %s\n", errno, strerror(errno));

    // Import settings for the USB port (baud rate, etc.)
    struct termios tty;
    if (tcgetattr(serial_port, &tty) != 0) 
        printf("Error %i from tcgetattr: %s\n", errno, strerror(errno));

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
    char read_buf[MAX_NMEA_LEN+2];
    while ((n=read(serial_port, &read_buf, sizeof(read_buf))) >= 0) {
        read_buf[n] = '\0';
        printf("Read %i bytes. Message: %s", n, read_buf);
    }
    if (n < 0) {
        printf("Error reading: %s", strerror(errno));
        return 1;
    }

    // Close the serial port
    close(serial_port);

    // Wait for data to come in
    return GPS_READ_SUCCESS;
}

// TODO: Add proper error return values