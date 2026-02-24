---
layout: page
title: Lumasense
lang: es
permalink: /lumasense
page_id: lumasense
---

# LumaSense: Control Automático del Brillo de Pantalla con Detección de Luz Ambiental

**Fecha:** 24 de febrero de 2026  
**Autor:** Marck D. Carrión  
**Etiquetas:** Rust, Linux, Automatización, Control de Hardware, OpenCV

## Introducción

En el mundo digital actual, pasamos incontables horas frente a pantallas, y uno de los problemas más comunes que enfrentan los usuarios es el cansancio visual causado por un brillo de pantalla inadecuado. Demasiado brillante en una habitación oscura, demasiado tenue en un entorno bien iluminado: estos escenarios son demasiado familiares.

**LumaSense** es una aplicación basada en Rust que ajusta automáticamente el brillo de tu pantalla según las condiciones de luz ambiental detectadas a través de tu cámara. Este proyecto combina visión por computadora, control de hardware y automatización inteligente para crear una experiencia de usuario fluida.

## ¿Qué es LumaSense?

LumaSense es un sistema de control inteligente del brillo de pantalla que:

- **Monitorea la luz ambiental** utilizando la cámara de tu computadora
- **Ajusta automáticamente el brillo de la pantalla** a niveles óptimos
- **Proporciona transiciones suaves** entre diferentes niveles de brillo
- **Se ejecuta como un servicio del sistema** para operación sin manos
- **Es altamente configurable** a través de archivos de configuración TOML

## Cómo Funciona

### 1. Detección de Luz Ambiental

LumaSense utiliza tu cámara para capturar imágenes y analiza la luminosidad promedio de la escena. El proceso implica:

```rust
pub fn get_luminosity(config: &Config) -> f64 {
    let mut cap = VideoCapture::from_file(&format!("/dev/video{}", config.camera.device_index), VideoCaptureAPIs::ANY)
        .expect("Failed to open camera");
    
    let mut frame = Mat::default();
    cap.read(&mut frame).expect("Failed to capture frame");
    
    // Convert to grayscale and calculate average luminosity
    let mut gray = Mat::default();
    cvt_color(&frame, &mut gray, COLOR_BGR2GRAY, 0).expect("Failed to convert to grayscale");
    
    let mean = mean(&gray, &Mat::default()).expect("Failed to calculate mean");
    mean[0]
}
```

### 2. Cálculo del Brillo

El sistema utiliza un algoritmo sofisticado para determinar el brillo óptimo:

- **Luz ambiental baja** (< 10.0): Usa `low_ambient_multiplier` (por defecto: 0.5)
- **Luz ambiental alta** (≥ 10.0): Usa `high_ambient_multiplier` (por defecto: 1.3)
- **Actualizaciones basadas en umbral**: Solo cambia el brillo si la diferencia supera `brightness_threshold`

### 3. Transiciones Suaves

En lugar de cambios de brillo abruptos, LumaSense implementa animaciones suaves:

```rust
pub fn set_backlight(target_brightness: f64, config: &Config) {
    let current_brightness = get_current_brightness(config);
    let steps = config.brightness.animation_steps;
    let duration = config.brightness.animation_duration_ms;
    
    for i in 0..=steps {
        let progress = i as f64 / steps as f64;
        let brightness = current_brightness + (target_brightness - current_brightness) * progress;
        set_brightness(brightness, config);
        std::thread::sleep(Duration::from_millis(duration / steps));
    }
}
```

## Características Clave

### 🎯 **Detección Inteligente de Luz**
- Monitoreo en tiempo real de la luz ambiental a través de la cámara
- Cálculo adaptativo del brillo basado en el entorno
- Umbrales de sensibilidad configurables

### 🔄 **Transiciones Suaves**
- Cambios graduales de brillo para prevenir fatiga visual
- Duración y pasos de animación configurables
- Experiencia de usuario de grado profesional

### ⚙️ **Altamente Configurable**
- Sistema de configuración basado en TOML
- Múltiples ubicaciones de archivos de configuración soportadas
- Recarga de configuración en tiempo de ejecución

### 🛡️ **Integración del Sistema**
- Servicio systemd para arranque automático
- Reglas udev para permisos de hardware adecuados
- Compatibilidad multiplataforma (enfocado en Linux)

### 📊 **Registro Profesional**
- Registro estructurado con tracing
- Niveles de registro configurables
- Monitoreo y depuración de rendimiento

## Configuración

LumaSense soporta un sistema de configuración integral con la siguiente jerarquía:

1. **Configuración de usuario**: `~/.config/lumasense/config.toml`
2. **Configuración del sistema**: `/etc/lumasense.conf`
3. **Directorio del ejecutable**: `config.toml`
4. **Valores por defecto**: Valores integrados

### Configuración de Ejemplo

```toml
[brightness]
# Umbrales de luz ambiental
min_ambient = 0.0
max_ambient = 100.0

# Rango de salida de brillo
min_brightness = 6.0
max_brightness = 100.0

# Multiplicadores para diferentes condiciones de luz
low_ambient_multiplier = 0.5
high_ambient_multiplier = 1.3

# Configuración de animación
animation_duration_ms = 700
animation_steps = 30

# Control de hardware
backlight_path = "/sys/class/backlight/intel_backlight"
brightness_threshold = 1.0

# Intervalo de espera entre verificaciones
sleep_seconds = 5

[camera]
# Configuración de cámara
capture_delay_ms = 100
device_index = 0
```

## Instalación y Uso

### Requisitos Previos

```bash
# Ubuntu/Debian
sudo apt install v4l-utils libopencv-dev

# Arch Linux
sudo pacman -S v4l-utils opencv

# Cadena de herramientas Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### Instalación

LumaSense proporciona empaquetado integral para múltiples distribuciones Linux:

```bash
# Debian/Ubuntu
sudo dpkg -i lumasense_0.1.0_amd64.deb

# Arch Linux
sudo pacman -U lumasense-0.1.0-1-x86_64.pkg.tar.zst

# Desde el código fuente
git clone https://github.com/Marck-G/lumasense.git
cd lumasense
cargo build --release
sudo cp target/release/lumasense /usr/bin/
```

### Configuración del Servicio del Sistema

El paquete configura automáticamente un servicio systemd:

```bash
# Habilitar e iniciar el servicio
sudo systemctl enable lumasense.service
sudo systemctl start lumasense.service

# Verificar estado
sudo systemctl status lumasense.service

# Ver registros
sudo journalctl -u lumasense.service -f
```

## Arquitectura Técnica

### Componentes Principales

1. **Módulo de Cámara** (`src/camera.rs`)
   - Captura de video usando OpenCV
   - Cálculo de luminosidad
   - Manejo de errores y recuperación

2. **Control de Retroiluminación** (`src/backlight.rs`)
   - Control de brillo de hardware
   - Animaciones de transición suave
   - Soporte para múltiples controladores de retroiluminación

3. **Sistema de Configuración** (`src/config.rs`)
   - Análisis de configuración TOML
   - Múltiples ubicaciones de archivos de configuración
   - Gestión de valores por defecto

4. **Aplicación Principal** (`src/main.rs`)
   - Bucle de eventos y flujo de control
   - Integración de todos los componentes
   - Configuración de registro profesional

### Sistema de Construcción

El proyecto utiliza un Makefile integral para desarrollo y empaquetado:

```makefile
# Objetivos de desarrollo
make build           # Construir versión release
make build-debug     # Construir versión debug
make run             # Ejecutar build debug
make run-release     # Ejecutar build release
make fmt             # Formatear código
make lint            # Ejecutar verificación de lint

# Objetivos de instalación
make install-deps    # Instalar dependencias del sistema
make install         # Instalar en todo el sistema
make setup-service   # Configurar servicio systemd
make setup-udev      # Configurar reglas udev

# Objetivos de empaquetado
make package         # Construir todos los paquetes
make package-deb     # Construir paquete Debian
make package-arch    # Construir paquete Arch
make package-rpm     # Construir paquete RPM
```

## Casos de Uso

### 🏠 **Oficina en Casa**
- Ajusta automáticamente el brillo según cambia la luz del día
- Reduce el cansancio visual durante sesiones de trabajo nocturnas
- Mantiene una experiencia de visualización consistente

### ☕ **Café/Restaurante**
- Se adapta a condiciones de iluminación variables
- Maneja cambios repentinos (luz solar a través de ventanas)
- Proporciona una experiencia de lectura cómoda

### 🌙 **Uso Nocturno**
- Evita que la pantalla sea demasiado brillante en entornos oscuros
- Atenuación gradual para preservar la visión nocturna
- Reduce la exposición a luz azul

### 💼 **Entornos Profesionales**
- Mantiene el brillo óptimo en entornos de oficina
- Maneja cambios de iluminación en salas de conferencias
- Confiabilidad de grado profesional

## Rendimiento y Confiabilidad

### 📈 **Características de Rendimiento**
- **Uso de CPU**: Mínimo (captura de cámara + cálculos simples)
- **Uso de Memoria**: Bajo (monohilo, uso eficiente de OpenCV)
- **Impacto en Batería**: Despreciable (intervalos de verificación configurables)

### 🛡️ **Características de Confiabilidad**
- **Recuperación de Errores**: Reconexión automática de cámara
- **Valores de Respaldo**: Valores por defecto seguros si falla la detección
- **Manejo de Permisos**: Reglas udev adecuadas para acceso a hardware
- **Gestión de Servicios**: Integración systemd para reinicios automáticos

### 🔧 **Resolución de Problemas**

Problemas comunes y soluciones:

```bash
# Cámara no detectada
ls /dev/video*  # Verificar dispositivos de cámara
v4l2-ctl --list-devices  # Listar dispositivos de video

# Problemas de permisos
sudo usermod -a -G video $USER  # Agregar usuario al grupo video
sudo udevadm control --reload-rules  # Recargar reglas udev

# Servicio no inicia
sudo systemctl status lumasense.service
sudo journalctl -u lumasense.service -n 50
```

## Mejoras Futuras

### 🎯 **Funciones Planificadas**
- **Soporte para Múltiples Monitores**: Control individual del brillo por pantalla
- **Aprendizaje Automático**: Brillo adaptativo basado en preferencias del usuario
- **Integración Móvil**: Aplicación complementaria para configuración remota
- **Optimización Energética**: Ajustes de brillo conscientes de la batería
- **APIs de Integración**: API REST para control externo

### 🔬 **Áreas de Investigación**
- **Visión por Computadora Avanzada**: Análisis de luz más sofisticado
- **Análisis de Comportamiento del Usuario**: Aprendizaje de patrones de brillo óptimos
- **Aceleración por Hardware**: Procesamiento de imágenes basado en GPU
- **Compatibilidad Multiplataforma**: Soporte para Windows y macOS

## Contribución

LumaSense es un proyecto de código abierto que recibe contribuciones:

1. **Fork del repositorio** en GitHub
2. **Crear una rama de función** con nombres descriptivos
3. **Escribir pruebas** para nueva funcionalidad
4. **Actualizar documentación** según sea necesario
5. **Enviar una solicitud de pull** con descripción clara

### Configuración de Desarrollo

```bash
# Clonar y configurar
git clone https://github.com/Marck-G/lumasense.git
cd lumasense
cargo test  # Ejecutar suite de pruebas
cargo clippy  # Verificación de calidad de código
```

## Conclusión

LumaSense representa una aplicación práctica de visión por computadora y control de hardware para resolver un problema común de experiencia de usuario. Al ajustar automáticamente el brillo de la pantalla según las condiciones de luz ambiental, reduce el cansancio visual, mejora el confort y proporciona una experiencia de computación más fluida.

El proyecto demuestra excelentes prácticas de ingeniería de software incluyendo:
- **Pruebas integrales** y manejo de errores
- **Registro profesional** y monitoreo
- **Sistema de configuración flexible**
- **Empaquetado y distribución multiplataforma**
- **Integración del sistema** con sistemas Linux modernos

Ya seas un desarrollador buscando contribuir a un proyecto interesante, o un usuario que busca mayor comodidad en su pantalla, LumaSense ofrece una solución convincente al antiguo problema del brillo de pantalla inadecuado.

---

**Repositorio**: [https://github.com/Marck-G/lumasense](https://github.com/Marck-G/lumasense)  
**Licencia**: MIT  
**Versión**: 0.1.0  
**Contacto**: marckcarrion@gmail.com