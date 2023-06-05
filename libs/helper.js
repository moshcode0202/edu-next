const organizationAges = [
    { grade_key: 'pk', grade_title: 'Pre-Kindergarten', age: '4 and below', value: '1' },
    { grade_key: 'k', grade_title: 'Kindergarten', age: '5', value: '2' },
    { grade_key: '1', grade_title: '1st Grade', age: '6', value: '3' },
    { grade_key: '2', grade_title: '2nd Grade', age: '7', value: '4' },
    { grade_key: '3', grade_title: '3rd Grade', age: '8', value: '5' },
    { grade_key: '4', grade_title: '4th Grade', age: '9', value: '6' },
    { grade_key: '5', grade_title: '5th Grade', age: '10', value: '7' },
    { grade_key: '6', grade_title: '6th Grade', age: '11', value: '8' },
    { grade_key: '7', grade_title: '7th Grade', age: '12', value: '9' },
    { grade_key: '8', grade_title: '8th Grade', age: '13', value: '10' },
    { grade_key: '9', grade_title: '9th Grade', age: '14', value: '11' },
    { grade_key: '10', grade_title: '10th Grade', age: '15', value: '12' },
    { grade_key: '11', grade_title: '11th Grade', age: '16', value: '13' },
    { grade_key: '12', grade_title: '12th Grade', age: '17', value: '14' },
    { grade_key: 'ec', grade_title: 'Early College', age: '18', value: '15' },
    { grade_key: 'ae', grade_title: 'Adult Education', age: '19 and older', value: '16' },
];
const helper = {
    noReact: (val) => {
        return JSON.parse(JSON.stringify(val));
    },

    isEmpty: (value) => {
        return value || '-';
    },

    getOrganizationAges: () => {
        return organizationAges;
    },

    getAgeName: (id, prefix = 'Age') => {
        const age = organizationAges.find((d) => d.value === id);
        return ``;
    },
    
    getAge: (id) => {
        if (id) {
            return organizationAges.find((d) => d.value === id);
        }
    },

    getSignedUrl(value) {
        // console.log('getSinUrl value ---',value);
        if (value.indexOf('http://') === 0 || value.indexOf('https://') === 0) return value;
        return `${process.env.NEXT_PUBLIC_API_URL}/uploads/${value}`;
    },

    perPageOption: [10, 25, 50, 100],

    phonePrefix: ['+1'],

    status: [
        { id: 1, name: 'Pending' },
        { id: 2, name: 'Active' },
        { id: 3, name: 'Reject' },
    ],

    roles: [{ id: 1, name: 'Admin' }],
};
export default helper;
