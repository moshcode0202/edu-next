import AddProductForm from '@/components/AddProductForm';

const Product = () => {
    return (
        <>
            <AddProductForm button="Update" />
        </>
    );
};

export default Product;

Product.middleware = {
    auth: true,
    verify: true,
};
