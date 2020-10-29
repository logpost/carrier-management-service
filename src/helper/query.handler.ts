const queryUpdateItemInArray = (data: {[key: string]: any}) => {
    let query: any = {}
    Object.keys(data).map((key):void => {
        query[`trucks.$.${key}`] =  (data as any)[key]  
    })
    return query
}

export {
    queryUpdateItemInArray
}