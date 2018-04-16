+++
date = "2018-04-15T21:41:50+01:00"
description = "How I built my own simple Kubernetes Ingress Controller for OpenResty"
keywords = ["k8s", "kubernetes", "ingress", "code", "custom"]
title = "Building a Kubernetes Ingress Controller"

+++

Now that writing tooling on top of Kubernetes is part of [my every day job](https://twitter.com/MaartjeME/status/970660710907817984) I thought it would be a good idea to dig deeper. If you know me longer than today you might have realised I love writing my own code for my clusters. So why not just dig in into some mechanics of Kubernetes?

At (not the above job) Innovate we have been very happy with Nginx/OpenResty to proxy and handle radio streams. Yes Kubernetes has an Nginx ingress controller, but it wasn't really my thing.   
Unfortunaly Google doesn't seem to offer much help on even describing how Kubernetes Ingress Controllers work. That was probably my biggest motivation for this blogpost, because not everyone should just pick a stock or cloud vendor specific ingress controller.   
I want to first thank the Kubernetes authors and the Traefik people for writing great ingress controlers I can use to get an idea of the code.

## 3 km view (yay metric!)
Ingress controllers (looking at only the HTTP ones) just are reverse proxies who are responsible to route trafic under specific rules to the service port defined in Kubernetes.
![Traffic flowing from clients to the ingress controller to a Kubernetes Service which spreads it over several pods](/images/k8s-ingress/schema.png)
The service in Kubernetes is then responsible for forwarding the traffic to the pod.  

## Details
So the above you probably already knew. But how does the ingress controller know where to forward traffic?  
Each ingress controller has a service account, this service account then has a ClusterRole assigned. This allows the pod which runs the ingress controller to access the Kubernetes API.  
Kubernetes has `Ingress` objects, these define one or multiple rules for network to flow.
<script src="https://gist.github.com/meyskens/5fb4518329885d48c8ef5e19a5bbc729.js"></script>

In this case we specified a hostname `maartje.tech` which has only one path set to route `/` (and every other path) to the `test` service on port `80`.  
These opjects are then picked up by the Ingress Controller which then is configured to follow these. But how does the controller know where to find `test`? If the controller runs in the same namespace DNS would just take care of that. But this isn't the case. This is why the ingress also needs to look up the service to get its ClusterIP to route to.

In code this results to 

<script src="https://gist.github.com/meyskens/1983f70481a98286d980ed501e9a076b.js"></script>

This pseudo-code gets all ingress rules of all namespaces, then loops over all the rules to compose their information. The ingress contains multiple rules which each contain one host (not nessecary) and 1 or more paths to redirect to a service.

Now we have the starting rules for our controller! But our cluster evolves! 

<script src="https://gist.github.com/meyskens/5e1f2d96d34c87c6995b11c749cbaf7e.js"></script>
<script src="https://gist.github.com/meyskens/7674a9496aaf37f2b085d44604eae890.js"></script>

This is why we have watchers! These notify us on changes (and initial objects) on ingress objects. Why did I get `Services` also? On deployment the ClusterIP of the service might change. The controller needs to be informed of this too.

So here it is. Personally I found these to work way more simple than first expected. (Is that why I couldn't find this info?)

## What did I do with this?
Introducing [k8s-openresty-ingress](https://github.com/meyskens/k8s-openresty-ingress). A simple (not yet all posibilities and edge cases implemented at time of writing) ingress controller for OpenResty. For perfomance reasons I did not do Lua calls to the controler but used templated config files (where my custom handling resides). Without realising this can now also be adapted to other reverse proxies as long they take config files and live reloading. I did't design it fully that way so code changes will be needed ;)   
This controller will soon be used in prodution at SHOUTca.st.

### Note
There are way more edgecases that need to be taken care of. There are also non HTTP ingresses. This post doesn't go into all these. 
