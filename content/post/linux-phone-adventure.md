+++
date = "2019-02-17T20:20:18+02:00"
description = "Using only a Ubuntu Phone in 2019"
keywords = ["ubuntu touch", "ubports", "linux phone"]
title = "Linux phone adventure"
header = "/images/linuxphone/nexus5.jpg"
+++

It's 2019, the year of Linux on the phone! Just like 2016 was the year of Linux on [the tablet](https://eyskens.me/aquaris-m10-hd-ubuntu-edition-review/)! Or was that 2015? Anyhow Ubuntu gave up, but newer and better. The future looks exciting: Librem 5 and Pine64 Phone both promise us Linux on the phone. PostmarketOS tries to bring old phones back alive by putting Alpine on them. KDE claims they wil run everywhere (or so they told me at FOSDEM). However neither one of these told me they had all features.

Ubuntu was close back in 2015, UBPorts took over. Now that their OS is fully running on Xenial (instead of keep trying to patch Vivid) I decided to take out my Nexus 5, dust it off,replace my old UK sim and run with it. Can a Ubuntu phone be my every day smartphone? Will my dream of having a Linux phone come true? Let's try to put my iPhone away for at least a week!

*OMG You're gonna die in an emergancy when your experiment fails!!!* Nah don't worry it will be with me in my purse next to my Nokia (which i trust more in emergancies)

## Day 0: Twitter made me do this
<blockquote class="twitter-tweet" data-lang="nl"><p lang="en" dir="ltr">[Poll]</p>&mdash; Maartje Eyskens (@MaartjeME) <a href="https://twitter.com/MaartjeME/status/1097061620570836993?ref_src=twsrc%5Etfw">17 februari 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

76% of the voters said "Yes!" to let me suffer this... So let's do this! Before switching I need to install things!  
Email: Dekko 2 while shouting that it's experimental looks lovely!  
Twitter: So yeah... a webapp wrapper called "Tweet" will do (I will miss you Tweetbot!)  
Slack: Let's continue this later...  
Messaging: So I got a situation here, I use FB Messenger, WhatsApp, iMessage and on occasions Telegram. None of these run on my phone.  
Podcasts: Podbird looks great!  
Apple Watch: I cannot even find a good looking Android watch, let's not ask for a Linux one.  

*Why not Sailfish OS?* Sailfish OS sounds nice however only is on a few devices, I do not own any of these. I did happen to own a Nexus 5.

### Messaging: federation of the puppets
While researching into alternatives for messaging I got dragged into yet another world of open source awesomeness... Matrix. Matrix is comparable to mastodont but for messaging.
Sure yet another messaging platform... Matrix has this thing called [bridges](https://matrix.org/docs/projects/bridges). While most of them require your own private server (which I now have ;) ) they allow me to use any Matrix client to connect to my Friends on iMessage (not tried yet), Facebook and WhatsApp. It only took me a few hours to figure out what I needed and configuring my own server. As a client I love the super cute [FluffyChat](https://open-store.io/app/fluffychat.christianpauly). I haven't been testing this for long but it looks so promising that I am considering to use this setup on my iPhone too.

### Slack: Android in a container
Slack has a Matrix bridge. But I am a too much of a Slack lover. Slack has an Android app. [Anbox](https://github.com/anbox/anbox) uses LXC containers to run Android.
Containers on a phone? This maked the world even better! There is a fork of Anbox by UBPorts that runs on my Nexus 5! I have been told this is highly experimental however Slack works smooth* (*as long you do not need to play any media or open links). Which solved my problem!

## Day 1
My Slack dream isn't as good as it was. The Anbox runtime does not have any webkit capabilities causing me to be unable to open any (magic) links. So there was a hack for magic links. I could copy the link on my laptop then adb shell into my phone which can adb shell into anbox (cool right!). A simple `adb shell am start -a android.intent.action.VIEW -d URL` then does it to trigger slack into opening my link. There is only one last flaw. A few Slacks I am in only accept Google Auth. Which needs a browser...  
After some thinking I figured it out. I installed [Intent Intercept](https://f-droid.org/en/packages/de.k3b.android.intentintercept/), this could give me the OAuth URL it was trying to call. I copied that URL and sent it (over Slack) to my laptop. There I handled the login in Chrome. There Chrome gave me a "Do you want to open in xdg-open" notice. So there was being redirected to a non HTTP URL. I opened the inspector and found the redirect header to `slack://` copied that URL and ran `am start -a android.intent.action.VIEW -d URL` again. Now Slack happily accepted my token and logged in!  

Taking the phone outside for the first day got me caught on some (non-replicatable) bugs a few times... For example my keyboard of my passcode stopped working suddenly. These small things can get annoying. I also seem to have crashed Mir a few times. By the end of the day I had to switch back to my iPhone as fallback over wifi.

## Day 2
I really like the swipe based UI! When using my iPad in Spanish class i even tried to get my app switcher by swiping from the right, I was sad that it did not work. I do not like the perfomance of webapps too much, however the few native ones I can find work like a charm.  
Anbox crashed a few times, this is totally expected giving it's status. It also lacks a back button which Slack kind of assumes you have.  
My biggest miss is Lastpass (or any integrated password manager). Which the Android trick will not even work for. Also some webapp wrappers do not seem to accept copy paste for some reason? Very annoting when your Twitter password is 32 characters long.  
Last (for this writing session) remark is that tomorrow I will probably have to cheat as while uNav looks nice it has no public transport mode, guess I will have to take out Citymapper on my iPhone again.

## Day 3
Having no password manager is becoming a pain... I cannot understand how you can live without one (and be secure). I did use my podcast client a lot today and can not complain. I do miss Bluetooth headphone support :( Maybe I need to play with pulseaudio a bit like on my laptop?  
After 3 days I still cannot say I want to replace my iPhone (sorry). Mostly it is about tiny details (given anbox will improve) like how Tweetbot or Overcast works (or actually having a password manager?). Or maybe it's the speed? Okay the Nexus 5 is a 2013 phone, I will have said the same if you have my an iPhone 5s.  
Anyhow, tomorrow is another day. 

# Day 4 & 5
Never thought I would say this about a phone: I love the built in calculator, it was really handy while counting stock (yes I take weekly breaks from tech). Other than that I decided to test the phone by actually calling into a video conference, it worked fine however i found a minor bug that i could not change the sound level. What I realized the past days is that without fully realizing my phone for me isn't just a pocket Twitter device that makes sound, I actually get a lot of work done on it, something that got a bit harder on my Ubuntu phone. 

**This is a live blog kind of post, updates will follow soon**