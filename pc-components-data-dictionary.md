# --> not included


# CPU Collection Data Dictionary  1] man ---> socket_type ----> 

| Field Name | Data Type | Required | Description | Example Value | Constraints |
|------------|-----------|----------|-------------|---------------|-------------|
| model | string | Yes | CPU model name | "Ryzen 9 7950X" | Non-empty string |
| manufacturer | string | Yes | CPU manufacturer | "AMD" | Non-empty string |
| socket | string | Yes | CPU socket type | "AM5" | Must be valid socket type |
|socket_version | number | 1700|  <---------- 1900, 
| cores | integer | Yes | Number of CPU cores | 16 | Positive integer |
| threads | integer | No | Number of threads | 32 | Positive integer |
| baseSpeed | double | Yes | Base clock speed in GHz | 4.5 | Positive number |
| boostSpeed | double | No | Maximum boost clock in GHz | 5.7 | Greater than baseSpeed |
| compatibleChipsets | string[] | Yes | Compatible motherboard chipsets | ["X670E", "X670", "B650E"] | Valid chipset array |
| generation | string | Yes | CPU generation | "7" | Non-empty string |

#| socket_type | string |  LGA  |  <-------- intel --> || LGA , PGA ,   amd --> ||AM5 , AM4, AM3    <------- new added 

# Motherboards Collection Data Dictionary
<!-- 

if(amd){
   if(AM5){
      if(series_version || gen){
         ----mother__board

      }
      
   }
   elif(AM3){
      if(serie_version || gen){
         ----mother_board__

      }

}
elif(intel){
   if(LGA){
      if(series_version || gen){
         ----mother__board

      }
      
   }
   elif(PGA){
      if(serie_version || gen){
         ----mother_board__

      }

   }

} -->


| Field Name | Data Type | Required | Description | Example Value | Constraints |
|------------|-----------|----------|-------------|---------------|-------------|
| model | string | Yes | Unique model identifier of the motherboard | "ROG STRIX B650-A" | Non-empty string |
| manufacturer | string | Yes | Company that manufactures the motherboard | "ASUS" | Non-empty string |
| socket | string | Yes | CPU socket type for compatibility | "AM5" | Must be valid socket type |
| chipset | string | Yes | Motherboard chipset model | "B650" | Must be valid chipset |
| formFactor | string | Yes | Physical size and layout standard | "ATX" | One of: ATX, Micro-ATX, Mini-ITX |
| maxMemory | integer | Yes | Maximum supported RAM in GB | 128 | Positive integer |
| memorySlots | integer | Yes | Number of RAM slots | 4 | Positive integer |
| sataConnectors | integer | Yes | Number of SATA ports | 6 | Non-negative integer |
| tdp | integer | Yes | Thermal Design Power in watts | 70 | Positive integer |
| supported_processor | array | Yes | Supported CPU generations | ["6", "7"] | Array of strings |
| ram_type | string | Yes | Type of RAM supported | "DDR4" | Must be valid RAM type |
| nvme_support | boolean | Yes | Whether NVMe drives are supported | true | true/false |

<!-- RAM -->
<!-- 
if(RAM_type == DDR4){
   ddr4 ram
}
elif(RAM_type == DDR3){
   ddr3
} -->


<!-- SSD -->
<!-- 
if(NVME == TRUE){     
   sata and nvme ssd
}
else{
   sata ssd

} -->



# RAM Collection Data Dictionary

| Field Name | Data Type | Required | Description | Example Value | Constraints |
|------------|-----------|----------|-------------|---------------|-------------|
| model | string | Yes | RAM model name | "Trident Z5 RGB" | Non-empty string |
| manufacturer | string | Yes | RAM manufacturer | "G.Skill" | Non-empty string |
| type | string | Yes | Memory technology | "DDR5" | Valid memory type |
| capacity | integer | Yes | Memory size in GB | 32 | Positive integer |
| speed | integer | Yes | Memory speed in MHz | 6000 | Positive integer |
| timing | string | No | Memory timings | "36-36-36-96" | Valid timing format |
| voltage | double | No | Operating voltage | 1.35 | Positive number |


# Storage Collection Data Dictionary  

| Field Name | Data Type | Required | Description | Example Value | Constraints |
|------------|-----------|----------|-------------|---------------|-------------|
| model | string | Yes | Storage model name | "980 PRO" | Non-empty string |
| manufacturer | string | Yes | Storage manufacturer | "Samsung" | Non-empty string |
| capacity | integer | Yes | Storage size in GB | 2000 | Positive integer |
| type | string | Yes | Storage technology | "NVMe" | One of: SSD, HDD, NVMe |       <---------------check
| interface | string | Yes | Connection interface | "M.2" | Valid interface type |
| formFactor | string | No | Physical size format | "M.2 2280" | Valid form factor |
| readSpeed | integer | No | Read speed in MB/s | 7000 | Positive integer |
| writeSpeed | integer | No | Write speed in MB/s | 5100 | Positive integer |

# GPU Collection Data Dictionary XXXXX

| Field Name | Data Type | Required | Description | Example Value | Constraints |
|------------|-----------|----------|-------------|---------------|-------------|
| model | string | Yes | GPU model name | "GeForce RTX 4090" | Non-empty string |
| manufacturer | string | Yes | GPU manufacturer | "NVIDIA" | Non-empty string |
| memory | integer | Yes | VRAM amount in GB | 24 | Positive integer |
| memoryType | string | No | Type of graphics memory | "GDDR6X" | Valid memory type |
| tdp | integer | Yes | Power consumption in watts | 450 | Positive integer |
| pcieVersion | string | Yes | PCIe version supported | "PCIe 4.0" | Valid PCIe version |
| minPsuWattage | integer | No | Minimum PSU wattage required | 850 | Positive integer |
| length | integer | No | Card length in millimeters | 336 | Positive integer |

# PSU Collection Data Dictionary XXXXX

| Field Name | Data Type | Required | Description | Example Value | Constraints |
|------------|-----------|----------|-------------|---------------|-------------|
| model | string | Yes | PSU model name | "RMx 1000" | Non-empty string |
| manufacturer | string | Yes | PSU manufacturer | "Corsair" | Non-empty string |
| wattage | integer | Yes | Power output in watts | 1000 | Positive integer |
| efficiency | string | Yes | Power efficiency rating | "80+ Gold" | Valid efficiency rating |
| modular | string | No | Cable modularity type | "Full" | One NVMeof: Full, Semi, No |
| formFactor | string | No | PSU form factor | "ATX" | Valid form factor |


# CASEing
| Field Name | Data Type | Required | Description | Example Value | Constraints |
|------------|-----------|----------|-------------|---------------|-------------|
| brand | string | Yes | Case brand name | "NZXT" | Non-empty string |
| model | string | Yes | Case model name | "H510" | Non-empty string |
| manufacturer | string | Yes | Case manufacturer | "NZXT" | Non-empty string |
| size | string | Yes | Case form factor | "Mid Tower" | Valid case size |
| color | string | Yes | Case color | "Matte Black" | Non-empty string |
| image | file | Yes | Product image file | "h510.jpg" | Valid image file |
| price | number | Yes | Case price | 89.99 | Positive number |
| stock | integer | Yes | Available quantity | 25 | Non-negative integer |




# Compatibility Collection Data Dictionary

| Field Name | Data Type | Required | Description | Example Value | Constraints |
|------------|-----------|----------|-------------|---------------|-------------|
| componentType1 | string | Yes | First component type | "motherboard" | Valid component type |
| componentId1 | objectId | Yes | First component ID | ObjectId("...") | Valid MongoDB ObjectId |
| componentType2 | string | Yes | Second component type | "cpu" | Valid component type |
| componentId2 | objectId | Yes | Second component ID | ObjectId("...") | Valid MongoDB ObjectId |
| compatibilityNotes | string | No | Additional information | "Perfect match for high-end AMD build" | String |

## Notes on Value Constraints:

1. **Component Types** must be one of:
   - motherboard
   - cpu
   - ram
   - gpu
   - psu
   - storage

2. **Form Factors**:
   - Motherboard: ATX, Micro-ATX, Mini-ITX
   - PSU: ATX, SFX, SFX-L
   - Storage: 2.5", 3.5", M.2 2280, etc.

3. **Memory Types**:
   - RAM: DDR4, DDR5
   - GPU: GDDR6, GDDR6X

4. **Efficiency Ratings**:
   - 80+ Bronze
   - 80+ Silver
   - 80+ Gold
   - 80+ Platinum
   - 80+ Titanium

5. **Interface Types**:
   - SATA
   - M.2
   - PCIe

6. **PCIe Versions**:
   - PCIe 3.0
   - PCIe 4.0
   - PCIe 5.0
