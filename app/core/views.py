from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.urls import reverse
from django.conf import settings
import json


def index(request):

    return render(request, 'core/index.html')

def multistream(request):
    context = {}

    if (request.method == 'GET') and (request.GET != {}):
        streams = []

        print(request.GET)

        for k, v in request.GET.items():
            if "yt" in k:
                streams.append({
                    "video": v,
                    "type": "youtube"
                })
            if "tw" in k:
                streams.append({
                    "channel": v,
                    "type": "twitch"
                })
            
        context['streams'] = json.dumps(streams)

        return render(request, 'core/multistream.html', context)

    else:

        return HttpResponseRedirect(reverse(index))
