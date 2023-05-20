from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.urls import reverse
from django.conf import settings
import json


def index(request):

    return render(request, 'core/index.html')

def watch(request):
    context = {}

    if (request.method == 'GET') and (request.GET != {}):
        streams = []

        for k, v in request.GET.items():
            if "yt" in k:
                streams.append({
                    "vid": v,
                    "platform": "youtube"
                })
            if "tw" in k:
                if "vod" in k:
                    streams.append({
                        "vid": v,
                        "platform": "twitch",
                        "type": "vod"
                    })
                else:
                    streams.append({
                        "channel": v,
                        "platform": "twitch",
                        "type": "stream"
                    })
            
        context['streams'] = json.dumps(streams)

        return render(request, 'core/watch.html', context)

    else:

        return HttpResponseRedirect(reverse(index))
