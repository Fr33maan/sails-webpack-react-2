#!/bin/bash

export NODE_ENV=test && mocha -w -g "$1"
