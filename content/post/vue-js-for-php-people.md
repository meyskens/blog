+++
date = "2017-03-25T21:05:28+01:00"
title = "Vue.js for PHP people"
keywords = []
description = ""
header = "/images/vuejs/northpole.jpg"

+++

*This post is written in context of my education as a tutorial for my teammates*

[Vue.js](http://vuejs.org) is a very light Javascript framework that offers the magic of the big ones (Angular, Ember, React...). Magic you say? How about:
```
<table>
    <tr ng-for="person in people">
        <td ng-click(delete(person))>{{person.name}}</td>
    <tr>
</table>
```
5 lines that control a table with persons you can delete on one click. (note controller not included) The magic here is to just insert the JS into your HTML code. This doesn't only make it simpler but also is more easy to debug.

## Get started
So instead of setting up a whole new folder structure like for the big frameworks let's just load the framework into your existing PHP codebase
```
<script src="https://unpkg.com/vue"></script>
```

The next step is to add a place where Vue.js can do it's magic, a div in your local view controller will be fine:
```
<div id="helloName">
  <p>Hello {{ name }}!</p>
  <input v-model="name">
</div>
```
Next up is a script tag:
```
var app = new Vue({
  el: '#helloName', // specify where the magic happens
  data: {
    name: 'Human' // add a default value, or fetch from your server
  }
})
```
<script async src="//jsfiddle.net/75rxkb8g/embed/"></script>

That was simple? Notice that the variable changes in real time?

Let's try it with a dropdown list:
<script async src="//jsfiddle.net/19kt2wvu/1/embed/"></script>

Now that we have a useless example let's get serious and add vue-resource, a small addon that adds HTTP requests:
<script async src="//jsfiddle.net/rj2gLn9x/3/embed/"></script>

Let's add some data modification
<script async src="//jsfiddle.net/sj486ps6/1/embed/"></script>
As you can see we've added a click event that triggers a method
```
v-on:click="deleteSong(index)">
```
you can even pass variables defined in the loop inside the click event!
```
deleteSong: function(index) {
    	this.songs.splice(index,1);
    }
```
And every change on the data inside vue we do gets automatically changed on the page.

Now the last demo! Why did I add var app= every time? Well you can combine Vue.js with methods of other frameworks of even vanilla JS. Everything declared in there is accessible via the app variable.
<script async src="//jsfiddle.net/ovhgdrr9/1/embed/"></script>


I hope this is a simple and clear overview what Vue.js does! It has a lot more to offer but it couldn't all fit in this blog post. 