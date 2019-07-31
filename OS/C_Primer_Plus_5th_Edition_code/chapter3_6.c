/* 
The mass of a single molecule of water is about 3.0x10^-23 grams. A quart of water 
is about 950 grams. Write a program that requests an amount of water, in quarts, 
and displays the number of water molecules in that amount.
*/

#include<stdio.h>

int main() 
{
    float q;
    printf("How many quarts of water:");
    scanf("%f", &q);

    // if the q is enormous, e.g. 7e50, this m would be 'inf'
    float m = q * 950 * 3.0e-23;
    printf("%e molecules in the water\n", m);
}

