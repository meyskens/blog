+++
keywords = []
date = "2015-11-27T23:06:28+01:00"
title = "HTTP/2 with Let's encrypt"
description = ""
header = "/headers/http2.jpg"
+++

Last week we enabled HTTP/2 on all "new" infrastructure at SHOUTca.st, serving all ITFrame API requests, Cast streams and album art faster. When updating the Debian based servers today I also took the time to upgrade my blog here.

#### Let's encrypt
As you can see I also changed from CloudFlare's TLS to Let's encrypt (a few weeks ago). They were friendly enough to let me in for the beta test. The installation was surprisingly easy and it gave me a nice certificate for my domain names. As I use Nginx it didn't update my configuration yet but can't wait for the definitive release!