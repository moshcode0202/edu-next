import AddProductForm from '@/components/AddProductForm';

const Add = () => {
    return (
        <>
            <AddProductForm button="Add" />
        </>
    );
};

export default Add;

Add.middleware = {
    auth: true,
    verify: true,
};
