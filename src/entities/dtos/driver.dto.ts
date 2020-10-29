
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

interface whitelistUpdateDriverDTO {
    name?: string
    age?: number
    driver_license?: string
    driver_license_type?: string
    identification_number?: string 
}

interface updateDriverDTO {
    driver_id: string
    driverinfo: whitelistUpdateDriverDTO
}

export { createDriverDTO, updateDriverDTO, whitelistUpdateDriverDTO, deleteDriverDTO} 