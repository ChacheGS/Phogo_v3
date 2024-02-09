# -*- coding: utf-8 -*-
# This source file is part of the Phogo project
# https://github.com/CRM-UAM/Phogo
# Released under the GNU General Public License Version 3
# Club de Robotica-Mecatronica, Universidad Autonoma de Madrid, Spain

# python2 compatibility
from __future__ import print_function

from random import randint
import turtle


def Turtle(*args, **kwargs):
    return _Turtle(*args, **kwargs)


class _Turtle(object):

    def __init__(self):
        turtle.mode('logo')
        turtle.screensize(2000, 1500)

    def pen_down(self):
        turtle.pendown()
        return 'OK'

    def pen_up(self):
        turtle.penup()
        return 'OK'

    def forward(self, units):
        turtle.forward(units)
        return 'OK'

    def backward(self, units):
        turtle.backward(units)
        return 'OK'

    def right(self, deg=90):
        turtle.right(deg)
        return 'OK'

    def left(self, deg=90):
        turtle.left(deg)
        return 'OK'

    def distance(self):
        return randint(10, 300)

    def reset(self):
        turtle.reset()
        self.__init__()
