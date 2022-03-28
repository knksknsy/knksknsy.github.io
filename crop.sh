#!/bin/sh
# Ghostscript required

POSITIONAL=()
while [[ $# -gt 0 ]]; do
    key="$1"

    case $key in
        -t|--type)
            TYPE="$2"
            shift
            shift
            ;;
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

echo "FILE TYPE  (-t) = ${TYPE}"
echo "INPUT PDF  (-f) = ${FILE}"
echo "OUTPUT PDF (-o) = ${OUTPUT}"

if [[ "${FILE}" = "${OUTPUT}" ]]
then
    echo "Arguments --file and --output must be different."
    exit
fi

if [[ "${TYPE}" = "cv" ]]
then
    gs -o "${OUTPUT}" -sDEVICE=pdfwrite -c "[/CropBox [0 491 544 1200]" -c " /PAGES pdfmark" -f "${FILE}"
elif [[ "${TYPE}" = "cover" ]]
then
    gs -o "${OUTPUT}" -sDEVICE=pdfwrite -c "[/CropBox [0 348 596 1200]" -c " /PAGES pdfmark" -f "${FILE}"
else
    echo "Valid --type options: TYPE=[cv|cover]"
fi
