#!/bin/sh

mkdir -p build || exit $?

cd build || exit $? && (
    rm -rf * && \
    cmake  .. && \
    make all
) || exit $?
