/*
There are approximately 3.156 x 10^7 seconds in a year. Write a program that 
requests your age in years and then displays the equivalent number of seconds. 
*/

#include<stdio.h>
#include<time.h>

float toSec(int);
float toSecPrecisely(int, int, int);
_Bool isLeapYear(int);
int daysInMonth(int, int);
int main()
{
    int age = 1;
    printf("Your age: ");
    scanf("%d", &age);
    printf("%e\n", toSec(age));

    // fill out your birthday and calculate the seconds
    int y = 0;
    int m = 0;
    int d = 0;
    printf("Your birthday: mm\n");
    scanf("%d", &m);
    printf("Your birthday: dd\n");
    scanf("%d", &d);
    printf("Your birthday: yyyy\n");
    scanf("%d", &y);
    printf("%e\n", toSecPrecisely(m, d, y));
    return 0;
}

float toSec(int n) 
{
    // 1 year ≅ 3.1536e+7 seconds
    return n * 3.1536e+7;
}

float toSecPrecisely(int m, int d, int y) {
    time_t t = time(NULL);
    struct tm tm = *localtime(&t);
    int thisY = tm.tm_year + 1900;
    int thisM = tm.tm_mon + 1;
    
    // verify inputs
    if ((y < 0) || (y > thisY)) {
        printf("invalid year");
        return -1;
    }

    if ((m < 0) || (m > 12) || (y == thisY && m > thisM)) {
        printf("invalid month");
        return -1;
    }

    if ((d < 0) || (d > daysInMonth(m, y)) || (y == thisY && m == thisM && d > tm.tm_mday)) {
        printf("invalid date");
        return -1;
    }

    // 1 day = 8.64e+4 seconds
    float total = 0;
    int SEC_A_DAY = 24 * 60 * 60;

    // total += today
    total += tm.tm_sec;
    total += tm.tm_min * 60;
    total += tm.tm_hour * 60 * 60;

    // total += this month
    total += tm.tm_mday * SEC_A_DAY;

    // total += this year
    for (int i = 0; i < thisM; i++) {
        total += daysInMonth(i, y) * SEC_A_DAY;
    }

    // total += years
    for (int i = y + 1; i < thisY; i++) {
        total += isLeapYear(y) ? 366 * SEC_A_DAY : 365 * SEC_A_DAY;
    }

    // calculate the year you were born
    for (int i = m + 1; i <= 12; i++) {
        total += daysInMonth(i, y) * SEC_A_DAY;
    }

    // let's say you were born at 00:00:00
    int leftDays = daysInMonth(m, y) - d + 1;
    total += leftDays + SEC_A_DAY;
    return total;
}

int daysInMonth(int m, int y) {
    if (m == 2) {
        return isLeapYear(y) ? 29 : 28;
    } else if (m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12) {
        return 31;
    } else {
        return 30;
    }
}

_Bool isLeapYear(int y) {
    return (y % 4 == 0) && ((y % 100 != 0) || (y % 400 == 0));
}