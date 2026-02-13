---
layout: main
title: Home
lang: en
permalink: /
page_id: index
---

<!-- Hero Section -->
<section class="bg-gray-100 dark:bg-gray-900 py-20 md:py-28 border-b border-gray-200 dark:border-gray-700">
    <div class="container mx-auto px-4 text-center">
        <h1 class="blog-title text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {{ site.title }}
        </h1>
        <p class="blog-subtitle text-xl md:text-2xl dark:text-gray-300 text-gray-600 mb-8 max-w-3xl mx-auto">
            Hi, I'm <span class="font-semibold">{{ site.author.name }}</span>, a <span class="font-semibold">{{ site.author.specialty }}</span> passionate about building and sharing. On this blog, I break down complex topics into clear, actionable guides.
        </p>
        <a href="{{ '/blog/' | relative_url }}" class="inline-flex items-center px-6 py-3 text-lg font-medium text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500 hover:-translate-y-1">
            Read More →
        </a>
    </div>
</section>

<!-- Latest Articles Section -->
<section class="py-16 md:py-20">
    <div class="container mx-auto px-4">
        <h2 class="mb-12 text-black dark:text-white">Latest Articles</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {% assign current_lang = site.active_lang %}

            {% for post in site.posts limit:3 %}
            {% if post.lang == current_lang %}
            <article class="card">
                <div class="p-6">
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        <a href="{{ post.url | relative_url }}" class="hover:text-gray-100 dark:hover:text-gray-800 transition-colors duration-200">{{ post.title }}</a>
                    </h3>
                    <p class="text-sm text-black dark:text-gray-100 mb-4">{{ post.date | date: "%b %d, %Y" }}</p>
                    <p class="text-gray-700 dark:text-gray-100 leading-relaxed mb-6">{{ post.excerpt | strip_html | truncate: 150 }}</p>
                    <a href="{{ post.url | relative_url }}" class="inline-flex items-center text-gray-700 dark:text-gray-200 font-medium hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                        Read More →
                    </a>
                </div>
            </article>
            {% endif %}
            {% endfor %}
        </div>
        <div class="text-center mt-12">
            <a href="{{ '/blog/' | relative_url }}" class="inline-flex items-center px-6 py-3 text-lg font-medium text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500 hover:-translate-y-1">
                View All Posts
            </a>
        </div>
    </div>
</section>

<section class="py-16 md:py-20 bg-gray-100 dark:bg-gray-700">
    <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">What I Build and What I Write About</h2>
        {% if site.skills %}
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-4xl mx-auto">
            {% for skill in site.skills %}
            <div class="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                <i class="fab {{ skill.icon }} text-4xl text-blue-600 mb-3"></i>
                <span class="text-lg font-medium text-gray-800 dark:text-gray-100 text-center">{{ skill.name }}</span>
            </div>
            {% endfor %}
        </div>
        {% else %}
        <p class="text-center text-gray-600">
            Create a `_data/skills.yml` file to list your skills and technologies!
        </p>
        {% endif %}
    </div>
</section>

<!-- About Me Section -->
<section class="py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4">
        <h2 class="section-header mb-12">About Me</h2>
        <div class="max-w-4xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div class="md:col-span-1">
                    <img src="https://avatars.githubusercontent.com/u/19915240?v=4" alt="{{ site.author.name }}" class="w-full h-auto rounded-lg shadow-md">
                </div>
                <div class="md:col-span-2">
                    <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                        I'm <span class="font-semibold">{{ site.author.name }}</span>, a <span class="font-semibold">{{ site.author.specialty }}</span> focused on developing robust and scalable solutions. My work centers on creating impactful software and sharing insights gained from practical experience.
                    </p>
                    <a href="{{ '/about/' | relative_url }}" class="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                        Learn More →
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>
