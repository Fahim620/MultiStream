from django.shortcuts import render

from django.shortcuts import render

from django.http import HttpResponse
from django.template import loader


def index(request):

    return render(request, 'core/index.html')

def multistream(request, channel1=None, channel2=None):

    context = {
        "channel1": channel1,
        "channel2": channel2,
        }

    return render(request, 'core/multistream.html', context)
