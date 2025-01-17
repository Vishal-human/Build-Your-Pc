# Build-Your-Pc

## Project Files and Dependencies

### package-lock.json
- Automatically generated file that locks package versions
- Ensures consistent installations across environments
- Stores exact version numbers of all dependencies
- Should be committed to version control

### package.json 
- Configuration file for Node.js projects
- Contains project metadata and dependencies list
- Includes:
  - Project name and version
  - Scripts for running tasks
  - Package dependencies
  - Development dependencies

### /node_modules
- Directory containing installed packages
- Created and managed by npm
- Contains all project dependencies
- Should NOT be committed to version control
- Can be regenerated using package.json

# how we check the compability of componets

## Component Compatibility Checking System

Our PC Builder implements a comprehensive compatibility checking system to ensure all selected components work together seamlessly:

### CPU & Motherboard Compatibility
- Socket type matching between CPU and motherboard
- Chipset compatibility verification
- BIOS version requirements checked

### RAM Compatibility 
- DDR generation matching with motherboard
- Maximum RAM capacity verification
- Supported RAM speeds validation

### Power Supply Compatibility
- Total system power requirement calculation
- Required PCIe power connectors verification
- ATX/SFX form factor compatibility

### Storage Compatibility
- Available SATA/M.2 slots checking
- PCIe generation compatibility for NVMe drives
- Physical space constraints validation

### Case Compatibility
- Motherboard form factor compatibility
- GPU length restrictions
- CPU cooler height clearance
- PSU size constraints

### GPU Compatibility
- PCIe slot availability
- Power connector requirements
- Physical size constraints
- Required PSU wattage verification

The system performs these checks in real-time as components are selected, providing immediate feedback to users about compatibility issues and ensuring a successful build.
