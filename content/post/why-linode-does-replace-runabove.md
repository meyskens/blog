+++
keywords = []
description = ""
date = "2016-03-06T10:59:23+01:00"
title = "Why Linode does replace RunAbove"

+++

Follow up on my last post. Somebody at OVH decided that 7 days warning is enough to pull the plug at RunAbove (even 0 days for their extra storage disks). 7 days later somebody noticed maybe a migration guide would be handy telling that the VPS SSD replaces the beloved HA S (see last post for why not). Lucky we just had moved all our services away to *not* OVH. 

Ever since my last post my browser had a tab open called Linode Manager. After moving our [status page](https://status.shoutca.st) there I kind of fell in love with their service. The support is friendly and direct. I am told that resources are not shared, and my monitoring confirmed that. Sure the manager is not the most recent MEAN powered site, but it works like a charm! 

### Hmmm...where have I seen this before?
Given guaranteed resources at Linode the pricing reminds me of some other site I had mentioned here.
![RunAbove pricing](/images/linode/ra-price.png)
![Linode pricing](/images/linode/linode-price.png)
My beloved server for loadbalancers only costs $1 more, yes the RAM is less but overall it is similar (only I still wonder who was thinking logs won't use the 10GB storage...). I have to say the pricing is very nice for the setup we want, which was the reason why we liked RunAbove in the past.

### Move the stuff!
Past days we finalized the move of ITFrame after 3 months with OVH Cloud. The ITFrame servers are becoming more important to us and we can't afford yet another downtime caused by the hypervisor or an unexplainable slowness due to shared CPU power. Issues we had experienced at least once a month.  

Lindode offers 2 locations in Europe: London and Frankfurt. The downtime of a whole datacenter can happen so we need to work that around. Yes with OVH we could have done the same only often the same issue happened at the other location too. Not to talk about the SPOF that seems to be able to cut OVH off the network for whole Europe. 
The average ping between these two Linode locations was 11ms, perfect to setup MongoDB replication. We went further and set up a loadbalancer, worker node and database server in both locations. These are all linked to each other to fall back on the server on the other side of the channel in case it is needed. Currently ITFrame shouldn't suffer from any infrastructure issues anymore, in the worst case another datacenter will take over all the traffic :D 

### Please it is 2016
IPv6. Yes, you already know that I will say. RunAbove did never support IPv6 even though dedicated servers and the old VPS offer did. Okay no problem, you have other priorities. With OVH Cloud they rebuilt the whole infrastructure (hopefully learning from past mistakes) the perfect chance to implement full IPv6. Nope. Still no word on it, no wonder nobody uses it.  

Linode on the other side. They don't use OpenStack like OVH (which btw has full IPv6 out of the box), they made their own. Meaning they spent time on adding IPv6. And yes they have it! Finally we can offer IPv6 to our clients which allows us to move on to the future.

### tl;dr
Linode is better. We moved all our cloud x86 servers over.  
