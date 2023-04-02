from django import forms

class ChannelForm(forms.Form):
    channel1 = forms.CharField(label='Channel 1', max_length=100)
    channel2 = forms.CharField(label='Channel 2', max_length=100)