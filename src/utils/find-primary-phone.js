
export default (phones = []) => {
    const phone = phones.find((ph) => {
        return ph.primary
    })
    return (phone) ? phone : phones[0]
}