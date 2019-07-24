/*
Write a program that creates an integer variable called toes. Have the program
set toes to 10. Also have the program calculate what twice toes is and what toes
squared is. The program should print all three values, identifying them.
 */

# include<stdio.h>

int twice(int);
int square(int);
int main() {
    int toes = 10;
    printf("toes = %d\ntwice toes = %d\nsquared toes = %d\n", toes, twice(toes), square(toes));
    return 0;
}

int twice(int n) {
    return 2 * n;
}

int square(int n) {
    return n * n;
}