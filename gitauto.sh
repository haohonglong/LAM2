git add -u && git commit -m 'modify' && git push origin develop \
&& git checkout master && git merge develop && git push origin master && git checkout develop