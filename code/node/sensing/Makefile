# Main compiler
CC := gcc

# Target device ID
# DEV_ID:=abd3
# WRT_IP:=192.168.10.5

# Executable 
EXE_NAME := telemetry
EXE_NAME_TEST := test_telemetry

all: $(EXE_NAME)

gps.o:
	$(CC) $(CFLAGS) gps.h gps.c -c -l$(LIB)

adc.o:
	$(CC) $(CFLAGS) adc.h adc.c -c -l$(LIB)

$(EXE_NAME): gps.o adc.o
	@echo "--- Compiling C Program ---"
	$(CC) $(CFLAGS) $(EXE_NAME).c adc.o gps.o -o$(EXE_NAME) $(LDFLAGS) -l$(LIB)
	# @echo "--- Attempting to push the file onto the Omega2S+ ---"
	# sshpass -f .onionPasswd scp $(EXE_NAME) post_script.sh .key root@$(WRT_IP):/root/ 

test: gps.o adc.o
	@echo "--- Compiling Unit Test Program ---"
	$(CC) $(CFLAGS) $(EXE_NAME_TEST).c gps.o adc.o -o$(EXE_NAME_TEST) $(LDFLAGS) -l$(LIB)
	# @echo "--- Attempting to push the files onto the Omega2S+ ---"
	# sshpass -f .onionPasswd scp $(EXE_NAME_TEST) gps.out post_script.sh .key root@$(WRT_IP).local:/root/ 

clean:
	@rm -rf $(EXE_NAME) $(EXE_NAME_TEST) $(TARGET2) *.o *.gch
