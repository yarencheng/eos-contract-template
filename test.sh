#!/bin/sh

mkdir -p build || exit $?

cd build || exit $? && (
    ctest --verbose
) || exit $?
