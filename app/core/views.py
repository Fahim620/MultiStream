from django.shortcuts import render

from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader

from .forms import StreamForm


def index(request):

    return render(request, 'core/index.html')

def multistream(request):

    return render(request, 'core/multistream.html')
