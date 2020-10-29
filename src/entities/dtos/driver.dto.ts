
interface createDriverDTO {
    name: string
    age: number
    driver_license: string
    driver_license_type: string
    identification_number: string 
}

interface deleteDriverDTO {
    driver_id: string
}

interface whitelistupdateDriverDTO {
    name?: string
    age?: number
    driver_license?: string
    driver_license_type?: string
    identification_number?: string 
}

interface updateDriverDTO {
    driver_id: string
    driverinfo: whitelistupdateDriverDTO
}

export { createDriverDTO, updateDriverDTO, whitelistupdateDriverDTO, deleteDriverDTO} 