---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: main
title: Inicio
lang: es
page_id: index
permalink: /
---

<!-- Hero Section -->
<section class="dark:bg-gray-900 bg-gray-100 dark:text-white text-black py-20 md:py-28 rounded-b-3xl shadow-xl">
    <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl text-gray-900 dark:text-white md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 animate-fade-in-up">
            <span>{{ site.title }}</span><br>Exploraciones de Código y Aventuras de Desarrollo
        </h1>
        <p class="text-lg md:text-xl max-w-3xl mx-auto mb-8 opacity-90 animate-fade-in-up delay-100">
            Hola, soy <span class="font-semibold">{{ site.author.name }}</span>, un <span class="font-semibold">{{ site.author.specialty }}</span> apasionado por construir y compartir. En este blog, desgloso temas complejos en guías claras y prácticas.
        </p>
        <a href="{{ '/blog/' | relative_url }}" class=" animate-fade-in-up dark:text-gray-200  text-gray-700 hover:text-gray-300 delay-200">
            Lee Mis Artículos →
        </a>
        <div class="flex justify-center space-x-6 mt-8 animate-fade-in-up delay-300">
            {% if site.github_username %}
            <a href="https://github.com/{{ site.github_username }}" target="_blank" rel="noopener noreferrer" class="dark:text-white text-black hover:text-blue-200 transition-colors duration-300" aria-label="GitHub">
                <i class="fab fa-github fa-2x"></i>
            </a>
            {% endif %}
            {% if site.twitter_username %}
            <a href="https://twitter.com/{{ site.twitter_username }}" target="_blank" rel="noopener noreferrer" class="dark:text-white text-black hover:text-blue-200 transition-colors duration-300" aria-label="Twitter">
                <i class="fab fa-twitter fa-2x"></i>
            </a>
            {% endif %}
            {% if site.linkedin_username %}
            <a href="https://www.linkedin.com/in/{{ site.linkedin_username }}" target="_blank" rel="noopener noreferrer" class="dark:text-white text-black hover:text-blue-200 transition-colors duration-300" aria-label="LinkedIn">
                <i class="fab fa-linkedin fa-2x"></i>
            </a>
            {% endif %}
        </div>
    </div>
</section>

<!-- Latest Articles Section -->
<!-- <section class="py-16 md:py-20 bg-gray-50 dark:bg-gray-800">
    <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">Últimos Artículos</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {% assign current_lang = site.active_lang %}

            {% for post in site.posts limit:3 %}
     {% if post.lang == current_lang %}

            <article class="bg-white dark:bg-gray-500 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                {% comment %} Optional: Add a placeholder image if you want to feature images with posts {% endcomment %}
                {% if post.image %}
                <img src="{{post.image}}" alt="Post Thumbnail" class="w-full h-48 object-cover">
                {% endif %}
                <div class="p-6">
                    <h3 class="text-xl dark:text-white font-semibold text-gray-900 mb-2">
                        <a href="{{ post.url | relative_url }}" class="hover:text-blue-600 transition-colors duration-300">{{ post.title }}</a>
                    </h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">{{ post.date | date: "%b %d, %Y" }}</p>
                    <p class="text-gray-700 dark:text-white leading-relaxed mb-4">{{ post.excerpt | strip_html | truncate: 150 }}</p>
                    <a href="{{ post.url | relative_url }}" class="dark:text-white text-blue-600 hover:text-blue-800 font-medium flex items-center">
                        Seguir leyendo
                        <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </a>
                </div>
            </article>
            {% endif %}
            {% endfor %}
        </div>
        <div class="text-center mt-12">
            <a href="{{ '/blog/' | relative_url }}" class="button secondary">
                Todos los artículos
            </a>
        </div>
    </div>
</section> -->
<!-- Latest Articles Section -->
<section class="py-16 md:py-20">
    <div class="container mx-auto px-4">
        <h2 class="mb-12 text-black dark:text-white">Últimos Artículos</h2>
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
                Ver Todos los Artículos
            </a>
        </div>
    </div>
</section>

<!-- Skills/Technologies Section -->
<section class="py-16 md:py-20 bg-gray-100 dark:bg-gray-700">
    <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold dark:text-white text-gray-900 text-center mb-12">Qué Construyo y Sobre Qué Escribo</h2>
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
<!-- <section class="py-16 md:py-20 bg-white dark:bg-gray-700">
    <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">About Me</h2>
        <div class="flex flex-col md:flex-row items-center justify-center max-w-4xl mx-auto bg-gray-50 p-8 rounded-2xl shadow-lg">
            {% comment %} Replace with your actual profile photo path {% endcomment %}
            <img src="https://avatars.githubusercontent.com/u/19915240?v=4" alt="{{ site.author.name }}" class="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-blue-600 shadow-md mb-6 md:mb-0 md:mr-8">
            <div>
                <p class="text-lg text-gray-700 leading-relaxed mb-6">
                    Soy <span class="font-semibold">{{ site.author.name }}</span>, un/a <span class="font-semibold">{{ site.author.specialty_es | default: site.author.specialty }}</span> centrado/a en el desarrollo de soluciones robustas y escalables. Mi trabajo se enfoca en la creación de software de impacto y en compartir conocimientos obtenidos de la experiencia práctica.
                </p>
                <a href="{{ '/about/' | relative_url }}" class="button">
                    Conoce Más Sobre Mi Trayectoria →
                </a>
            </div>
        </div>
    </div>
</section> -->

<section class="py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4">
        <h2 class="section-header mb-12">Sobre Mí</h2>
        <div class="max-w-4xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div class="md:col-span-1">
                    <img src="https://avatars.githubusercontent.com/u/19915240?v=4" alt="{{ site.author.name }}" class="w-full h-auto rounded-lg shadow-md">
                </div>
                <div class="md:col-span-2">
                    <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                        Soy <span class="font-semibold">{{ site.author.name }}</span>, un <span class="font-semibold">{{ site.author.specialty_es | default: site.author.specialty }}</span> 
                         centrado en el desarrollo de soluciones robustas y escalables. Mi trabajo se enfoca en la creación de software de impacto y en compartir conocimientos obtenidos de la experiencia práctica.
                    </p>
                    <a href="{{ '/about/' | relative_url }}" class="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                        Conoce Más Sobre Mi Trayectoria →
                    </a>
                </div>
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
