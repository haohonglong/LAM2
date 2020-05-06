#!/bin/bash

if [ $1 ]; then
    git add -u && git commit -m '$1'
fi
git push origin develop \
&& git checkout master && git merge develop && git push origin master && git checkout develop