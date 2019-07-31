# include<stdio.h>
# include<stdlib.h>
# include<math.h>
# include<time.h>

/* 
Estimate PI via Monte Carlo simulation
*/

double square(double);
double randomOTo1();
int main() {
    int partition = 100000; // the more the merrier
    int circle = 0;
    int outOfBoundary = 0;

    srand((unsigned)time(NULL));
    for (int i = 0; i < partition; i++) {
        double x = randomOTo1();
        double y = randomOTo1();
        if (sqrt((square(x) + square(y)))<=1.0) {
            circle++;
        } else {
            outOfBoundary++;
        }
    }

    double pi = 4.0 * circle / (circle + outOfBoundary);
    printf("PI is %f\n", pi);
    return 0;
}

double square(double n)
{
    return n * n;
}

double randomOTo1()
{
    return rand() % 2;
}