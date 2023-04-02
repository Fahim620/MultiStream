from django.shortcuts import render

from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader

from .forms import ChannelForm
import json


def index(request):

    return render(request, 'core/index.html')

def multistream(request):
    context = {}
    streams = []
    num = 2
    for i in range(1, num + 1):
        streams.append({
            "channel": request.POST.get('channel-%s'%(i), None),
            "type": request.POST.get('channel-%s-option'%(i), None)
        })

    context['streams'] = json.dumps(streams)
    return render(request, 'core/multistream.html', context)
