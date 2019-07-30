/*
Find out what your system does with integer overflow, floating-point overflow, 
and floating-point underflow by using the experimental approach; that is, write 
programs having these problems.
 */

#include <stdio.h>
#include <math.h>
#include <float.h>

// run on a 32-bit system
int main()
{
    // int overflow
    int maxInt = pow(2, 32) / 2 - 1;
    int minInt = -(pow(2, 32) / 2);
    int overflowedInt = maxInt + 1;
    int underflowInt = minInt - 1;
    printf("int = [%d, %d]\v maxInt + 1 = %d\v minInt - 1 = %d\n", minInt, maxInt, overflowedInt, underflowInt);
    
    // floating-point overflow
    float maxF = FLT_MAX;
    float minF = FLT_MIN;
    float overflowedF = maxF * 2;
    float underflowF = minF - 1;
    printf("float = [%.10e, %.10e]\v maxFloat * 2 = %.10e\v minFloat - 1 = %.10e\n", minF, maxF, overflowedF, underflowF);

    return 0;
}
