+++
date = "2017-06-10T20:30:16+02:00"
description = "Supercharged Linux on the desktop using CONTAINERS"
keywords = ["docker","linux","desktop"]
title = "Docker on the desktop"
header = "/images/docker-desktop/dell.jpg"
+++

*note to self: change blog bio to Jess Frazelle-wannabe*

So I decided to give Linux on the desktop a best try. I recently installed Ubuntu with the [i3 window manager](https://i3wm.org/) on my [Cr-48](https://cr-48.wikispaces.com/) and fell in love with it. Since I feel like Linux on a MacBook is a pain I start looking for a nice new laptop. It had to be powerfull, good looking and not too heavy. After I gave up looking for a rose gold laptop with something more that a celeron (really, somebody make one, I'll order 10). I went for the Dell XPS 13 with Ubuntu. 

![My XPS13 in the sun](/images/docker-desktop/dell.jpg)

When it arrived, I started it up and started configurig Ubuntu 16.04, nice huh! Went ahead and eplaced Unity with i3. We all know [Unity is dead](http://www.omgubuntu.co.uk/2017/04/ubuntu-18-04-ship-gnome-desktop-not-unity) but I like the configurability of i3 more anyhow.

It would be boring if I just used the apps installed from apt-get from 10000 repositories, with 8857646 dependencies everywhere in `/usr`. You hear me coming... 

I was inspired by [Jessie Frazelle](https://blog.jessfraz.com/post/ultimate-linux-on-the-desktop/) her setup of CoreOS on the desktop. In my day to day job I work with containers almost everywhere, know docker quite well and was up for some better way of using software. 
"Is the dependency hell that bad?" well yes, if you're like me and need new features from package a and it breaks package b? Or [suddenly lost 20GB diskspace to nothing](https://stackoverflow.com/questions/43767826/deinstall-xamarin-completely) like by friend. Or feel dirty looking into what all is on your root file system it is worth it. And I didn't even speak about the security yet. 

So using Docker for GUI apps is easy these days as `docker run -v /tmp/.X11-unix:/tmp/.X11-unix -e DISPLAY=unix$DISPLAY` where we simply bind the X11 socket of my desktop to the containers, pass the display id and done! Thanks to sharing one X11 instance all common issues like copy pasting between containers are . (only not URLs but give me time...)

So I got started by putting VSCode into a container. Why? To write all other Dockerfiles int it of course! The first version worked but it had still some weird font rendering I didn't see in other images I used like Jess' Atom image. 
Once that worked I started separating the base dependencies to make my "[desktop-base"](https://github.com/meyskens/docker-desktop-base/blob/master/Dockerfile) image. On there I added first a user account as some apps refuse to run under root. To solve the VSCode font issue I decided to give infinqlity a try which to my own suprise fixed the font rendering issues. Phew. Emojis work half but that is no priority right now. 

If you click my links (I try to refer to my sources all the time) you noticed my images are open source (duuuuuuuh). But how will I maintain all those? First step: let the[cloud](https://hub.docker.com/r/meyskens/desktop-base/) build them for you! Step 2: make them trigger eachother. So now I had the base image updated to qdd Emoji and all images got changed also. 

Most images use simple `apt-get` out of the Debian Stretch repositories. Some like [Netbeans](https://hub.docker.com/r/meyskens/netbeans/~/dockerfile/) (can you tell I have a Java exam in 3 days?) require some more dependencies. Oh and my host stays Java-free! 

![Netbeans as usual, but in a container](/images/docker-desktop/netbeans.png)

So after a day hacking I got a nice working system. And a ton of new docker images. For using it, it feels quite normal until you touch the boundries of the container (localhost hosting isn't a thing anymore).

![A ton of GitHub repos](/images/docker-desktop/images.png)

## Where to go from here??
For now Chrom(ium)(e) runs still on the host (due lazyness). As well as Slack as it had some weird bug. Putting those in containers also will be for the near future. This setup is sure to stay! Also some small changes need to be done, like hacking the brightness on this thing... And probably putting some CLI tools inside containers also. 

## Will you go CoreOS Container Linux?
Wearing by CoreOS shirt and sunglasses I say maybe not for now. While I am close to have everything in containers I am not experienced enough with Gentoo to set it up. Also the chose of the Dell XPS13 was also to have official driver support with [Project Sputnik](https://launchpad.net/dell-sputnik). The little improvements is what makes an OS great. 

### Follow-up (1 day later)
Slack is running fine since adopting the same arguments as [Chrome](https://github.com/jessfraz/dockerfiles/blob/master/chrome/stable/Dockerfile). For opening URLs I hacked a little script together that uses sockets to open the browser for you. As always available on [GitHub](https://github.com/meyskens/x-www-browser-forward).

## Follow up (1 week later)
I finally got notifications to work! Getting the user DBus session into docker can be a pain. I had to edit `/etc/dbus-1/session.conf` to add a listener on a propper unix socket by adding `<listen>unix:path=/var/run/user/1000/bus</listen>`. (this may break multiuser support, but one week of challenging people with try to close this window I don't see other people using this laptop yet). Now we need to link it into our container, I did this by adding the following lines:
```
-v /var/run/user/$(id -u):/var/run/user/$(id -u) \
-e DBUS_SESSION_BUS_ADDRESS="unix:path=/var/run/user/1000/bus" \
```
One last thing to make sure is to create a user inside the container image and use that to execute the software. 

![Hello notifications from inside Docker](/images/docker-desktop/notify.png)

PS: Sorry for any weird typos, with this laptop i decided to go for qwerty instead of the Belgian/French azerty. 