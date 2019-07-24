/*
Write a program that produces the following output:
For he's a jolly good fellow!
For he's a jolly good fellow!
For he's a jolly good fellow!
Which nobody can deny!
Have the program use two user-defined functions in addition to main(): one that
prints the "jolly good" message once, and one that prints the final line once.
 */

# include<stdio.h>
void printJollyGood() {
    printf("For he's a jolly good fellow!\n");
}

void printNobody() {
    printf("Which nobody can deny!\n");
}
int main() {
    printJollyGood();
    printJollyGood();
    printJollyGood();
    printNobody();
    return 0;
}