#!/bin/sh

mkdir -p build || exit $?

cd build || exit $? && (
    rm -rf * && \
    cmake  .. && \
    make all && \
    ctest --verbose
) || exit $?
rm -rf * && cmake -DCMAKE_VERBOSE_MAKEFILE:BOOL=ON .. && make all && ctest --verbose