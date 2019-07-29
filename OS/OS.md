# Main Points form C Primer Plus

## Integer
The range of possible values of an ```int``` type depends on how many **word** your computer have.      
A ***word*** is the natural unit of memory for a given computer design.     
I.e. A computer with 16-bit words takes 16 bits to store an ```int```. Hence, the value of ```int``` on the computer is [-32768, 32768) (- 2^16 / 2 ~ 2^16 / 2 - 1, we have a 0 here)     


## Floating-pint number
The arrangement for saving floating-pint numbers (aka real numbers) and integer is different. E.g. 7 and 7.0 would not be stored in the same manner.

### Inaccuracies of floating-point numbers      
 E.g. 7.0 might be stored in 6.99999        
 Because there are an infinite number of floating-point numbers in any given range such as [1.0, 2.0].      

## Multiple integer types
1. ```short``` is no longer than ```int``` and ```int``` is no longer than ```long```       
2. The common practice today is to set up ```long long``` as 64 bits, ```long``` as 32 bits, ```short``` as 16 bits, and ```int``` to either 16 bits or 32 bits, depending on the machine's natural **word** size.        
3. use ```long``` can slow down calculations.       
4. Don't use long if it is not essential     
5. Assume that you are writing code on a 32-bits computer which ```int``` and ```long``` are actually the same size, and you need 32-bit integers, use ```long``` so that the program will function correctly if transferred to a 16-bit machine.       
6. Similarly, use ```long long``` if you need 64-bit integer values.        
7. **unsigned integers**: when it reaches its maximum value, it starts over at the beginning.       
```C
# include<stdio.h>
# include<limits.h>
int main() {
    unsigned int j = UINT_MAX;
    printf("%u %u %u\n", j, j + 1, j + 2);
    // 4294967295 0 1
    return 0;
}
```

8. Relatively, if ```int``` reaches its maximum value4.     
```C
# include<stdio.h>
# include<limits.h>
int main() {
    int i = INT_MAX;
    printf("%d %d %d\n", i, i + 1, i + 2);
    // 2147483647 -2147483648 -2147483647
    return 0;
}
```
NOTICE, you are not informed that i has exceeded / overflowed its maximum value.        
9. The ```long long``` type is intended to support 64- bit needs.        
10. Sample code

```short```
```C
# include<stdio.h>
# include<limits.h>
# include<math.h>
int main() {
    short maxShort = pow(2, 16) / 2 - 1;
    short overflowedShort = maxShort + 1;
    int maxShortInInt = maxShort + 1;
    printf("max short = %hd\n", maxShort); 
    // max short = 32767
    printf("max short + 1 = %d, overflowed short = %hd\n", maxShortInInt, overflowedShort); 
    // max short + 1 = 32768, overflowed short = -32768

    int maxInt = pow(2, 32) / 2 - 1; // This functions while running on a 32-bit machine
    int overflowedInt = maxInt + 1;
    unsigned int maxIntInUInt = maxInt + 1;
    printf("max int = %d\n", maxInt); 
    // max int = 2147483647
    printf("max int + 1 = %u, overflowed int = %d\n", maxIntInUInt, overflowedInt); 
    // max int + 1 = 2147483648, overflowed int = -2147483648

    unsigned int maxUInt = pow(2, 32) - 1;
    printf("unsigned int = [0, %u]\n", maxUInt);
    // unsigned int = [0, 4294967295]

    long maxLong = powl(2, LONG_BIT) / 2 - 1; 
    // LONG_BIT = 32 or 64
    printf("max long = %ld\n", maxLong); 
    // max long = 9223372036854775807
    unsigned long maxULong = powl(2, LONG_BIT) -1;
    printf("unsigned long = [0, %lu]\n", maxULong);
    // unsigned long = [0, 18446744073709551615]

    long long maxLL = powl(2, 64) / 2 - 1;
    printf("max long long = %lld\n", maxLL); 
    // max long long = 9223372036854775807
    unsigned long long maxULLong = powl(2, 64) - 1;
    printf("unsigned long long = [0, %llu]\n", maxULLong);
    // unsigned long long = [0, 18446744073709551615]

    return 0;
}
```

## char

# Code
[Chapter 2 answers](/C_Primer_Plus_5th_Edition_code/)

## Navigator
- Chapter2: 
    - warm-up       
- Chapter3: 
    - 0: Print octet and hex numbers        
    - 

# References
C Primer Plus 5th Edition by Stephen Prata