# include<stdio.h>

/**
 * Standard types
 */
int main() {
    int decimal8 = 8;
    int octet8 = 010;
    int hex8 = 0x8;

    printf("%d\n", decimal8);
    printf("%d in octet is %o, written to %#o\n", octet8, octet8, octet8);
    printf("%d in hex is %x, written to %#x\n", hex8, hex8, hex8);
    return 0;
}