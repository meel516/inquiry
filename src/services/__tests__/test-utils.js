
class TestUtils {

    static addFirstName(contact) {
        contact.firstName = 'James'
        return contact
    }
    
    static verifyFirstName(contact) {
        expect(contact.firstName).toEqual('James')
        return contact
    }
    
    static addLastName(contact) {
        contact.lastName = 'Dune'
        return contact
    }
    
    static verifyLastName(contact) {
        expect(contact.lastName).toEqual('Dune')
        return contact
    }
    
    static addPhoneNumber(contact) {
        contact.phone.number = '(234) 345-8374'
        return contact
    }
    
    static verifyPhoneNumber(contact) {
        expect(contact.phone.number).toEqual('(234) 345-8374')
        return contact
    }
    
    static addPhoneType(contact) {
        contact.phone.type = 'Home';
        return contact;
    }
    
    static verifyPhoneType(contact) {
        expect(contact.phone.type).toEqual('Home')
        return contact
    }
    
    static addEmailAddress(contact) {
        contact.email = 'james.dune@gmail.com'
        return contact
    }
    
    static verifyEmail(contact) {
        expect(contact.email).toEqual('james.dune@gmail.com')
        return contact
    }
    
    static log(o) {
        console.log(JSON.stringify(o));
    }
    
}

export {
    TestUtils   
}