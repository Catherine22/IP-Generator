/*
Write a program that produces the following output:
Smile!Smile!Smile!
Smile!Smile!
Smile!
 */

# include<stdio.h>

void printSmile();
int main() {
    int columns = 3;
    int rows = 3;
    while (columns > 0)
    {
        while (rows > 0)
        {
            printSmile();
            rows--;
        }
        printf("\n");
        columns--;
        rows = columns;
    }
    return 0;
}

void printSmile() {
    printf("Smile!");
}
