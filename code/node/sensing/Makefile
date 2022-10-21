# Main compiler
CC := gcc

# Target device ID
DEV_ID := a390

# Program executable name
EXE_NAME := telemetry

all: $(EXE_NAME)

adc.o:
	$(CC) $(CFLAGS) adc.h adc.c -c -l$(LIB)

$(EXE_NAME): adc.o
	@echo "--- Compiling C program ---"
	$(CC) $(CFLAGS) $(EXE_NAME).c adc.o -o$(EXE_NAME) $(LDFLAGS) -l$(LIB)
	@echo "--- Attempting to push the file onto the Omega2S+ ---"
	sshpass -f "./onionPasswd.txt" scp $(EXE_NAME) root@omega-$(DEV_ID).local:/root/ 

clean:
	@rm -rf $(EXE_NAME) $(TARGET2) *.o
