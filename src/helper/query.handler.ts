const queryUpdateItemInArray = (data: {[key: string]: any}, field: string) => {
    let query: any = {}
    Object.keys(data).map((key):void => {
        query[`${field}.$.${key}`] =  (data as any)[key]  
    })
    return query
}

export {
    queryUpdateItemInArray
}