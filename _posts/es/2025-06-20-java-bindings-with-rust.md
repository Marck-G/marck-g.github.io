---
layout: post
title:  "Crea tu propia librería nativa pra Java con Rust y J4RS"
date:   2025-06-20 10:50:39 +0200
excerpt_separator: <!--more-->
image: /assets/img/java-rust.png
lang: es
categories: lowlevel development tutorial
tags: native java cerberus
page_id: java-rust-j4rs
---

Descubre cómo integrar la potencia y seguridad de Rust directamente en tus proyectos Java. En esta publicación, te guiaremos paso a paso en la creación de una biblioteca nativa, utilizando el framework J4RS para una interoperabilidad sencilla y eficiente. Aprende a aprovechar lo mejor de ambos mundos para optimizar el rendimiento y la fiabilidad de tus aplicaciones.
<!--more-->
<div class="py-2"></div>

<h3 class="text-xl font-bold my-2 uppercase">¡Hola Java!</h3>

<p>El ecosistema Java prospera gracias a su promesa de "escribe una vez, ejecuta en cualquier lugar", una hazaña lograda en gran medida por la <b>Máquina Virtual de Java (JVM)</b>. Esta potente máquina de computación abstracta actúa como un intermediario crucial, transformando el código de bytes Java compilado en instrucciones que el sistema operativo de tu computadora puede entender. Cuando ejecutas una aplicación Java, la JVM carga dinámicamente las clases y bibliotecas necesarias, interpretándolas o compilándolas <b>justo a tiempo (JIT)</b> en código máquina nativo para su ejecución. Este proceso de carga dinámica es increíblemente flexible, permitiendo que las aplicaciones accedan a una vasta gama de funcionalidades proporcionadas por la Biblioteca de Clases de Java y las dependencias de terceros.</p>

<div class="py-2"></div>

<p>Sin embargo, hay escenarios en los que incluso la JVM altamente optimizada podría no ser suficiente. Para tareas que exigen un <b>rendimiento máximo absoluto</b>, acceso de bajo nivel al sistema o interacción directa con el hardware, entran en juego las <b>bibliotecas nativas</b>. Estas bibliotecas, típicamente escritas en lenguajes como C, C++ o, en nuestro caso, Rust, se compilan directamente en código máquina para un sistema operativo y arquitectura específicos. Cuando una aplicación Java necesita utilizar una de estas bibliotecas, se basa en mecanismos como la <b>Interfaz Nativa de Java (JNI)</b> para tender un puente. Aunque JNI ofrece una inmensa potencia, su complejidad puede ser un obstáculo. Aquí es donde frameworks como <b>J4RS (Java para Rust)</b> simplifican el proceso, proporcionando una forma más intuitiva e idiomática de Rust para crear e interactuar con bibliotecas nativas. En este artículo, exploraremos cómo aprovechar la velocidad y la seguridad de Rust para extender tus aplicaciones Java, construyendo bibliotecas nativas que se integren perfectamente con tu código base existente, gracias a la elegancia de J4RS.</p>

<div class="py-2"></div>
<h3 class="text-xl font-bold my-2 uppercase">¿Qué es Rust?</h3>

<p>Rust es un <b>lenguaje de programación de sistemas</b> que enfatiza la <b>seguridad, la velocidad y la concurrencia</b>. Lanzado por primera vez en 2015, ha ganado rápidamente terreno y consistentemente encabeza las encuestas de desarrolladores como uno de los lenguajes de programación "más queridos". Su sintaxis resultará familiar a los desarrolladores de C/C++, pero introduce conceptos innovadores que cambian fundamentalmente la forma de abordar la programación de bajo nivel.</p>

<div class="py-2"></div>
<h3 class="text-xl font-bold my-2 uppercase">
El desafío de la interoperabilidad: Java Native Interface (JNI)
</h3>

<p>Hemos hablado del "porqué"—por qué querrías código nativo junto a tu Java—pero ahora vamos a sumergirnos en el "cómo". El mecanismo estándar proporcionado por el Kit de Desarrollo de Java (JDK) para que Java interactúe con código escrito en otros lenguajes (como C, C++ y, efectivamente, Rust) es la <b>Java Native Interface (JNI)</b>. Piensa en JNI como un sofisticado traductor y puente, que permite a tu aplicación Java, ejecutándose dentro de la JVM, invocar funciones en una biblioteca nativa, y viceversa.</p>

<div class="py-2"></div>
<h4 class="text-lg font-bold my-2 uppercase">
Cómo funciona JNI (La forma tradicional)
</h4>

<p>Para entender J4RS, es útil comprender primero los fundamentos de JNI "puro":</p>

<ol>
<li>
    <span class="font-bold">Declaración de métodos nativos en Java</span>:
    Comienzas declarando un método en tu clase Java con la palabra clave <code class="bg-gray-100 px-1 rounded text-red-700 py-1"> native </code>, pero sin una implementación. Esto le dice a la JVM que el código real del método reside en una biblioteca nativa. También usarás típicamente <code class="bg-gray-100 px-1 rounded text-red-700 py-1">System.loadLibrary("your_native_library_name");</code> para cargar el código nativo compilado en tiempo de ejecución.
    <pre>
    <code class="language-java bg-gray-800 text-white p-3 rounded text-sm overflow-x-auto mt-2">
public class MyJavaApp {
    static {
        System.loadLibrary("my_rust_library"); // Carga libmy_rust_library.so/.dll/.dylib
    }

    public native String greetFromNative(String name); // Declaración de método nativo

    public static void main(String[] args) {
        MyJavaApp app = new MyJavaApp();
        System.out.println(app.greetFromNative("World"));
    }
}
    </code>
    </pre>
</li>
<li>
<b>Generación de archivos de cabecera C/C++:</b>: Históricamente, después de compilar tu clase Java, usarías la herramienta <code class="bg-gray-100 px-1 rounded text-red-700 py-1">javah</code> (ahora a menudo integrada en compiladores como <code class="bg-gray-100 px-1 rounded text-red-700 py-1">javac</code> o IDEs) para generar un archivo de cabecera C/C++ (<code class="bg-gray-100 px-1 rounded text-red-700 py-1">.h</code>). Este archivo de cabecera contendría las firmas de función exactas a las que tu implementación nativa necesita adherirse, asegurando la compatibilidad con el método Java.
</li>
<li>
<b>Implementación de métodos nativos</b>: Luego escribes la implementación real de estas funciones en C o C++. Estas implementaciones reciben tipos JNI especiales (como <code class="bg-gray-100 px-1 rounded text-red-700 py-1">JNIEnv*</code>, <code class="bg-gray-100 px-1 rounded text-red-700 py-1">jobject</code> para los objetos java o <code class="bg-gray-100 px-1 rounded text-red-700 py-1">jstring</code> para las cadenas de texto de java)

<pre class="my-2">
<code class="language-c bg-gray-800 text-white p-3 rounded text-sm overflow-x-auto mt-2">
// Ejemplo de una función C generada por JNI para el método Java anterior
JNIEXPORT jstring JNICALL Java_MyJavaApp_greetFromNative
  (JNIEnv *env, jobject obj, jstring javaName) {
    // Obtener cadena C de cadena Java
    const char *cName = (*env)->GetStringUTFChars(env, javaName, 0);
    // ... hacer algo con cName ...
    char result[256];
    sprintf(result, "Hello %s from C!", cName);
    (*env)->ReleaseStringUTFChars(env, javaName, cName); // Liberar memoria

    return (*env)->NewStringUTF(env, result); // Devolver una nueva cadena Java
}
</code>
</pre>
</li>
<li>
        <b class="font-semibold">Compilación en una biblioteca compartida:</b> Finalmente, el código C/C++ se compila en una biblioteca compartida específica de la plataforma (por ejemplo, <code class="bg-gray-100 p-1 rounded text-red-700">.so</code> en Linux, <code class="bg-gray-100 p-1 rounded text-red-700">.dll</code> en Windows, <code class="bg-gray-100 p-1 rounded text-red-700">.dylib</code> en macOS). Esta biblioteca compilada es lo que tu aplicación Java carga en tiempo de ejecución.
    </li>
</ol>

<h4 class="text-lg font-semibold mt-6 mb-3">Las complejidades y trampas del JNI puro</h4>

<p class="mb-4">Si bien JNI proporciona el puente necesario, trabajar directamente con él puede ser complicado y propenso a errores, especialmente para desarrolladores que no están profundamente familiarizados con la gestión de memoria en C/C++ y las llamadas al sistema de bajo nivel.</p>

<ul class="list-disc list-inside ml-4 space-y-3 mb-6">
    <li>
        <strong class="font-semibold">Código repetitivo (Boilerplate):</strong> Incluso para tareas simples, JNI requiere una cantidad significativa de código repetitivo. Convertir entre tipos de Java y nativos (por ejemplo, de <code class="bg-gray-100 p-1 rounded text-red-700">String</code> a <code class="bg-gray-100 p-1 rounded text-red-700">char*</code> y viceversa, o de <code class="bg-gray-100 p-1 rounded text-red-700">int[]</code> a <code class="bg-gray-100 p-1 rounded text-red-700">jintArray</code> y luego a un arreglo de C) implica numerosas llamadas a funciones JNI, asignación y liberación manual de memoria. Esta verbosidad puede hacer que tu código se vuelva difícil de leer y mantener rápidamente.
    </li>
    <li>
        <strong class="font-semibold">Propenso a errores e inseguro:</strong> La mayor desventaja del JNI puro es su inseguridad inherente. Estás operando a un nivel bajo, con acceso directo a la memoria.
        <ul class="list-disc list-inside ml-6 mt-1 space-y-1">
            <li><strong class="font-semibold">Gestión manual de memoria:</strong> A diferencia del recolector de basura de Java, eres responsable de gestionar explícitamente la memoria asignada en el código nativo. Olvidar liberar recursos (como cadenas obtenidas con <code class="bg-gray-100 p-1 rounded text-red-700">GetStringUTFChars</code>) provoca <strong class="font-semibold">fugas de memoria</strong>.</li>
            <li><strong class="font-semibold">Punteros directos:</strong> Los errores con punteros pueden causar <strong class="font-semibold">fallos de segmentación</strong> o <strong class="font-semibold">crashes de la JVM</strong>, derribando toda tu aplicación. Depurar estos fallos, que se originan en el código nativo pero se manifiestan en la JVM, puede ser extremadamente difícil.</li>
            <li><strong class="font-semibold">Seguridad en hilos (Thread safety):</strong> Manejar la seguridad en hilos al cruzar el límite de JNI requiere una sincronización cuidadosa, lo cual es fácil de hacer mal.</li>
        </ul>
    </li>
    <li>
        <strong class="font-semibold">Marshalling de tipos tedioso:</strong> Traducir tipos de datos complejos entre el sistema de tipos de Java y los tipos de C/C++ es tedioso. Objetos, arreglos e incluso colecciones requieren múltiples llamadas JNI para acceder a sus campos, métodos o elementos, lo que lleva a código verboso y propenso a errores.
    </li>
    <li>
        <strong class="font-semibold">Curva de aprendizaje pronunciada:</strong> JNI tiene su propia API extensa, reglas y buenas prácticas. Dominarlo toma un tiempo y esfuerzo considerables, a menudo requiriendo profundizar en detalles de C/C++ a los que los desarrolladores de Java podrían no estar acostumbrados.
    </li>
    <li>
        <strong class="font-semibold">Depuración desafiante:</strong> Cuando surge un problema que abarca tanto el código Java como el nativo, la depuración se vuelve significativamente más compleja. A menudo necesitas usar depuradores nativos específicos de la plataforma (como GDB o LLDB) junto con depuradores de Java, haciendo que el proceso de depuración sea engorroso.
    </li>
</ul>

<p class="mb-4">Dadas estas complejidades, el uso directo de JNI suele reservarse para escenarios donde se requiere un control extremo o una integración específica con una biblioteca nativa, y el equipo de desarrollo tiene experiencia en C/C++. Para muchos otros casos, se desea una abstracción de nivel más alto. Precisamente aquí es donde <strong class="font-semibold">J4RS (Java For Rust)</strong> entra en juego, con el objetivo de simplificar esta compleja interacción entre Java y Rust.</p>

<h3 class="text-xl font-bold my-2 uppercase">Simplificando la Interoperabilidad con J4RS (Java Para Rust)</h3>

<p class="mb-4">Como hemos visto, si bien JNI proporciona el puente fundamental entre Java y el código nativo, su naturaleza de bajo nivel puede introducir una complejidad significativa, código repetitivo y potencial de errores. Aquí es donde entran en juego frameworks como <strong class="font-semibold">J4RS (Java Para Rust)</strong>. J4RS es una solución potente y elegante diseñada para simplificar drásticamente el proceso de llamar código Rust desde Java, e incluso código Java desde Rust, abstrae los detalles intrincados de JNI.</p>

<h4 class="text-lg font-semibold mt-6 mb-3">¿Por qué J4RS? Abstracción de la complejidad de JNI</h4>

<p class="mb-4">El valor fundamental de J4RS reside en su capacidad para proporcionar una interfaz de nivel superior y más idiomática para la comunicación entre lenguajes. En lugar de manejar manualmente los punteros <code class="bg-gray-100 p-1 rounded text-red-700">JNIEnv*</code> de JNI y las conversiones de tipo explícitas, J4RS ofrece un conjunto de abstracciones que hacen que la interacción se sienta mucho más natural tanto para los desarrolladores de Java como para los de Rust.</p>

<h4 class="text-lg font-semibold mt-6 mb-3">Características clave de J4RS</h4>

<ul class="list-disc list-inside ml-4 space-y-3 mb-6">
    <li>
        <strong class="font-semibold">Conversión automática de tipos:</strong> Uno de los mayores inconvenientes de JNI es la serialización de tipos de datos entre Java y los lenguajes nativos. J4RS maneja muchas conversiones comunes automáticamente. Por ejemplo, un <code class="bg-gray-100 p-1 rounded text-red-700">String</code> de Java se puede consumir directamente como un <code class="bg-gray-100 p-1 rounded text-red-700">String</code> de Rust, y los tipos primitivos se asignan sin problemas. Esto reduce drásticamente la cantidad de código de conversión manual que necesita escribir. Para tipos más complejos, J4RS a menudo aprovecha la serialización (por ejemplo, a través de <a href="https://serde.rs/" class="text-blue-600 hover:underline" target="_blank">Serde</a> en Rust) para facilitar el intercambio de datos.
    </li>
    <li>
        <strong class="font-semibold">API más sencilla:</strong> J4RS proporciona una API concisa e intuitiva tanto en el lado de Rust como en el de Java. En Rust, utilizará atributos específicos (como <code class="bg-gray-100 p-1 rounded text-red-700">#[j4rs]</code> o <code class="bg-gray-100 p-1 rounded text-red-700">#[call_from_java]</code>) para marcar las funciones que deben exponerse a Java. En el lado de Java, las interacciones se gestionan a través de una instancia de <code class="bg-gray-100 p-1 rounded text-red-700">J4rs</code>, lo que le permite cargar bibliotecas, crear objetos Java e invocar métodos con una sintaxis mucho más limpia que las llamadas JNI sin procesar.
    </li>
    <li>
        <strong class="font-semibold">Enfoque idiomático de Rust:</strong> J4RS tiene como objetivo que el lado de Rust de la integración se sienta lo más "Rust-y" posible. Esto significa que a menudo puede escribir funciones Rust con tipos familiares y mecanismos de manejo de errores (como <code class="bg-gray-100 p-1 rounded text-red-700">Result</code>), y J4RS se encarga del pegamento JNI subyacente.
    </li>
    <li>
        <strong class="font-semibold">Manejo de errores optimizado:</strong> Propagar errores limpiamente a través del límite Java-Rust es crucial. J4RS simplifica esto permitiendo que los tipos <code class="bg-gray-100 p-1 rounded text-red-700">Result</code> de Rust (que encapsulan el éxito o el fracaso) se traduzcan en excepciones de Java. Si una función Rust devuelve un <code class="bg-gray-100 p-1 rounded text-red-700">Err</code>, J4RS puede lanzar automáticamente una <code class="bg-gray-100 p-1 rounded text-red-700">InvocationException</code> (o una excepción personalizada) en el mundo Java, haciendo que la gestión de errores sea más robusta y explícita.
    </li>
    <li>
        <strong class="font-semibold">Llamadas bidireccionales:</strong> J4RS admite la llamada de Java desde Rust y la llamada de Rust desde Java. Si bien nuestro enfoque principal aquí es Rust desde Java, la capacidad de su código Rust para interactuar con la JVM (por ejemplo, instanciar objetos Java, llamar métodos Java, usar el vasto ecosistema de Java) agrega otra capa de flexibilidad.
    </li>
    <li>
        <strong class="font-semibold">Gestión de dependencias:</strong> J4RS puede ayudar con la gestión de dependencias de Java, incluida la carga de artefactos JAR de repositorios Maven, lo que simplifica la configuración de sus proyectos híbridos de Java-Rust.
    </li>
</ul>

<h4 class="text-lg font-semibold mt-6 mb-3">Cómo funciona J4RS a alto nivel</h4>

<p class="mb-4">En esencia, J4RS aprovecha JNI, pero lo hace entre bastidores. Cuando usted expone una función Rust a Java usando J4RS, el framework esencialmente genera o proporciona el código repetitivo JNI necesario para usted. Este código actúa como un contenedor alrededor de su lógica Rust pura. Cuando Java llama a un método expuesto por J4RS:</p>

<ol class="list-decimal list-inside ml-4 space-y-3 mb-6">
    <li>El lado de Java realiza una llamada a un método proxy proporcionado por J4RS.</li>
    <li>J4RS, utilizando su implementación interna de JNI, serializa los argumentos de Java en tipos compatibles con Rust.</li>
    <li>Luego invoca su función Rust real.</li>
    <li>Al recibir el resultado de Rust (que podría ser un valor simple o un <code class="bg-gray-100 p-1 rounded text-red-700">Result</code> para el manejo de errores), J4RS lo serializa de nuevo en un tipo compatible con Java.</li>
    <li>Si se produjo un error en Rust, J4RS lo traduce en una excepción de Java, que luego se lanza en su aplicación Java.</li>
</ol>

<p class="mb-4">Esta abstracción reduce significativamente la cantidad de código JNI de bajo nivel que necesita escribir y administrar, lo que le permite concentrarse en la lógica de negocios dentro de sus componentes Rust y Java. En las siguientes secciones, le guiaremos a través de la configuración de un proyecto y la construcción de un ejemplo práctico para demostrar J4RS en acción.</p>

<h3 class="text-xl font-bold my-2 uppercase">Configuración de su entorno de desarrollo</h3>

<p class="mb-4">Antes de que podamos empezar a construir nuestra biblioteca nativa, necesitamos asegurarnos de que nuestro entorno de desarrollo esté correctamente configurado. Esto implica instalar Rust y Java, y luego configurar nuestros archivos de proyecto para que tanto los componentes de Rust como los de Java trabajen juntos sin problemas con J4RS.</p>

<div class="my-6">
    <pre class="mermaid bg-gray-800 text-white p-4 rounded text-sm overflow-x-auto">

---
config:
    theme: base
    layout: elk
---
graph TD
    subgraph Entorno de Desarrollo
        A[Su Computadora] --> B(Toolchain de Rust <br> & Cargo);
        A --> C(Java JDK <br> & Maven/Gradle);
    end

    subgraph Estructura del Proyecto
        D[my-rust-library/] --> E(Cargo.toml <br> cdylib, j4rs);
        D --> F(src/lib.rs);
        G[my-java-app/] --> H(pom.xml <br> dependencia j4rs);
        G --> I(src/main/java/...);
    end

    E -- "Construye" --> J[libmy_rust_library.so/.dll/.dylib];
    H -- "Carga" --> J;
    J -- "Llamado por" --> I;

    style D fill:#e0f2f7,stroke:#3498db,stroke-width:2px;
    style G fill:#fffde7,stroke:#f1c40f,stroke-width:2px;
    style J fill:#d4edda,stroke:#28a745,stroke-width:2px;
    style B fill:#a2d9ce,stroke:#1abc9c,stroke-width:2px;
    style C fill:#f8d7da,stroke:#dc3545,stroke-width:2px;
</pre>
    <p class="text-center text-sm text-gray-600 mt-2">Figura 1: Estructura del proyecto y dependencias de alto nivel</p>
</div>

<p class="mb-4">Una vez completados estos pasos de configuración inicial, su entorno estará listo. Tenemos un proyecto Rust configurado para construir una biblioteca nativa y un proyecto Java listo para consumirla usando J4RS. En la siguiente sección, escribiremos nuestra primera función Rust y la llamaremos desde Java.</p>

<h4 class="text-lg font-semibold mt-6 mb-3">1. Instalación de Rust</h4>

<p class="mb-4">La forma más fácil y recomendada de instalar Rust es usando <strong class="font-semibold">rustup</strong>, el instalador oficial de la cadena de herramientas de Rust. Rustup gestiona las versiones de Rust y las herramientas asociadas, lo que simplifica la actualización de Rust, el cambio entre canales estables/beta/nocturnos y la adición de objetivos de compilación cruzada.</p>

<ul class="list-disc list-inside ml-4 space-y-2 mb-4">
    <li>
        <strong class="font-semibold">En Linux o macOS:</strong> Abra su terminal y ejecute el siguiente comando:
<pre><code class="language-bash bg-gray-800 text-white p-3 rounded text-sm overflow-x-auto mt-2">curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh</code></pre>
        Siga las instrucciones en pantalla. Es posible que se le pida su contraseña.
    </li>
    <li>
        <strong class="font-semibold">En Windows:</strong> Descargue y ejecute <code class="bg-gray-100 p-1 rounded text-red-700">rustup-init.exe</code> desde <a href="https://rustup.rs/" class="text-blue-600 hover:underline" target="_blank">rustup.rs</a>. Siga las instrucciones del instalador gráfico. También es posible que necesite instalar las <strong class="font-semibold">Visual Studio C++ Build Tools</strong> cuando se le solicite, ya que Rust las necesita para la vinculación en Windows.
    </li>
</ul>
<p class="mb-4">Después de la instalación, abra una <strong class="font-semibold">nueva terminal o símbolo del sistema</strong> y verifique la instalación:</p>
<pre><code class="language-bash bg-gray-800 text-white p-3 rounded text-sm overflow-x-auto mt-2">rustc --version
cargo --version</code></pre>
<p class="mb-4">Debería ver los números de versión tanto para el compilador de Rust (<code class="bg-gray-100 p-1 rounded text-red-700">rustc</code>) como para Cargo, el gestor de paquetes de Rust.</p>

<h4 class="text-lg font-semibold mt-6 mb-3">2. Instalación de Java JDK</h4>

<p class="mb-4">Necesitará un Kit de Desarrollo de Java (JDK) instalado para compilar y ejecutar su aplicación Java. J4RS requiere Java 8 o posterior. Si no tiene uno, puede descargar un JDK de varios proveedores (por ejemplo, Oracle, OpenJDK, Adoptium/Eclipse Temurin).</p>
<ul class="list-disc list-inside ml-4 space-y-2 mb-4">
    <li>Descargue desde <a href="https://adoptium.net/temurin/releases/" class="text-blue-600 hover:underline" target="_blank">Adoptium (Eclipse Temurin)</a> para obtener un JDK gratuito de código abierto.</li>
</ul>
<p class="mb-4">Verifique su instalación de Java:</p>
<pre><code class="language-bash bg-gray-800 text-white p-3 rounded text-sm overflow-x-auto mt-2">java -version
javac -version</code></pre>
<p class="mb-4">Asegúrese de que ambos comandos devuelvan un número de versión, lo que indica que el JDK está correctamente instalado y configurado en la PATH de su sistema.</p>

<h4 class="text-lg font-semibold mt-6 mb-3">3. Configuración de su proyecto</h4>

<p class="mb-4">Crearemos un proyecto de varias partes: una biblioteca Rust y una aplicación Java que la consume. Recomendamos usar una herramienta de automatización de compilación como Maven o Gradle para la parte de Java, ya que simplifica la gestión de dependencias.</p>

<h5 class="text-md font-semibold mt-4 mb-2">3.1. Creación de un nuevo proyecto Rust (Biblioteca)</h5>
<p class="mb-4">Navegue a la carpeta de su proyecto deseado en su terminal y cree un nuevo proyecto de biblioteca Rust usando Cargo:</p>
<pre><code class="language-bash bg-gray-800 text-white p-3 rounded text-sm overflow-x-auto mt-2">cargo new my-rust-library --lib
cd my-rust-library</code></pre>
<p class="mb-4">Este comando crea un nuevo directorio <code class="bg-gray-100 p-1 rounded text-red-700">my-rust-library</code> con un Cargo.toml básico y <code class="bg-gray-100 p-1 rounded text-red-700">src/lib.rs</code>.</p>

<h5 class="text-md font-semibold mt-4 mb-2">3.2. Adición de la dependencia J4RS a <code class="bg-gray-100 p-1 rounded text-red-700">Cargo.toml</code></h5>
<p class="mb-4">Abra el archivo <code class="bg-gray-100 p-1 rounded text-red-700">Cargo.toml</code> en su directorio <code class="bg-gray-100 p-1 rounded text-red-700">my-rust-library</code> y añada las dependencias <code class="bg-gray-100 p-1 rounded text-red-700">j4rs</code> y <code class="bg-gray-100 p-1 rounded text-red-700">j4rs_derive</code> bajo la sección <code class="bg-gray-100 p-1 rounded text-red-700">[dependencies]</code>. Además, y de forma crucial, especifique el tipo de crate como <code class="bg-gray-100 p-1 rounded text-red-700">cdylib</code> (biblioteca dinámica compatible con C) para que Java pueda cargarla.</p>
<pre><code class="language-toml bg-gray-800 text-white p-3 rounded text-sm overflow-x-auto mt-2"># Cargo.toml para su biblioteca Rust

[package]
name = "my-rust-library"
version = "0.1.0"
edition = "2021"

[lib]
crate-type = ["cdylib"] # Esto es esencial para crear una biblioteca compartida cargable por Java

[dependencies]
j4rs = "0.22.0" # Use la última versión disponible en crates.io
j4rs_derive = "0.22.0" # Crate complementario para macros, misma versión que j4rs
serde = { version = "1.0", features = ["derive"] } # Para serialización opcional de tipos complejos
serde_json = "1.0" # Para serialización opcional de tipos complejos</code></pre>
<p class="mb-4">Nota: Las versiones de <code class="bg-gray-100 p-1 rounded text-red-700">j4rs</code> y <code class="bg-gray-100 p-1 rounded text-red-700">j4rs_derive</code> siempre deben coincidir. Las dependencias <code class="bg-gray-100 p-1 rounded text-red-700">serde</code> y <code class="bg-gray-100 p-1 rounded text-red-700">serde_json</code> son altamente recomendables para manejar estructuras de datos más complejas entre Rust y Java, ya que J4RS a menudo aprovecha Serde para esto.</p>

<h5 class="text-md font-semibold mt-4 mb-2">3.3. Configuración de un proyecto Java (Ejemplo de Maven)</h5>
<p class="mb-4">Fuera de su directorio <code class="bg-gray-100 p-1 rounded text-red-700">my-rust-library</code>, cree un nuevo proyecto Java. Para simplificar, usaremos Maven. Puede usar un IDE o la línea de comandos:</p>
<pre><code class="language-bash bg-gray-800 text-white p-3 rounded text-sm overflow-x-auto mt-2"># En el directorio padre (por ejemplo, junto a my-rust-library)
mvn archetype:generate -DgroupId=com.example.app -DartifactId=my-java-app -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false
cd my-java-app</code></pre>

<h5 class="text-md font-semibold mt-4 mb-2">3.4. Adición de la dependencia J4RS a <code class="bg-gray-100 p-1 rounded text-red-700">pom.xml</code> (Java)</h5>
<p class="mb-4">Abra el archivo <code class="bg-gray-100 p-1 rounded text-red-700">pom.xml</code> en su directorio <code class="bg-gray-100 p-1 rounded text-red-700">my-java-app</code> y añada la dependencia de J4RS Java a la sección <code class="bg-gray-100 p-1 rounded text-red-700">&lt;dependencies&gt;</code>:</p>
<pre><code class="language-xml bg-gray-800 text-white p-3 rounded text-sm overflow-x-auto mt-2">&lt;!-- pom.xml para su aplicación Java --&gt;

&lt;dependencies&gt;
    &lt;dependency&gt;
        &lt;groupId&gt;io.github.astonbitecode&lt;/groupId&gt;
        &lt;artifactId&gt;j4rs&lt;/artifactId&gt;
        &lt;version&gt;0.22.0&lt;/version&gt; <span class="text-gray-400">&lt;!-- Use la misma versión mayor.menor que su crate Rust j4rs --&gt;</span>
    &lt;/dependency&gt;

    <span class="text-gray-400">&lt;!-- Dependencia estándar de JUnit, a menudo incluida por el arquetipo --&gt;</span>
    &lt;dependency&gt;
        &lt;groupId&gt;junit&lt;/groupId&gt;
        &lt;artifactId&gt;junit&lt;/artifactId&gt;
        &lt;version&gt;4.11&lt;/version&gt;
        &lt;scope&gt;test&lt;/scope&gt;
    &lt;/dependency&gt;
&lt;/dependencies&gt;</code></pre>
<p class="mb-4">Es crucial que la versión de J4RS en su <code class="bg-gray-100 p-1 rounded text-red-700">pom.xml</code> de Java sea compatible con la versión utilizada en su <code class="bg-gray-100 p-1 rounded text-red-700">Cargo.toml</code> de Rust. Generalmente, mantener la misma versión mayor.menor es una apuesta segura.</p>

<p class="mb-4">Una vez completados estos pasos de configuración inicial, su entorno estará listo. Tenemos un proyecto Rust configurado para construir una biblioteca nativa y un proyecto Java listo para consumirla usando J4RS. En la siguiente sección, escribiremos nuestra primera función Rust y la llamaremos desde Java.</p>

<h3 class="text-xl font-bold my-2 uppercase">Construyendo su primera biblioteca nativa con Rust y J4RS: Una guía paso a paso</h3>

<p class="mb-4">Con nuestro entorno de desarrollo configurado, ¡es hora de escribir algo de código! En esta sección, crearemos una función Rust simple, la compilaremos en una biblioteca nativa y luego la invocaremos desde nuestra aplicación Java usando J4RS.</p>

<h4 class="text-lg font-semibold mt-6 mb-3">Escenario: Una función de saludo simple</h4>

<p class="mb-4">Comencemos con una variación clásica de "¡Hola, mundo!". Nuestra función Rust tomará un nombre (un <code class="bg-gray-100 p-1 rounded">String</code>) como entrada y devolverá un saludo personalizado (otro <code class="bg-gray-100 p-1 rounded">String</code>). Esto demuestra el paso básico de cadenas y los valores de retorno, que son tareas comunes de interoperabilidad.</p>

<h4 class="text-lg font-semibold mt-6 mb-3">Paso 1: Definir la función nativa en Rust</h4>

<p class="mb-4">Abra el archivo <code class="bg-gray-100 p-1 rounded">src/lib.rs</code> de su biblioteca Rust (ubicado en el directorio <code class="bg-gray-100 p-1 rounded">my-rust-library</code>) y reemplace su contenido con el siguiente código:</p>

<pre>
<code class="language-rust bg-gray-800 text-white p-3 rounded text-sm overflow-x-auto mt-2">

// src/lib.rs en my-rust-library

use j4rs::{Jvm, Instance, InvocationArg, JvmBuilder};
use j4rs_derive::call_from_java;

/// Esta función es invocable desde Java.
/// Toma un String de Rust (que J4RS convierte de un String/Instance de Java)
/// y devuelve un String de Rust (que J4RS convierte de nuevo a un String/Instance de Java).
#[call_from_java("com.example.app.MyJavaApp.greetFromRust")] // Especifique el nombre completo de la clase y el método Java
pub fn greet_from_rust(jvm: Instance, arguments: Vec&lt;Instance&gt;) -&gt; Result&lt;Instance, String&gt; {
    // Las funciones de J4RS invocables desde Java siempre toman 'jvm: Instance' y 'arguments: Vec&gt;Instance&lt;'.
    // La instancia 'jvm' le permite interactuar con la JVM desde Rust.
    // 'arguments' contiene los parámetros pasados desde Java, envueltos en instancias de J4RS.

    let jvm_rust: Jvm = JvmBuilder::new().build().unwrap();

    let name_instance = arguments.get(0).ok_or("Se esperaba un argumento (nombre)".to_string())?;
    let name: String = jvm_rust.to_rust(name_instance)?;

    let greeting = format!("¡Hola, {} desde Rust!", name);

    // Convierta el String de Rust de nuevo a una instancia de J4RS para Java.
    let result_instance = jvm_rust.create_instance("java.lang.String", &[InvocationArg::try_from(greeting)?])?;
    
    Ok(result_instance)
}

</code>
</pre>

<p class="mb-4">Analicemos este código Rust:</p>
<ul class="list-disc list-inside ml-4 space-y-2 mb-4">
    <li><code class="bg-gray-100 p-1 rounded">use j4rs::...</code>: Importamos los componentes necesarios del crate J4RS.</li>
    <li><code class="bg-gray-100 p-1 rounded">#[call_from_java("com.example.app.MyJavaApp.greetFromRust")]</code>: Este es el atributo central de J4RS. Le indica a J4RS que exponga esta función Rust a Java, especificando el nombre completo de la clase Java y el nombre del método que la invocará. Así es como J4RS sabe cómo generar el código repetitivo de JNI.</li>
    <li><code class="bg-gray-100 p-1 rounded">pub fn greet_from_rust(jvm: Instance, arguments: Vec&lt;Instance&gt;) -&gt; Result&lt;Instance, String&gt;</code>:
        <ul>
            <li><strong>Firma:</strong> Todas las funciones Rust invocables desde Java a través de J4RS deben adherirse a esta firma específica. Reciben un <code class="bg-gray-100 p-1 rounded">jvm: Instance</code> (que representa el contexto de la JVM) y <code class="bg-gray-100 p-1 rounded">arguments: Vec&lt;Instance&gt;</code> (un vector de argumentos Java, cada uno envuelto en una <code class="bg-gray-100 p-1 rounded">Instance</code> de J4RS).</li>
            <li><strong>Tipo de retorno:</strong> Se espera que la función devuelva un <code class="bg-gray-100 p-1 rounded">Result&lt;Instance, String&gt;</code>. Esto nos permite devolver un resultado exitoso (envuelto en una <code class="bg-gray-100 p-1 rounded">Instance</code> para Java) o un error (un <code class="bg-gray-100 p-1 rounded">String</code> que describe el fallo, que J4RS convertirá en una excepción de Java).</li>
        </ul>
    </li>
    <li><code class="bg-gray-100 p-1 rounded">let name: String = jvm_rust.to_rust(name_instance)?;</code>: Esta línea demuestra la conversión automática de tipos de J4RS. Extraemos el primer argumento del vector <code class="bg-gray-100 p-1 rounded">arguments</code> y usamos <code class="bg-gray-100 p-1 rounded">jvm_rust.to_rust()</code> para convertir la <code class="bg-gray-100 p-1 rounded">Instance</code> de Java (que representa un <code class="bg-gray-100 p-1 rounded">String</code> de Java en este caso) en un <code class="bg-gray-100 p-1 rounded">String</code> nativo de Rust. El operador <code class="bg-gray-100 p-1 rounded">?</code> es para la propagación de errores.</li>
    <li><code class="bg-gray-100 p-1 rounded">let result_instance = jvm_rust.create_instance(...)</code>: Para devolver un valor a Java, convertimos nuestro <code class="bg-gray-100 p-1 rounded">String</code> de Rust de nuevo en un <code class="bg-gray-100 p-1 rounded">String</code> de Java. Esto se hace creando una nueva instancia de <code class="bg-gray-100 p-1 rounded">String</code> de Java usando <code class="bg-gray-100 p-1 rounded">jvm_rust.create_instance()</code>, envolviendo nuestra cadena Rust como un <code class="bg-gray-100 p-1 rounded">InvocationArg</code>.</li>
</ul>

<h4 class="text-lg font-semibold mt-6 mb-3">Paso 2: Compilar el código Rust en una biblioteca compartida</h4>

<p class="mb-4">Navegue a su directorio <code class="bg-gray-100 p-1 rounded">my-rust-library</code> en la terminal y compile el proyecto. Compilaremos en modo de lanzamiento para un rendimiento optimizado.</p>

<pre><code class="language-bash bg-gray-800 text-white p-3 rounded text-sm overflow-x-auto mt-2">
# En el directorio my-rust-library
cargo build --release
</code></pre>

<p class="mb-4">Tras la compilación exitosa, Cargo generará la biblioteca compartida nativa en el directorio <code class="bg-gray-100 p-1 rounded">target/release/</code>. El nombre del archivo variará según su sistema operativo:</p>
<ul class="list-disc list-inside ml-4 space-y-2 mb-4">
    <li><strong>Linux:</strong> <code class="bg-gray-100 p-1 rounded">libmy_rust_library.so</code></li>
    <li><strong>Windows:</strong> <code class="bg-gray-100 p-1 rounded">my_rust_library.dll</code></li>
    <li><strong>macOS:</strong> <code class="bg-gray-100 p-1 rounded">libmy_rust_library.dylib</code></li>
</ul>
<p class="mb-4">Anote la ruta exacta a esta biblioteca generada, ya que Java necesitará encontrarla.</p>

<h4 class="text-lg font-semibold mt-6 mb-3">Paso 3: Llamar a la función nativa desde Java</h4>

<p class="mb-4">Ahora, cambiemos a nuestro proyecto Java. Abra el archivo <code class="bg-gray-100 p-1 rounded">App.java</code> (ubicado en <code class="bg-gray-100 p-1 rounded">my-java-app/src/main/java/com/example/app/</code>) y modifique su contenido de la siguiente manera:</p>

<pre><code class="language-java bg-gray-800 text-white p-3 rounded text-sm overflow-x-auto mt-2">
// src/main/java/com/example/app/App.java en my-java-app

package com.example.app;

import org.astonbitecode.j4rs.api.j4rs.J4rs;
import org.astonbitecode.j4rs.api.Instance;
import org.astonbitecode.j4rs.api.InvocationException;

public class MyJavaApp {

    public static void main(String[] args) {
        try {
            // Inicializar J4rs. Esto crea una instancia de J4RS que permite la interacción con Rust.
            J4rs j4rs = J4rs.getInstance();

            // --- IMPORTANTE: Cargar la biblioteca compartida de Rust ---
            // Debe proporcionar la ruta absoluta a su biblioteca Rust compilada.
            // Reemplace este marcador de posición con la ruta real encontrada en el Paso 2.
            String rustLibraryPath = "/path/to/my-rust-library/target/release/libmy_rust_library.so";
            // Para Windows: "C:\\path\\to\\my-rust-library\\target\\release\\my_rust_library.dll"
            // Para macOS: "/path/to/my-rust-library/target/release/libmy_rust_library.dylib"

            j4rs.loadLibrary(rustLibraryPath);
            System.out.println("Biblioteca Rust cargada exitosamente desde: " + rustLibraryPath);

            // Invocar la función Rust.
            // El primer argumento de callNative() es el nombre completo del método Java
            // que corresponde al atributo #[call_from_java] en Rust.
            // Los argumentos subsiguientes son los parámetros reales a pasar a la función Rust.
            Instance&lt;String&gt; greetingInstance = j4rs.callNative(
                "com.example.app.MyJavaApp.greetFromRust",
                "Alice" // El nombre a pasar a Rust
            );

            // Convertir la instancia devuelta de nuevo a un String de Java.
            String greeting = greetingInstance.get();

            System.out.println("Recibido de Rust: " + greeting);

        } catch (InvocationException e) {
            System.err.println("Error durante la invocación nativa: " + e.getMessage());
            e.printStackTrace();
        } catch (Exception e) {
            System.err.println("Se produjo un error inesperado: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
</code></pre>

<p class="mb-4">Puntos clave en el código Java:</p>
<ul class="list-disc list-inside ml-4 space-y-2 mb-4">
    <li><code class="bg-gray-100 p-1 rounded">J4rs j4rs = J4rs.getInstance();</code>: Esta línea obtiene la instancia singleton del framework J4rs, que es su punto de entrada para todas las interacciones.</li>
    <li><code class="bg-gray-100 p-1 rounded">j4rs.loadLibrary(rustLibraryPath);</code>: <strong>¡Esto es crítico!</strong> Debe indicarle explícitamente a J4RS dónde encontrar su biblioteca compartida de Rust compilada. Reemplace la ruta del marcador de posición con la ruta absoluta real que anotó en el Paso 2.</li>
    <li><code class="bg-gray-100 p-1 rounded">j4rs.callNative("com.example.app.MyJavaApp.greetFromRust", "Alice");</code>: Así es como se invoca la función Rust.
        <ul>
            <li>El primer argumento es un <code class="bg-gray-100 p-1 rounded">String</code> que coincide con la ruta completa que especificó en el atributo <code class="bg-gray-100 p-1 rounded">#[call_from_java(...)]</code> en su código Rust.</li>
            <li>Los argumentos posteriores son los valores reales que desea pasar a su función Rust. J4RS maneja automáticamente la conversión de primitivas de Java y objetos comunes (como <code class="bg-gray-100 p-1 rounded">String</code>) a los tipos <code class="bg-gray-100 p-1 rounded">Instance</code> esperados por la función Rust.</li>
        </ul>
    </li>
    <li><code class="bg-gray-100 p-1 rounded">Instance&lt;String&gt; greetingInstance = ...; String greeting = greetingInstance.get();</code>: J4RS devuelve los resultados envueltos en un objeto <code class="bg-gray-100 p-1 rounded">Instance</code>. Luego, usa el método <code class="bg-gray-100 p-1 rounded">get()</code> para recuperar el objeto Java real.</li>
    <li><code class="bg-gray-100 p-1 rounded">try...catch (InvocationException e)</code>: J4RS envuelve cualquier error que se origine en el lado de Rust (es decir, si su función Rust devuelve un <code class="bg-gray-100 p-1 rounded">Err</code>) en una <code class="bg-gray-100 p-1 rounded">InvocationException</code> en Java, proporcionando una forma limpia de manejar los fallos.</li>
</ul>

<h4 class="text-lg font-semibold mt-6 mb-3">Paso 4: Ejecutar su aplicación Java</h4>

<p class="mb-4">Ahora, guarde todos sus archivos y compile su aplicación Java. Navegue a su directorio <code class="bg-gray-100 p-1 rounded">my-java-app</code> en la terminal:</p>

<pre><code class="language-bash bg-gray-800 text-white p-3 rounded text-sm overflow-x-auto mt-2">
# En el directorio my-java-app
mvn clean install exec:java -Dexec.mainClass="com.example.app.MyJavaApp"
</code></pre>

<p class="mb-4">Debería ver una salida similar a esta:</p>
<pre class="bg-gray-800 text-white p-3 rounded text-sm overflow-x-auto mt-2"><code>Biblioteca Rust cargada exitosamente desde: /path/to/my-rust-library/target/release/libmy_rust_library.so
Recibido de Rust: ¡Hola, Alice desde Rust!</code></pre>

<p class="mb-4">¡Felicidades! Ha creado con éxito su primera biblioteca nativa con Rust y la ha invocado desde Java usando J4RS. Este ejemplo demuestra el flujo básico, pero J4RS es capaz de mucho más, incluido el manejo de estructuras de datos complejas y llamadas bidireccionales.</p>