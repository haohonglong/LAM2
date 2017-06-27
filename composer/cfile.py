#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from __future__ import print_function
import os
def delDir(dirPath):
    if not os.path.isdir(dirPath):
        return
    files = os.listdir(dirPath)
    try:
        for file in files:
            filePath = os.path.join(dirPath, file)
            if os.path.isfile(filePath):
                os.remove(filePath)
            elif os.path.isdir(filePath):
                delDir(filePath)
        os.rmdir(dirPath)
    except Exception(e):
        print (e)


def create_file_(files=['js','css','image'],root='item'):
	cur=os.path.abspath('.')
	delDir(os.path.join(cur, root))
	for n in files:
		w=os.path.join(cur, root+'/'+n)
		os.makedirs(w) 

def create_file(files=[
	'js',
	'css/img',
	'images',
	'plugin/js',
	'plugin/css',
	'doc']
	,root='item'):
	cur=os.path.abspath('.')
	delDir(os.path.join(cur, root))
	for k,v in enumerate(files):
		w=os.path.join(cur, root+'/'+v)
		os.makedirs(w) 


create_file([
	'js',
	'css/img',
	'images',
	'plugin/js',
	'plugin/css',
	'common/js',
	'common/css',
	'common/css/img',
	'doc'],
	'item')


