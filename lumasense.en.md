---
layout: page
title: Lumasense
lang: en
permalink: /lumasense
page_id: lumasense
---

# LumaSense: Automatic Screen Brightness Control with Ambient Light Detection

**Date:** February 24, 2026  
**Author:** Marck D. Carrión  
**Tags:** Rust, Linux, Automation, Hardware Control, OpenCV

## Introduction

In today's digital world, we spend countless hours in front of screens, and one of the most common issues users face is eye strain caused by improper screen brightness. Too bright in a dark room, too dim in a well-lit environment - these scenarios are all too familiar. 

**LumaSense** is a Rust-based application that automatically adjusts your screen brightness based on ambient light conditions detected through your camera. This project combines computer vision, hardware control, and intelligent automation to create a seamless user experience.

## What is LumaSense?

LumaSense is an intelligent screen brightness control system that:

- **Monitors ambient light** using your computer's camera
- **Automatically adjusts screen brightness** to optimal levels
- **Provides smooth transitions** between brightness levels
- **Runs as a system service** for hands-free operation
- **Is highly configurable** through TOML configuration files

## How It Works

### 1. Ambient Light Detection

LumaSense uses your camera to capture images and analyzes the average luminosity of the scene. The process involves:

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

### 2. Brightness Calculation

The system uses a sophisticated algorithm to determine the optimal brightness:

- **Low ambient light** (< 10.0): Uses `low_ambient_multiplier` (default: 0.5)
- **High ambient light** (≥ 10.0): Uses `high_ambient_multiplier` (default: 1.3)
- **Threshold-based updates**: Only changes brightness if difference exceeds `brightness_threshold`

### 3. Smooth Transitions

Instead of abrupt brightness changes, LumaSense implements smooth animations:

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

## Key Features

### 🎯 **Intelligent Light Detection**
- Real-time ambient light monitoring through camera
- Adaptive brightness calculation based on environment
- Configurable sensitivity thresholds

### 🔄 **Smooth Transitions**
- Gradual brightness changes to prevent eye strain
- Configurable animation duration and steps
- Professional-grade user experience

### ⚙️ **Highly Configurable**
- TOML-based configuration system
- Multiple configuration file locations supported
- Runtime configuration reloading

### 🛡️ **System Integration**
- Systemd service for automatic startup
- Udev rules for proper hardware permissions
- Cross-platform compatibility (Linux-focused)

### 📊 **Professional Logging**
- Structured logging with tracing
- Configurable log levels
- Performance monitoring and debugging

## Configuration

LumaSense supports a comprehensive configuration system with the following hierarchy:

1. **User config**: `~/.config/lumasense/config.toml`
2. **System config**: `/etc/lumasense.conf`
3. **Executable directory**: `config.toml`
4. **Default values**: Built-in defaults

### Example Configuration

```toml
[brightness]
# Ambient light thresholds
min_ambient = 0.0
max_ambient = 100.0

# Brightness output range
min_brightness = 6.0
max_brightness = 100.0

# Multipliers for different light conditions
low_ambient_multiplier = 0.5
high_ambient_multiplier = 1.3

# Animation settings
animation_duration_ms = 700
animation_steps = 30

# Hardware control
backlight_path = "/sys/class/backlight/intel_backlight"
brightness_threshold = 1.0

# Sleep interval between checks
sleep_seconds = 5

[camera]
# Camera settings
capture_delay_ms = 100
device_index = 0
```

## Installation and Usage

### Prerequisites

```bash
# Ubuntu/Debian
sudo apt install v4l-utils libopencv-dev

# Arch Linux
sudo pacman -S v4l-utils opencv

# Rust toolchain
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### Installation

LumaSense provides comprehensive packaging for multiple Linux distributions:

```bash
# Debian/Ubuntu
sudo dpkg -i lumasense_0.1.0_amd64.deb

# Arch Linux
sudo pacman -U lumasense-0.1.0-1-x86_64.pkg.tar.zst

# From source
git clone https://github.com/Marck-G/lumasense.git
cd lumasense
cargo build --release
sudo cp target/release/lumasense /usr/bin/
```

### System Service Setup

The package automatically sets up a systemd service:

```bash
# Enable and start the service
sudo systemctl enable lumasense.service
sudo systemctl start lumasense.service

# Check status
sudo systemctl status lumasense.service

# View logs
sudo journalctl -u lumasense.service -f
```

## Technical Architecture

### Core Components

1. **Camera Module** (`src/camera.rs`)
   - Video capture using OpenCV
   - Luminosity calculation
   - Error handling and recovery

2. **Backlight Control** (`src/backlight.rs`)
   - Hardware brightness control
   - Smooth transition animations
   - Multiple backlight driver support

3. **Configuration System** (`src/config.rs`)
   - TOML configuration parsing
   - Multiple config file locations
   - Default value management

4. **Main Application** (`src/main.rs`)
   - Event loop and control flow
   - Integration of all components
   - Professional logging setup

### Build System

The project uses a comprehensive Makefile for development and packaging:

```makefile
# Development targets
make build           # Build release version
make build-debug     # Build debug version
make run             # Run debug build
make run-release     # Run release build
make fmt             # Format code
make lint            # Run linting checks

# Installation targets
make install-deps    # Install system dependencies
make install         # Install system-wide
make setup-service   # Setup systemd service
make setup-udev      # Setup udev rules

# Packaging targets
make package         # Build all packages
make package-deb     # Build Debian package
make package-arch    # Build Arch package
make package-rpm     # Build RPM package
```

## Use Cases

### 🏠 **Home Office**
- Automatically adjusts brightness as daylight changes
- Reduces eye strain during evening work sessions
- Maintains consistent viewing experience

### ☕ **Cafe/Restaurant**
- Adapts to varying lighting conditions
- Handles sudden changes (sunlight through windows)
- Provides comfortable reading experience

### 🌙 **Night Usage**
- Prevents screen from being too bright in dark environments
- Gradual dimming to preserve night vision
- Reduces blue light exposure

### 💼 **Professional Settings**
- Maintains optimal brightness in office environments
- Handles conference room lighting changes
- Professional-grade reliability

## Performance and Reliability

### 📈 **Performance Characteristics**
- **CPU Usage**: Minimal (camera capture + simple calculations)
- **Memory Usage**: Low (single-threaded, efficient OpenCV usage)
- **Battery Impact**: Negligible (configurable check intervals)

### 🛡️ **Reliability Features**
- **Error Recovery**: Automatic camera reconnection
- **Fallback Values**: Safe defaults if detection fails
- **Permission Handling**: Proper udev rules for hardware access
- **Service Management**: Systemd integration for automatic restarts

### 🔧 **Troubleshooting**

Common issues and solutions:

```bash
# Camera not detected
ls /dev/video*  # Check camera devices
v4l2-ctl --list-devices  # List video devices

# Permission issues
sudo usermod -a -G video $USER  # Add user to video group
sudo udevadm control --reload-rules  # Reload udev rules

# Service not starting
sudo systemctl status lumasense.service
sudo journalctl -u lumasense.service -n 50
```

## Future Enhancements

### 🎯 **Planned Features**
- **Multiple Monitor Support**: Individual brightness control per display
- **Machine Learning**: Adaptive brightness based on user preferences
- **Mobile Integration**: Companion app for remote configuration
- **Energy Optimization**: Battery-aware brightness adjustments
- **Integration APIs**: REST API for external control

### 🔬 **Research Areas**
- **Advanced Computer Vision**: More sophisticated light analysis
- **User Behavior Analysis**: Learning optimal brightness patterns
- **Hardware Acceleration**: GPU-based image processing
- **Cross-Platform Support**: Windows and macOS compatibility

## Contributing

LumaSense is an open-source project welcoming contributions:

1. **Fork the repository** on GitHub
2. **Create a feature branch** with descriptive naming
3. **Write tests** for new functionality
4. **Update documentation** as needed
5. **Submit a pull request** with clear description

### Development Setup

```bash
# Clone and setup
git clone https://github.com/Marck-G/lumasense.git
cd lumasense
cargo test  # Run test suite
cargo clippy  # Code quality checks
```

## Conclusion

LumaSense represents a practical application of computer vision and hardware control to solve a common user experience problem. By automatically adjusting screen brightness based on ambient light conditions, it reduces eye strain, improves comfort, and provides a more seamless computing experience.

The project demonstrates excellent software engineering practices including:
- **Comprehensive testing** and error handling
- **Professional logging** and monitoring
- **Flexible configuration** system
- **Cross-platform packaging** and distribution
- **System integration** with modern Linux systems

Whether you're a developer looking to contribute to an interesting project, or a user seeking better screen comfort, LumaSense offers a compelling solution to the age-old problem of improper screen brightness.

---

**Repository**: [https://github.com/Marck-G/lumasense](https://github.com/Marck-G/lumasense)  
**License**: MIT  
**Version**: 0.1.0  
**Contact**: marckcarrion@gmail.com