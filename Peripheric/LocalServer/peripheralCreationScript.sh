#!/bin/bash

#Print a message with the parameters to pass. first arg=Bluetooth address, 2nd arg=rfcomm channel

if [ $# -lt 2 ]
then
    echo "default usage: ./peripheralCreationScript.sh <bluetoothAddress> <rfcomm channel> [verbose]"
    exit 0
fi

if [ $# -eq 3 ]
then
    if [ $3 = 'true' ]
    then
        echo 'verbose=true'
        is_verbose=true
    else
        is_verbose=false
    fi
fi

print_message(){

    if [ "$is_verbose" = true ]
    then
        echo $@
    fi
}

coproc pfeProc { 
	sudo bluetoothctl
}

sendToProcess(){
    echo -e $1'\n' >&"${pfeProc[1]}"
}

startAgent(){
    sendToProcess 'agent on'
    sleep 2
}

setDefaultAgent(){
    sendToProcess 'default-agent'
    sleep 2
}

startScan(){
    print_message 'Scanning devices...'
    sendToProcess 'devices'
    sleep 1
    readProcessResponse processResponse
    if [[ $processResponse =~ .*$1.* ]]
        then
            echo $processResponse
            print_message 'Device already scanned'
        else
        sendToProcess 'scan on'
        sleep 10
    fi
}

pairDevice(){

    sendToProcess 'pair '$1
    print_message 'Pairing device...'
    sleep 8
}

removeDevice(){
    sendToProcess 'remove '$1
    print_message 'Removing '$1
    sleep 5
}

readProcessResponse(){
    local __resultvar=$1
    local response=''
    while read -t 1 -u "${pfeProc[0]}" line; do
	    response=$response$line
    done
    
    eval $__resultvar="'$response'"
}

setPinCode(){
    sendToProcess $1
    sleep 2
}


startAgent

setDefaultAgent
readProcessResponse processResponse
print_message $processResponse
startScan $1
readProcessResponse processResponse
print_message $processResponse
pairDevice $1
readProcessResponse processResponse
print_message $processResponse
#
setPinCode '1234'
readProcessResponse processResponse



if [[ $processResponse =~ .*Pairing\ successful.* ]]
then
    print_message $processResponse
    sudo rfcomm bind $2 $1
# elif [[ $processResponse =~ .*Failed\ to\ pair:\ org\.bluez\.Error\.AuthenticationFailed.* ]]
# then
#     pairDevice $1
#     setPinCode '1234'
#     readProcessResponse processResponse
#     echo $processResponse
#     #TODO: Refactor to avoid repeating code
#     if [[ $processResponse =~ .*Pairing\ successful.* ]]
#         then
#             sudo rfcomm bind $2 $1
#         fi
else
    print_message $processResponse
fi


#Handle this at rfcomm bind command -> Can't create device: Address already in use
