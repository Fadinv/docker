export const GET_CONTACT_QUERY = `{
    getContacts {
        id
        createdAt
        updatedAt
        contactName
        notes {
            idNote
            key
            value
        }
    }
}`

export const getContactsQuery = async () => {
    return fetch('http://localhost:8000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            query: GET_CONTACT_QUERY,
        }),
    }).catch((e) => {console.log(e)})
}

export const getContactQuery = async (id: number) => {
    return fetch('http://localhost:8000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            query: `{
            getContact (id: ${id}) {
                id
                createdAt
                updatedAt
                contactName
                notes {
                  idNote
                  key
                  value
                }
            }}`,
        }),
    }).catch((e) => {console.log(e)})
}