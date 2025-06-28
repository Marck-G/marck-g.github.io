---
layout: blog
title: Blog
permalink: /blog/
---

<div class="flex flex-row flex-wrap w-full justify-between">
{% for post in site.posts %}
<div class="basis-33/100 dark:bg-gray-100/10 dark:text-white mb-10 p-4 dark:backdrop-blur-2xl bg-slate-200 rounded-xl">
<h5 class="text-lg mb-3 font-bold uppercase dark:text-slate-200">
{{post.title}}
</h5>
<div class="h-33">
    {{post.excerpt}}
</div>
<div class="mt-5 w-full border-b-4 border-slate-500" > </div>
<a href="{{post.url}}" class="bg-slate-700 text-white inline-block mt-4 pt-2 pb-2 pr-4 pl-4 rounded-md hover:bg-blue-800">
Read more
<svg class="w-6 h-6 text-white-800 inline dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
</svg>

</a>
</div>
{% endfor %}
</div>
