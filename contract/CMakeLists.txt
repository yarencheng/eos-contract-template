cmake_minimum_required (VERSION 3.10)

project (mycontract VERSION 0.0.1)

set(EOSIO_WASM_OLD_BEHAVIOR "Off")
find_package(eosio.cdt)

##
## Workaroud: using 'private' key words causes runtime error
##
##   Error from cleos:
##     Error 3070002: Runtime Error Processing WASM
##     Error Details:
##     Exceeded call depth maximum
##   ENV:
##     eosio_1.5.0-1
##     eosio.cdt-1.4.1
##
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -DWORKAROUND_NOT_USE_PRIVATE=1")

include_directories( "../include/" )
file(GLOB_RECURSE SOURCE_CPP
    "../cpp/*.cpp"
    "*.cpp"
)
list(REMOVE_ITEM SOURCE_CPP "mycontract.cpp")

### Generate the wasm and abi
### *.cpp with contract inside should be the latest of list
add_contract( mycontract mycontract ${SOURCE_CPP} "mycontract.cpp" )

### add the path to where the ricardian contracts/clauses are found
target_compile_options( mycontract.wasm PUBLIC -R${CMAKE_CURRENT_SOURCE_DIR} )