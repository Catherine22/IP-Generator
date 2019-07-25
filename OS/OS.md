# Main Points form C Primer Plus

## Integer
The range of possible values of an ```int``` type depends on how many **word** your computer have.      
A ***word*** is the natural unit of memory for a given computer design.     
I.e. A computer with 16-bit words takes 16 bits to store an ```int```. Hence, the value of ```int``` on the computer is [-32768, 32768] (- 2^16 / 2 ~ 2^16 / 2)     


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