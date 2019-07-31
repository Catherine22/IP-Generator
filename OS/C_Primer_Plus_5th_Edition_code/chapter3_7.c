/* 
There are 2.54 centimeters to the inch. Write a program that asks you to enter 
your height in inches and then displays your height in centimeters. Or, if you 
prefer, ask for the height in centimeters and convert that to inches.
*/

#include<stdio.h>
#include<string.h>
#include<ctype.h>

float cmToInch(float);
float inchToCm(float);
int main()
{
    float h;
    printf("Enter your height: ");
    scanf("%f", &h);

    char unit[4];
    printf("In (c)m or (i)nch?");
    scanf("%s", unit);

    fflush(stdin);

    // convert unit to uppercase
    for (int i = 0; i < sizeof(unit); i++) {
        unit[i] = toupper(unit[i]);
    }

    if (strcmp("C", unit) == 0 || strcmp("CM", unit) == 0) {
        printf("Your height = %f inches\n", cmToInch(h));
        return 0;
    }

    if (strcmp("I", unit) == 0 || strcmp("INCH", unit) == 0) {
        printf("Your height = %f cms\n", inchToCm(h));
        return 0;
    }

    printf("Invalid units\n");
}

float cmToInch(float h) {
    return h / 2.54;
}

float inchToCm(float h) {
    return h * 2.54;
}
