/*
Write a program that asks you to enter an ASCII code value, such as 66, and then prints the character having that ASCII code.
 */

#include<stdio.h>
#include<math.h>

void printChar(int);
int main()
{
    int ascii_code = 0;
    printf("Fill out an ascii code: ");
    scanf("%d", &ascii_code);
    printChar(ascii_code);
    return 0;
}

void printChar(int n) 
{
    if (n < 0) {
        printf("Underflowed!\n");
        return;
    }

    if (n > pow(2, 7)) {
        printf("Overflowed!\n");
        return;
    }

    printf("%c\n", n);
}
