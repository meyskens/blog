+++
date = "2016-06-18T14:51:33+01:00"
title = "Telenet: flaws by design"
keywords = []
description = ""
header = "/images/telenet/hopla.png"
+++

"Can I have the Wi-Fi password?" "Sure, what can go wrong?". If you have Telenet at home: A LOT. Each and every Telenet user has a unique login and an email address, the last one is probably known by already everybody. What do you need to take over their network? Just an entry point! That Wi-Fi password usually is no issue to get, you [might already have it via Skype](http://reviews.gizmodo.com/why-the-hell-is-windows-10-sharing-my-wi-fi-passwords-1719900675).

Now here is the issue: the password forgot feature at ["Mijn Telenet"](https://mijn.telenet.be) asks only one piece of information: a login/email. As a security check they could have done: phonecall, sms, email?, ask a security question or just ask for a unique client id. What did they chose? The requester's IP. That one IPv4 which is shared by everybody on the network. And they just give you the password, no questions asked! Only a single email to the account.... oh yeah you just got the password to that email account! 

##What is lost?
First of all enough info to steal the owner's identity. Full access to the modem router combo.  
![Screenshot of the modem settings](/images/telenet/1.png)
If that is not enough: let's order some paid tv. 
![](/images/telenet/2.png)
Or read their emails! 
![Webmail client with the same username and password](/images/telenet/3.png)
You get the point. Full access by just being on the Wi-Fi...

##Sure...
Have Telenet? Try it on your own network you'll just get your new password right in the browser.
I don't share Wi-Fi! With the upcoming of IoT you don't have to anymore. IoT devices are known to be [insecure in general](https://twit.tv/shows/security-now/episodes/562?autostart=false), they also rarely get security updates! One light bulb is enough to spit out some HTTP over your network.

#Social engineering
Now we know how to get in via a home, how about a shop? Just today somebody was able to gain access via going to a store telling the name of the owner , the address and an email address. You know that stuff on your Facebook profile. Without asking for any ID or other info to confirm the identity they have him a new password that was reset via their backend (fyi the account was owned by a single person, a woman. So far for identity stealing).

*This incident was reported and confirmed by the Telenet phone support.*

#The safe choice?
I just replaced the modem by an Orange one. Those I have full control of and can't just be changed along with the rest by just being on the network (having a 2nd LAN is no option either, it is the exit IP that is the issue)
Another reason for Orange? Their password reset page is just broken :p

![500 error on Orange.be](/images/telenet/4.png)