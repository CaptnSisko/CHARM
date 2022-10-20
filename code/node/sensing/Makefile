# Main compiler
CC := gcc

# Target device ID
DEV_ID := a390

# Program executable name
EXE_NAME := helloWorld

all: $(EXE_NAME)

# Insert -l$(LIB) on line 15 when outside libraries are required
$(EXE_NAME): 
	@echo "--- Compiling C program ---"
	$(CC) $(CFLAGS) $(EXE_NAME).c -o $(EXE_NAME) $(LDFLAGS)
	@echo "--- Attempting to push the file onto the Omega2S+ ---"
	sshpass -f "./onionPasswd.txt" scp $(EXE_NAME) root@omega-$(DEV_ID).local:/root/ 

clean:
	@rm -rf $(EXE_NAME) $(TARGET2)
