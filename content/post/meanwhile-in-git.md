+++
description = ""
date = "2015-11-20T18:57:56+01:00"
title = "Meanwhile in Git: Cast + DJ"
keywords = []
slug = "cast-dj"
+++

At SHOUTca.st, we’re working hard. Developing new products and bringing you improvements to our current services. But sometimes I feel it's not clear to everybody what we are doing currently on the development side of things. That’s why I’m running a new blog series to explain the things behind the scenes of our development. This series is called "Meanwhile in Git" as we use Git to work on our internal projects.

####DJ
DJ is been in development for some time. DJ is not your typical AutoDJ solution, it’s a full automation solution in the cloud. We don't want to compromise the ease of use. 
Currently, the clock and interval system (don't worry we will have help documents that will explain all these terms) is working fine. That’s coming along well.
But here's the catch. DJ depends on the open source radio tool/language Liquidsoap. Whilst this offered a solid base to start we found a flaw. Liquidsoap is very inefficient. That’s why we decided to start writing on our own audio engine that is 25x (yes twenty-five times) more efficient. We want to perfect it and currently the tests show great promise!

For pricing we’re going to keep it simple. You only pay for what you use. That’s right, PAYG (pay as you go). Why should you pay for resources you don't use? We will only bill you for the disk space you use, not a penny more. Do you remember 2010? Those things called **limits**? Well guess what — there are NO limits, our system can support petabytes of music. I mean… if you wanted to, you could upload every song known to man. Please… don’t do that though, it’ll probably cost a pretty penny.

####Cast
>When can I order Cast again?

A question I've heard often the past few weeks. We're working hard to get Cast available again. We want the next batch of servers to be running a newer build of Cast with some new features.
The update button for example. Currently, deployments of new versions depend on changing of settings. We're changing that by introducing a button that will update your Cast server when you want to update it, not when we want to update it.
Configuration is going to be a whole lot faster. At the moment, a **whole container** gets restarted to load in new configuration, soon only the Cast service will reload, reducing downtime due to changes a lot quicker.

Apart from all of these little changes, there’s one really important new feature. It’s has been in the open source version for some time and now we’re adding it to Control. **GeoLock**. 
GeoLock allows you to black/whitelist certain countries and stop/allow them to listen to your stream. Don’t worry! We’re not racist, it’s just that a lot of licensing companies require this feature to be enabled. With Cast, we’ve built this in into the streaming server itself and therefore it’s much better than other workarounds used currently to add this functionality to SHOUTcast/Icecast.

We're working very hard on all of these things everyday. You'll see all this soon, really soon. As you all know, ironing out annoying bugs and perfecting everything takes time!

>This blog post is a cross-post of the official SHOUTca.st blog. 