export const navLinks = [

    {
        id: 'home',
        title: 'Home',
        link: '/',
    },
    {
        id: 'browse',
        title: 'Browse',
        link: '/browse'

    },
    {
        id: 'rememprot-csea',
        title: 'REMEMProt-CSEA',
        link: '/rememprot-csea'

    },
    {
        id: 'disease_ontology',
        title: 'Disease Ontology',
        link: '/disease_ontology'

    },
    {
        id: 'batch_query',
        title: 'Batch Query',
        link: '/batch_query'
    },
    {
        id: 'faqs',
        title: 'FAQs',
        link: '/faqs'
    },
    {
        id: 'contributors',
        title: 'Contributors',
        link: '/contributors'
    }
]

export const servicesData = [
    {
        id: 1,
        title: 'Browse',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio incidunt nam itaque sed eius modi error totam sit illum. Voluptas doloribus asperiores quaerat aperiam. Quidem harum omnis beatae ipsum soluta!",
        link: '/browse'
    },
    {
        id: 2,
        title: 'REMEMProt-CSEA',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio incidunt nam itaque sed eius modi error totam sit illum. Voluptas doloribus asperiores quaerat aperiam. Quidem harum omnis beatae ipsum soluta!",
        link: '/rememprot-csea'
    },
    {
        id: 3,
        title: 'Disease Ontology',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio incidunt nam itaque sed eius modi error totam sit illum. Voluptas doloribus asperiores quaerat aperiam. Quidem harum omnis beatae ipsum soluta!",
        link: '/disease_ontology'
    },
    {
        id: 4,
        title: 'Batch Query',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio incidunt nam itaque sed eius modi error totam sit illum. Voluptas doloribus asperiores quaerat aperiam. Quidem harum omnis beatae ipsum soluta!",
        link: '/batch_query'
    },
]

export const url = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://ciods.in'