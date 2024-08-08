#!/bin/sh
# Ghostscript required

POSITIONAL=()
while [[ $# -gt 0 ]]; do
    key="$1"

    case $key in
        -i|--input)
            INPUT="$2"
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

echo "INPUT PDF  (-f) = ${INPUT}"
echo "OUTPUT PDF (-o) = ${OUTPUT}"

if [[ "${INPUT}" = "${OUTPUT}" ]]
then
    echo "Arguments --input and --output must be different."
    exit
fi

pdfcrop --margins 0 "${INPUT}" "${OUTPUT}"
