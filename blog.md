---
layout: blog
title: Blog
permalink: /blog/
---

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {% for post in site.posts %}
    <div
        class="bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col">
        <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
            <a href="{{ post.url | relative_url }}"
                class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                {{ post.title }}
            </a>
        </h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {{ post.date | date: "%b %d, %Y" }}
            {% if post.categories %}
            <span class="ml-2">|</span>
            {% for category in post.categories %}
            <span
                class="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-blue-200 dark:text-blue-900 ml-1">
                {{ category }}
            </span>
            {% endfor %}
            {% endif %}
        </p>
        <div class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 flex-grow min-h-[96px]">
            {{ post.excerpt }}
        </div>
        <div class="mt-auto border-t border-gray-200 dark:border-gray-700 pt-4">
            <a href="{{ post.url | relative_url }}"
                class="inline-flex items-center px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-300">
                Read more
                <svg class="ml-2 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m9 5 7 7-7 7" />
                </svg>
            </a>
        </div>
    </div>
    {% endfor %}
</div>
