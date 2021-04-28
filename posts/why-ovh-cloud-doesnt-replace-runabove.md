+++
date = "2016-02-17T17:00:52+01:00"
title = "Why OVH Cloud doesn't replace RunAbove"
keywords = []
description = ""

+++

I am a big fan of OVH. They got a great network, best DDoS protection, very good pricing, nice hardware but they made a mistake with their cloud.
More than a year ago we at Innovate Technologies migrated many of our services to the new cloud service under the sub-diary of OVH called RunAbove. 

They had a nice offering. Sandboxes, with SSD, 2 or 4GB memory and shared resources. Great to develop on or run a small unimportant server. Out of benchmarks it was noticeable that not every sandbox had the same performance and some went slow for a period of time. For $2.5 and $5 not a bad offer. 
The 2nd series was the (internally called) HA ones, with dedicated resources(!) and distributed storage for a quick recovery. Starting at $9. This offer was great for smaller servers that needed performance and availability. Even more perfect for a load balancer redirecting traffic to the 3rd option which was just a whole dedicated server with local SSD.

In preparation for the OVH Summit RunAbove's classic offer as described above was stopped to rebrand it as a Lab for new services. Old customers can keep their servers but are suggested to move to OVH Cloud (some support docs seems to force it very hard), an "improved" copy of RunAbove on their premium brand OVH.com.
First of all, you can't simply move the data, IP, settings etc. We had over 50 servers at one point on RunAbove. You just don't move those in 123. Sure they don't force us to move but keeping a large set of servers or even expanding them on a service that gets treated as a beta lab is a bad idea. 
But the reason we didn't move all servers was simple. OVH Cloud has two offers. A sandbox like server called VPS SSD, as said above our experience was not very good especially if you want dedicated performance. And a ram/cpu "dedicated" server offer which carry the names of their dedicated server plans. Starting at 30 euros that is 3 times more than the $9 of RunAbove. For a small loadbalancer this is maybe overkill if you're used to the RA offer. And you don't want a vital server to run on shared resources. You don't want your loadbalancer slowed down due a neighbor being a CI that compiles Linux kernels all day. 

For over a few months I gave OVH Cloud a try, benchmarks showed promises but benchmarks are just numbers. Over the past months I had several times frozen VMs or a hypervisor that was down. For a VPS SSD that means complete downtime, since it is our loadbalancer... You can guess it. The past weeks our performance of the ITFrame system went down. Not sure where this could be I delayed investigation as there was more important things to do. At yet another downtime I was sick of it and set up a 2nd cluster (good I had backups) at 2 in the night. Suddenly I noticed Nginx started a lot faster (before it took like a minute, large config files? bug? We use 1.9.x after all). Performance of only the load balancer was a lot faster (5-7x). Why? Oversold shared resources. Something RunAbove's HA did not do. 

For being a big OVH fan and using only their servers for over 2 years (not any longer) this is very disappointing. 
For the ITFrame cluster? I sit and wait for Scaleway's x86 offer (I saw the code, it is coming!) to build a hybrid cluster of ARM and x86 for the Node.js workers. In meantime. Pray and look for other providers.