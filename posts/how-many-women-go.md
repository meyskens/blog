+++
description = "Name-based gender research on GitHub"
date = "2017-03-23T20:33:51+01:00"
title = "How many women actually Go, C, Rust, JS...."
keywords = ["golang", "gender", "github", "women who code", "research"]

+++

*Note: there are waaaay more than 2 genders, the problem is GitHub has no field for them (keep it that way!) nor do we have tools to check them based on the name.*

*2nd note: I wrote this post during the process, just see it as a live blog with delay.*

After the results of the [Go survey](https://blog.golang.org/survey2016-results) on how many Gophers identify as woman, the Women Who Go community (well at least me anyway) wondered how other languages are doing. Since I don't see the next Java user survey going to happen it might be time to put the Big Data (buzz word: check!) to work!

[Sarah Adams' gender guesstimate program](https://github.com/adams-sarah/go-gender-stats) already did a nice part for the Go community by analyzing the Gophers Slack and the Go contributors based on first names. Building on this tool I've added a tiny part using [Google's BigQuery](https://bigquery.cloud.google.com) to fetch all names from commits and their language from GitHub inspired by [Alyssa Frazee's work](http://alyssafrazee.com/gender-and-github-code.html).

## Some numbers
According to the Go blog 1% (lowest we've seen) identifies as woman, while we see a 6.95% in the Gophers Slack. [Thomas More reports](https://twitter.com/inge_tyskens/status/839357543868682240) 7% for their bachelor in Applied Computer Science, 1,3% and 0,6% for Electronics-ICT in 2 campuses. Stackoverflow [reports](https://stackoverflow.com/insights/survey/2017#demographics) 7,6%. While [Apple reports](https://www.apple.com/diversity/) an optimistic(?) 23%!

## Failure 1
So let's keep it simple, let's JOIN all the data we need in one SQL query and fetch in all data to process te names. Sound right, doesn't it? It all worked till I hit the 6 hour timeout of the query... Maybe chunking the data is needed.

## Failure 2
So after many channels and goroutines we were ready to go! Each query in it's own goroutine because it is Go. `googleapi: Error 403: Exceeded rate limits: Your project exceeded quota for concurrent queries. For more information` well it turns out BigQuery doesn't like too much of a concurrency... Let's make it less.

## Failure 3
`googleapi: Error 503: Error encountered during execution. Retrying may solve the problem., backendError` aka
`This error returns when there is a temporary server failure such as a network connection problem or a server overload.`
What happened here is a mystery to me, but I guess it has to do with repeating queries to ask which language a repository uses, so I made a map to cache those lookups per goroutine.

![My display monitoring the process](/images/genderstats/missioncontrol.jpg) 
*My 2nd screen as mission control during the running of the process*

## Failure 4
Same error, I gave up on BiqQuery and went to import [GHTorrent](http://ghtorrent.org) on my own MySQL (probably not the best choice here) server. It took some time for it to import. When it was finally done I had everything I needed. Expect for the names... they were removed in the latest dumps I later read. 

## One week later

So after waiting for access to their MongoDB server to import the names into the MySQL server, I wrote a small Go script to go over the database and look up the names.
![Importing the names from MongoDB](/images/genderstats/name-link.png) 
Now it was time for a run of the query! To speed it up I made Goroutines to iterate over a part of the database and max out the database server's CPU.
![My MacBook accompanied by nail polish bottles](/images/genderstats/dataandnails.jpg) 
*Doing my nails and data analysis, inspired by [Simply Nailogical](https://twitter.com/nailogical)*

After several runs with fine-tuning I still got higher numbers than the BiqQuery research Sarah Adams has done in the meantime (for Go only). This makes me suspect there is something wrong in the code. So I went through tweaking and code-reviewing again. So I hope I finally have some representable numbers.

## The research
![The EDR used](/images/genderstats/erd.png) 

So using the GHTorrent database dump for 2017-03-01 enriched with the names for the users I decided to link up all commits to a project, that wasn't a fork (to avoid duplicated) and chose the primary language of the project (as many projects has content like javascript and html). Then filtered them to have one person with multiple languages they use. For the name I used the one from the GitHub profile (not Git commit) and filtered the ones that do not look like a full name (in a crappy way). This results in:
```sql
SELECT * FROM (SELECT u.id, p.language, u.name FROM commits c JOIN projects p ON c.project_id=p.id JOIN users u ON c.author_id=u.id WHERE c.id >= ? AND c.id < ? AND u.name is not null AND p.forked_from is null AND p.language is not null) q GROUP BY q.language, q.name, q.id
```

The code went over 72 089 195 results and sort them per language, extract the first name and assigns them a gender (sounds terrible, I know but it happens 353 000 times per day on average). 

### Known caveats
- Not everybody uses their full name on GitHub
- Incorrect names may result in wrong statistics
- Mirrors of repositories can be counted incorrect
- Non-binary people are not detectable
- Gender-neutral names may cause incorrect assignment
- Probably some more that went wrong
- I suggest NOT to take these as ABSOLUTE numbers but as an attempt for representation

## The numbers
<iframe width="600" height="371" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/1hxqDS57CQ5H_O1gh_qs3gGgGyK7_zx7n0gFjIbhr7m0/pubchart?oid=1427616262&amp;format=interactive"></iframe>

([Link to the Google docs, in case you block the iframe](https://docs.google.com/spreadsheets/d/1hxqDS57CQ5H_O1gh_qs3gGgGyK7_zx7n0gFjIbhr7m0/pubchart?oid=1427616262&format=interactive))

## Conclusion
The numbers seems to be more or less of what other people seem to find. Why Go is so high is still a question for me, either they love open source or Women Who Go is doing a better job than other communities. On the other side we still have a lang way to go to the wanted 50/50. 

## Feedback
I am only human and I do make mistakes. If you have any comments or feedback or maybe I did it totally wrong feel free to contact me! You can also see and contribute to the code used, or do your own re-run!

## Thank you
Fist of all this wouldn't be possible without Sarah Adams for the software as well as for sponsoring the Google Cloud (again sorry for the costs, Google kept showing $0 any to me :( )) and all support and code reviews! 

Also ~~Google~~ GHTorrent for making the GitHub database available. Inge Tyskens for the Thomas More numbers. And SHOUTca.st for paying for the (not so) giant (C2750 with 32GB ram and 200GB swap in case we needed it) iron that processed the results. 

PS: [Help to get an even lager representation at Gophercon this year](https://www.generosity.com/community-fundraising/women-who-go-to-gophercon)

All code is available at https://github.com/meyskens/go-gender-stats