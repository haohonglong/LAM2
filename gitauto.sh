#!/bin/bash

m="${1}"

if [ "${m}" ]; then
    git add -u && git commit -m "${m}"
fi

git push origin develop \
&& git checkout master && git merge develop && git push origin master && git checkout develop