# available arguments
MAC="mac"
WINDOWS="windowns"
LINUX="linux"

# constants
OUTPUT_DIR="release-builds"
PROD_NAME="IPGenerator"

declare -a platforms

if [ "$#" != "0" ]; then
    count=0
    for argu in "$@"; do
        if [ \( "$argu" = ${MAC} \) -o \( "$argu" = ${WINDOWS} \) -o \( "$argu" = ${LINUX} \) ]; then
            platforms[count]="$argu"
            count=${count}+1
        fi
    done
fi

if [ "${#platforms[@]}" = "0" ]; then
    platforms=(${MAC} ${WINDOWS} ${LINUX})
fi
echo Platforms: [${platforms[*]}]

# clear output directory
rm -rf "${OUTPUT_DIR}"
mkdir "${OUTPUT_DIR}"

# build
for p in "${platforms[@]}"; do
    if [ "$p" = ${MAC} ]; then
        electron-packager . --overwrite --platform=darwin --arch=x64 --prune=true --out=release-builds
    elif [ "$p" = ${WINDOWS} ]; then
        electron-packager . electron-tutorial-app --overwrite --asar=true --platform=win32 --arch=ia32 --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName=\"${PROD_NAME}\"
    elif [ "$p" = ${LINUX} ]; then
        electron-packager . electron-tutorial-app --overwrite --asar=true --platform=linux --arch=x64 --prune=true --out=release-builds
    fi
done
