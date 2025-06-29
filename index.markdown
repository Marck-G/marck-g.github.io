---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: main
title: Home
---

<!-- Hero Section -->
<section class="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20 md:py-28 rounded-b-3xl shadow-xl">
    <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 animate-fade-in-up">
            <span>{{ site.title }}</span><br>Coding Insights & Developer Adventures
        </h1>
        <p class="text-lg md:text-xl max-w-3xl mx-auto mb-8 opacity-90 animate-fade-in-up delay-100">
            Hi, I'm <span class="font-semibold">{{ site.author.name }}</span>, a <span class="font-semibold">{{ site.author.specialty }}</span> passionate about building and sharing. On this blog, I break down complex topics into clear, actionable guides.
        </p>
        <a href="{{ '/blog/' | relative_url }}" class="button animate-fade-in-up delay-200">
            Start Reading My Articles →
        </a>
        <div class="flex justify-center space-x-6 mt-8 animate-fade-in-up delay-300">
            {% if site.github_username %}
            <a href="https://github.com/{{ site.github_username }}" target="_blank" rel="noopener noreferrer" class="text-white hover:text-blue-200 transition-colors duration-300" aria-label="GitHub">
                <i class="fab fa-github fa-2x"></i>
            </a>
            {% endif %}
            {% if site.twitter_username %}
            <a href="https://twitter.com/{{ site.twitter_username }}" target="_blank" rel="noopener noreferrer" class="text-white hover:text-blue-200 transition-colors duration-300" aria-label="Twitter">
                <i class="fab fa-twitter fa-2x"></i>
            </a>
            {% endif %}
            {% if site.linkedin_username %}
            <a href="https://www.linkedin.com/in/{{ site.linkedin_username }}" target="_blank" rel="noopener noreferrer" class="text-white hover:text-blue-200 transition-colors duration-300" aria-label="LinkedIn">
                <i class="fab fa-linkedin fa-2x"></i>
            </a>
            {% endif %}
        </div>
    </div>
</section>

<!-- Latest Articles Section -->
<section class="py-16 md:py-20 bg-gray-50">
    <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">Latest Articles</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {% for post in site.posts limit:3 %}
            <article class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                {% comment %} Optional: Add a placeholder image if you want to feature images with posts {% endcomment %}
                <!-- <img src="https://placehold.co/600x300/e0e0e0/333333?text=Post+Image" alt="Post Thumbnail" class="w-full h-48 object-cover"> -->
                <div class="p-6">
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">
                        <a href="{{ post.url | relative_url }}" class="hover:text-blue-600 transition-colors duration-300">{{ post.title }}</a>
                    </h3>
                    <p class="text-sm text-gray-500 mb-4">{{ post.date | date: "%b %d, %Y" }}</p>
                    <p class="text-gray-700 leading-relaxed mb-4">{{ post.excerpt | strip_html | truncate: 150 }}</p>
                    <a href="{{ post.url | relative_url }}" class="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                        Read More
                        <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </a>
                </div>
            </article>
            {% endfor %}
        </div>
        <div class="text-center mt-12">
            <a href="{{ '/blog/' | relative_url }}" class="button secondary">
                View All Posts
            </a>
        </div>
    </div>
</section>

<!-- Skills/Technologies Section -->
<section class="py-16 md:py-20 bg-gray-100">
    <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">What I Build & Write About</h2>
        {% if site.skills %}
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-4xl mx-auto">
            {% for skill in site.skills %}
            <div class="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                <i class="fab {{ skill.icon }} text-4xl text-blue-600 mb-3"></i>
                <span class="text-lg font-medium text-gray-800 text-center">{{ skill.name }}</span>
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

<!-- About Me Snippet Section -->
<section class="py-16 md:py-20 bg-white">
    <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-8">About Me</h2>
        <div class="flex flex-col md:flex-row items-center justify-center max-w-4xl mx-auto bg-gray-50 p-8 rounded-2xl shadow-lg">
            {% comment %} Replace with your actual profile photo path {% endcomment %}
            <img src="https://avatars.githubusercontent.com/u/19915240?v=4" alt="{{ site.author.name }}" class="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-blue-600 shadow-md mb-6 md:mb-0 md:mr-8">
            <div>
                <p class="text-lg text-gray-700 leading-relaxed mb-6">
                    I'm <span class="font-semibold">{{ site.author.name }}</span>, a <span class="font-semibold">{{ site.author.specialty }}</span> with a passion for <span class="font-semibold">{{ site.author.interests_summary }}</span>. When I'm not coding, you can find me <span class="font-semibold">{{ site.author.hobby_summary }}</span>.
                </p>
                <a href="{{ '/about/' | relative_url }}" class="button">
                    Learn More About My Journey
                </a>
            </div>
        </div>
    </div>
</section>

<style>
    /* Custom animations for the hero section elements */
    @keyframes fadeInFromBottom {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-fade-in-up {
        animation: fadeInFromBottom 0.8s ease-out forwards;
        opacity: 0; /* Start invisible */
    }

    .animate-fade-in-up.delay-100 { animation-delay: 0.1s; }
    .animate-fade-in-up.delay-200 { animation-delay: 0.2s; }
    .animate-fade-in-up.delay-300 { animation-delay: 0.3s; }
</style>
