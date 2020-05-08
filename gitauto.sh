#!/bin/bash

mes=$1

if [ "${mes}" ]; then
    git add -u && git commit -m "${mes}"
fi
git push origin develop \
&& git checkout master && git merge develop && git push origin master && git checkout develop