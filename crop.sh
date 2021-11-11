#!/bin/sh
# Ghostscript required

POSITIONAL=()
while [[ $# -gt 0 ]]; do
    key="$1"

    case $key in
        -f|--file)
            FILE="$2"
            shift
            shift
            ;;
        -o|--output)
            OUTPUT="$2"
            shift
            shift
            ;;
        *)
            POSITIONAL+=("$1")
            shift
            ;;
    esac
done

set -- "${POSITIONAL[@]}"

echo "INPUT PDF     = ${FILE}"
echo "OUTPUT PDF    = ${OUTPUT}"
gs -o ${OUTPUT} -sDEVICE=pdfwrite -c "[/CropBox [0 491 544 1200]" -c " /PAGES pdfmark" -f ${FILE}
