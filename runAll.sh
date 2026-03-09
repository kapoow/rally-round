#!/usr/bin/env bash

echo "running all clubs"
CLUB=srs-eawrc timeout 120s node runner.js
#CLUB=srs-dr2 timeout 120s node runner.js
echo "complete"
