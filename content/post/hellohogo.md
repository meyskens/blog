+++
title = "Hello Hugo"
keywords = []
description = "Converting my blog to Hugo"
date = "2017-03-09T15:22:37+01:00"

+++

After a chat about blogging systems and static site generators in the [Gophers Slack](https://blog.gopheracademy.com/gophers-slack-community/) I got to know Hugo. A static site generator written in Go. 

While in the past I used [Ghost](https://ghost.org) to host my blog it only offers basic features that are also offered by (almost every) static site generator. Also my template was broken so I had the choice to fix that or give Hugo a try.
Why should I keep using Ghost? A static site would be able to handle larger loads and is more secure. So `brew install` hugo it was. First impressions were great! Live previews are nice, writing my posts in my trusted VSCode was nice. Also Hugo seems to offer a wide rande of markup and config laguages but markdown was my love for some time already so I kept using that.

After playing with the template to match my previous site some more I started importing my posts. Since I didn't have many posts I decided it might not be worth writing a script for so I did it by hand.
Have I ever been so wrong.... Turns out somebody already wrote it... [ghostToHugo](https://github.com/jbarone/ghostToHugo)

After all this wasted time my blog was ready to be published! Since it was static I can put it everywhere but I have had a Caddy webserver that was serving my blog just fine. So I went for the same webserver.

My modifications of my Ghost theme were already on GitHub so will be this blog! I will push updates to GitHub firtst which will then be deployed to my server by Travis. 