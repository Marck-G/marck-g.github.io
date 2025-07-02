---
layout: main
title: About Me
permalink: /about/
page_id: about
lang: en
---

<!-- About Me Hero Section -->
<section class="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16 md:py-24 rounded-b-3xl shadow-xl">
    <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
            About Me
        </h1>
        <p class="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
            Get to know the developer behind the code and the stories.
        </p>
    </div>
</section>

<!-- Main About Content Section -->
<section class="py-12 md:py-16 bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-10 lg:p-12 text-gray-800 dark:text-gray-200">

            <div class="flex flex-col lg:flex-row items-center lg:items-start gap-8 mb-12">
                <!-- Profile Image -->
                <div class="flex-shrink-0">
                    <img src="https://avatars.githubusercontent.com/u/19915240?v=4" alt="{{ site.author.name }}" class="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-blue-600 shadow-lg">
                </div>
                <!-- Introduction Text -->
                <div class="text-center lg:text-left">
                    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Hi, I'm {{ site.author.name }}
                    </h2>
                    <p class="text-lg leading-relaxed mb-4">
                        I'm a passionate <span class="font-semibold text-blue-600 dark:text-blue-400">{{ site.author.specialty }}</span> with a knack for building robust and scalable applications. My journey into development started when I was fascinated by <span class="font-semibold">how software could solve real-world problems</span>, and ever since, I've been hooked on learning and creating.
                    </p>
                    <p class="text-lg leading-relaxed">
                        This blog is my space to share what I've learned, the challenges I've overcome, and my insights into <span class="font-semibold">{{ site.author.interests_summary }}</span>. I believe in continuous learning and open knowledge sharing, and I hope you find something valuable here!
                    </p>
                    <div class="flex justify-center lg:justify-start space-x-6 mt-6">
                        {% if site.github_username %}
                        <a href="https://github.com/{{ site.github_username }}" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-300" aria-label="GitHub">
                            <i class="fab fa-github fa-2x"></i>
                        </a>
                        {% endif %}
                        {% if site.twitter_username %}
                        <a href="https://twitter.com/{{ site.twitter_username }}" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-300" aria-label="Twitter">
                            <i class="fab fa-twitter fa-2x"></i>
                        </a>
                        {% endif %}
                        {% if site.linkedin_username %}
                        <a href="https://www.linkedin.com/in/{{ site.linkedin_username }}" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-300" aria-label="LinkedIn">
                            <i class="fab fa-linkedin fa-2x"></i>
                        </a>
                        {% endif %}
                    </div>
                </div>
            </div>

            <!-- My Journey / Experience Section -->
            <div class="mb-12">
                <h3 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">My Journey & Expertise</h3>
                <div class="prose max-w-none text-gray-700 dark:text-gray-300">
                    <p>
                        My professional journey has taken me through various exciting roles, from <span class="font-semibold">Senior Developer at HP Software Division</span> where I honed my skills in Java and React, to a <span class="font-semibold">Team lead at AKO Electromecánica</span>, focusing on Nodejs and leading projects involving IoT. I've had the opportunity to work on diverse projects, ranging from <span class="font-semibold">large-scale enterprise applications to small, impactful open-source tools.</span>
                    </p>
                    <p>
                        I'm particularly passionate about <span class="font-semibold">{{ site.author.interests_summary }}</span>. I love diving deep into architectural patterns, optimizing performance, and exploring new paradigms that push the boundaries of what's possible in software.
                    </p>
                    <p>
                        Beyond the professional realm, I'm constantly experimenting with side projects. Some of my favorites include <span class="font-semibold">rust api gateway or a JWT alternative wit rust</span>. You can find many of these projects on my <a href="https://github.com/{{ site.github_username }}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">GitHub profile</a>.
                    </p>
                </div>
            </div>

            <!-- What I'm Currently Learning / Excited About Section -->
            <div class="mb-12">
                <h3 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">What I'm Learning & Excited About</h3>
                <div class="prose max-w-none text-gray-700 dark:text-gray-300">
                    <p>
                        The tech landscape is always evolving, and I thrive on staying current. Currently, I'm deep-diving into <span class="font-semibold">Rust development</span>. I'm also exploring <span class="font-semibold">embeded applications development</span>.
                    </p>
                    <p>
                        These explorations often inspire my blog posts, so stay tuned for articles on these topics!
                    </p>
                </div>
            </div>

            <!-- Personal Interests / Hobbies Section -->
            <div>
                <h3 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Beyond the Code</h3>
                <div class="prose max-w-none text-gray-700 dark:text-gray-300">
                    <p>
                        While coding is a huge part of my life, I believe in a healthy work-life balance. When I'm not at my keyboard, you'll often find me <span class="font-semibold">{{ site.author.hobby_summary }}</span>. These activities help me clear my mind and approach coding challenges with fresh perspective.
                    </p>
                    <p>
                        Feel free to reach out if you want to discuss tech, collaborate on a project, or just chat about a common interest/hobby!
                    </p>
                </div>
            </div>

        </div>
    </div>
</section>