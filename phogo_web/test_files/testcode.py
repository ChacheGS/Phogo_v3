# -*- coding: utf-8 -*-
import sys

def test_stdout():
    print('This is a test')
    
def test_stderr():
    print('This is a test', file=sys.stderr)
    
def main():
    print('Running as __main__')
    test_stdout()
    test_stderr()

def not_main():
    print('Not running as __main__')
    test_stdout()
    test_stderr()
    
    
if __name__ == __main__:
    main()
else:
    not_main()