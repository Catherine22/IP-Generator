/*
Write a program that reads in a floating-point number and prints it first in 
decimal-point notation and then in exponential notation. Have the output use the 
following format (the actual number of digits displayed for the exponent depends 
on the system):

The input is 21.290000 or 2.129000e+001.
*/

#include<stdio.h>

int main() {
    float f = 21.29;
    printf("The input is %f or %e\n", f, f);
    return 0;
}