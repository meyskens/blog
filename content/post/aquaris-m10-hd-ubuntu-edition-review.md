+++
date = "2016-04-19T18:47:25+01:00"
title = "Aquaris M10 HD Ubuntu Edition review"
keywords = []
description = ""

+++

*Warning: I am not a professional journalist. I am a huge fan of Linux (on ARM). This review may not be fully objective. Or contain all correct spelling/grammar.*

A few months ago when the Aquaris M10 with Ubuntu was announced I was very excited. First of all the first device with convergence, a dream of Canonical even before Microsoft told a word about "one (scaled down) Windows". But also the first (commercial) tablet with the Linux kernel. And of course an ARM chip! We all know what happened to WinRT, but there is one difference here. It's ubuntu. They have the source of 99% of the packages people use + they have official ports to ARM already available! (I even use those to host this blog) So with XMir it is able to run all those apps.

## Pre-delivery
Okay, yes I cheated. I started to write this before the box arrived. Anyway I ordered the "Aquaris M10 HD Ubuntu Edition White". Why not the FHD? Quite simple: I wanted the white one and style goes before performance. With it I chose the cherry red cover :D  I might miss the stronger CPU, however I use a [quad core 1,3GHz ARMs every day](https://eyskens.me/floating-containers-on-an-arm-mini-cloud-2/). 
On advice of [Thibaut Rouffineau](https://twitter.com/thibautR/status/715126847483330560) I got myself a micro HDMI to HDMI adapter. Which to this day did not arrive yet.
My goal is to use the tablet full time for at least a week. (Probably not for my studies as some proprietary software is required there :( ) 

## Unboxing
From this point on everythig will be written on the M10 itself. 
![Box with the screenprotector, case and tablet](/images/ubuntu/1.jpg)
As I did the pre-order, a box arrived with the tablet, a case and a screenprotector (which I probably won't use). 
The box of the tablet has some nice artwork within it the tablet displayed on opening it with under it the (tiny) manual and at last the charger. This makes me think a lot on how Apple puts their products in boxes.
![Tablet in box](/images/ubuntu/2.jpg)

## First impressions
On first boot it was slow and had some notable bugs. (eg. the setup clearly said phone) When started I noticed it actually did still run OTA 9.5 which I then upgraded to 10. The settings app did not act like a sidestage only app at that point anymore (it was the only one I tested). After some small setting tweaks (keyboard and stuff) I started to play arrount with the Tablet interface. It works smooth (keeping in mind that it is not a tablet with pro specs). Only the keyboard doesn't like me (or the other way arround?). I played in desktop mode a bit but could not do much since my Magic Mouse was broken (I ordered a new keyboard and mouse just for this tablet). 
Of course I read-write mounted the root partition to get apt-get working, which is nice. On legacy apps (eg. Firefox) I miss the touch geastures such as scroll. I wrote this in the default browser which works suprisingly well. 
Dekko seems to be endlessly loading my emails :/ (anybody got advice?) the app seems like one I will use but for now I am forced to use GMail. 
I can't wait to get my mouse and the HDMI adapter (which seems to be on it's way fom china by horse).

## Day 1
On my way to class I jumped in the local PC store to get a new Magic Mouse (I loved it too much on my Mac). So I'll be able to update you on the Desktop mode experience. 
First let's start on when I used it as a Tablet. In the train. With tethering via my phone it is a nice device to browse the web als play with the terminal (with X11, more on that later). I am still of the opinion that the keyboard doesn't catch my key pressed all well when typing fast. That is why I typed this article with my bluetooth keyboard (fyi I ordered the Logitech keys to go to use instead of my Apple one). What I also miss is plugins in the Unity browser. Lastpass contains all my logins and it is hard to type them over from my phone.

![Tablet being used in a NMBS Siemens Desiro train](/images/ubuntu/3.jpg)

Now desktop mode. It is not quite ready yet for prime time. My scroll doesn't work in the Unity apps (I think it should, not sure if I should blame the mouse or Ubuntu. My other mouse is on it's way). But there is one thing worse. The legacy apps run under libertine. Libertine is a tool to run X11 apps to XMir via a container instead of directly (there are reasons like the locked root partition) only I am unable to change my keyboard to azerty inside that container. Making these apps hard to use for me right now.
![Tablet being used on a desk with keyboard and mouse](/images/ubuntu/4.jpg)
On installing extra legacy apps I hit the error that it won't work in the container (or I am doing it wrong, need to find it out maybe write a tutorial) and for direct installation (which is possible according to an xda forum member) my apt-get is broken due a bug in the Unity8 upgrade script (reported).

Perfomance goes quite well for a device with only 1,3GHz and 2GB ram. It is not the fastest but it doesn't annoy me in usage. What does annoy me are the graphics. I have only the HD but I even see blurry graphics in apps like settings. This should be adressed as I guess rendering your vector art a bit higher is quite simple. 

My conclusion after 24 hours. If I can get these bugs solved I might like this device. I always tried to use my iPad for every day usage but as an advanced user the OS restricts me. Ubuntu shows a great promise to finally solve that but there is still a way to go for Unity and Mir. I'll be back within a week or sooner with more of my impressions.


## Week 1
*In the works, did not have enough time to play with mouse support*

Come back for once I had it for a week. I did not want you to wait for another week for the first impression. (I might add some more comments here in the meantime, see it as a rolling release)

## Q&A
When I got an email from Michael with a few questions I decided to place the answers here on the blog post as they are very interesting.

**Do you have full root access to the system?Can you do 'su' and become root? Or is it just a kind of
'sudo' with some privileges but not full root?**
You do have root out of the box. Just use `sudo` or `sudo su` and do your commands. The `/` directory is not writable by default as OTA updates just replace that with a new image. But this can be undone with `mount -o remount,rw /`. It is not partitioned that big you you might have to play with resizing it or symbolic linking.

**Is the command line/terminal emulator usable in real? Can you run usual console programs such as emacs, sed, perl/python scripts, compile with gcc,
midnight commander, etc?** 
There is! 

**How does the built-in touch  keyboard deal with
special keys (Ctrl, Meta, arrow keys, PgUp, PgDn, Home, End, ...)? Is there
any support for them or you have to use the bluetooth one?**
The touch has ctrl keys and seems to adjust to the program using it. Yhe other keys like alt/page up,down on my BT keyboard don't seem to work but it has been reported as a bug. 

**How the boot process looks like? Is there any boot-order, other boot
devices (boot from a SD?)? Are you allowed/able to run your custom kernel?**
It uses the Android kernel and it's boot process. 


**There's a GPS module mentioned on the website. How does it work?**
There is HERE maps on the tablet, which I guess uses it like the phone would do.


**I'd like to
be able to use git, review patches, ssh to various machines, use VPN and possibly VNC... code basic things in C/bash/Perl... use the standard network
tools (nmap, nc, nslookup, dig, traceroute, ping...)... Is it capable of
these things?**
All CLI should work (from what I tried), things like VNC get hard as it needs X11. Some tell it works just fine with XMir, only I did not get further than playing with gnome-terminal in Puritine/Libertine (the container used by the preinstalled apps). Probably due a lack of time and annoyances like keyboard layout in there.
