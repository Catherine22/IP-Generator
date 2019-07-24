/*
Write a program that converts your age in years to days and displays both values.
At this point, don't worry about fractional years and leap years.
 */

# include<stdio.h>
int main() {
    int myAge = 10;
    printf("My age in years is %d\n", myAge);
    printf("My age in days is %d\n", myAge * 365);
    return 0;
}