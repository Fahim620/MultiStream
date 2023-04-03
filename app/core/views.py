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
    if request.method == 'POST':
        streams = []
        num = 2
        for i in range(1, num + 1):
            type = request.POST.get('channel-%s-option'%(i), None)

            if type == "youtube":
                streams.append({
                    "channel": request.POST.get('channel-%s'%(i), None),
                    "type": request.POST.get('channel-%s-option'%(i), None),
                    "video": request.POST.get('video-%s'%(i), None),
                })
            else:
                streams.append({
                    "channel": request.POST.get('channel-%s'%(i), None),
                    "type": request.POST.get('channel-%s-option'%(i), None)
                })

        context['streams'] = json.dumps(streams)

        return render(request, 'core/multistream.html', context)
    
    else:
        streams = [{
            "channel": "overwatchleague",
            "type": "youtube",
            "video": "rUes_nYsQ0g"
            }, 
            {
            "channel": "avast",
            "type": "twitch"
            }]
        
        context['streams'] = json.dumps(streams)

        return render(request, 'core/multistream.html', context)
    
        # return HttpResponseRedirect(reverse(index))
