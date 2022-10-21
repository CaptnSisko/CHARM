#include "gps.h"

// Get the GPS data from input file 
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
    char read_buf[4096];
    while ((n=read(serial_port, &read_buf, sizeof(read_buf))) >= 0) {
        printf("Error reading: %s", strerror(errno));
        return 1;
    }
    if (n)

    // Print the buffer
    printf("Read %i bytes. Message: %s", n, read_buf);

    // Close the serial port
    close(serial_port);

    // Wait for data to come in
    return GPS_READ_SUCCESS;
}

// TODO: Add proper error return values