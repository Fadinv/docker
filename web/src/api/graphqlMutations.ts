export const createContactMutation = async (contactName: string,) => {
    return fetch('http://localhost:8000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            query: `
            mutation {
                createContact (contactName: "${contactName}") {
                    id
                    createdAt
                    updatedAt
                    contactName
                }
            }`,
        }),
    }).catch((e) => {console.log(e)})

}

export const createNoteMutation = async (
    id: number,
    key: string,
    value: string,
) => {
    return fetch('http://localhost:8000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            query: `
            mutation {
                createNote (id: ${id}, key: "${key}", value: "${value}") {
                    idNote
                    key
                    value
                }
            }`,
        }),
    }).catch((e) => {console.log(e)})
}

export const updateContactMutation = async (
    id: number,
    contactName: string,
) => {
    return fetch('http://localhost:8000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            query: `
                mutation {
                    updateContact (id: ${id}, contactName: "${contactName}") {
                        id
                        contactName
                        notes {
                            idNote
                            key
                            value
                        }
                    }
                }`,
        }),
    }).catch((e) => {console.log(e)})
}

export const deleteNoteMutation = async (idNote: number) => {
    return fetch('http://localhost:8000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            query: `mutation {
            deleteNote (idNote: ${idNote})
          }
          `,
        }),
    }).catch((e) => {console.log(e)})
}

export const updateNoteMutation = async (
    idNote: number,
    key: string,
    value: string,
) => {
    return fetch('http://localhost:8000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            query: `
            mutation {
              updateNote(idNote: ${idNote}, key: "${key}", value: "${value}") {
                idNote
                key
                value
              }
            }
          `,
        }),
    }).catch((e) => {console.log(e)})
}

export const deleteContactMutation = async (id: number) => {
    return fetch('http://localhost:8000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            query: `mutation {
            deleteContact (id: ${id})
          }
          `,
        }),
    }).catch((e) => {console.log(e)})
}