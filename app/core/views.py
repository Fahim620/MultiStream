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
    context['YT_API_KEY'] = settings.YT_API_KEY
    if (request.method == 'GET') and (request.GET != {}):
        streams = []
        num = 2
        for i in range(1, num + 1):
            if request.GET.get('ch-%s'%(i), None) == None:
                streams.append({
                    "video": request.GET.get('v-%s'%(i), None),
                    "type": "youtube"
                })        
            else:
                streams.append({
                    "channel": request.GET.get('ch-%s'%(i), None),
                    "type": "twitch"
                })

        context['streams'] = json.dumps(streams)

        return render(request, 'core/multistream.html', context)

    else:
        return HttpResponseRedirect(reverse(index))
