+++
title = "Floating containers on an ARM mini cloud"
keywords = []
description = ""
date = "2015-09-15T22:40:00+01:00"
header = "/headers/c1.jpg"

+++

[Scaleway](https://scaleway.com) is a great idea. Using self-designed ARM hardware to host small applications on and being able to offer it at a price your Amazon instance can barely boot for. In fact I moved my blog to there and be able  to run it on my dedicated supercharged Raspberry Pi like server and still have enough power left to play Angry Birds (if only that was possible). 
Their vision is to horizontal scale your apps over several small machines. Something that was also our vision at [SHOUTca.st](https://shoutca.st/cast) when designing the backend for Cast. Small machines with dedicated connectivity and over redundancy. All this was powered by the new great Linux distro [CoreOS](https://coreos.com). But their ARM version wasn't ready and if it was it could not be used on the Scaleway C1. 

So starting over was the best to do. Using Ubuntu as core gave me an OS I knew and that was used by CoreOS to test their components on. The result is now available on the [Scaleway community repo](https://github.com/scaleway-community/scaleway-ubuntu-coreos).
To begin with their build system is quite nice thanks to the Dockerfile standard I was able to build the first image in a matter of minutes. After adding the core components as Etcd, Fleet and Flannel the first image was ready (after one weekend ironing bugs out. 
Inserting cloud-init files was not possible due the Scaleway API not supporting it so instead I inspired me on the Docker image which uses tags to insert some data. With a discover tag included I was able to inject the discover URL into the systemd units on first boot.

Only one issue was left. In the past we used OpenStack Neutron to filter traffic coming from outside the CoreOS security group. Unfortunately the ScaleWay firewall is not as advanced. That is why a small Go (to not add any extra overhead, Go was already in use for the CoreOS components) script is included that fetches a list of servers via the API and whitelist those in the UFW firewall. 

At the time of writing we have 6 of these running :) 6*3 = €18 per month. Again, how much did you pay for that AWS t2.small??