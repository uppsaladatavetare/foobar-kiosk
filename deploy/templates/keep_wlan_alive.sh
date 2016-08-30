#!/bin/bash    
wlan=`/sbin/ifconfig wlan0 | grep inet\ addr | wc -l`    
if [ $wlan -eq 0 ]; then    
    ifdown wlan0 && ifup wlan0
fi
